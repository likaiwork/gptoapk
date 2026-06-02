import { isMobileAdViewport, MONETAG_TAG_SCRIPT_SRC } from "@/lib/monetag";
import { MONETAG_TAG_SCRIPT_ID } from "@/lib/monetag-inpage";

const MONETAG_HOST_RE =
  /(?:^|\/\/|\.)(?:3nbf4\.com|quge5\.com|saptag\.com|monetag\.com|propellerads|onclickads)/i;

const MONETAG_SCRIPT_RE = /tag\.min\.js|service-worker\.min\.js/i;

function isMonetagScriptSrc(src: string): boolean {
  return MONETAG_HOST_RE.test(src) || MONETAG_SCRIPT_RE.test(src);
}

export function removeMonetagTagScript(): void {
  if (typeof document === "undefined") return;
  const byId = document.getElementById(MONETAG_TAG_SCRIPT_ID);
  byId?.remove();
  document.querySelectorAll("script[src]").forEach((node) => {
    const src = node.getAttribute("src") ?? "";
    if (src.includes(MONETAG_TAG_SCRIPT_SRC) || isMonetagScriptSrc(src)) {
      node.remove();
    }
  });
}

/** Remove Monetag iframes and common fixed top overlays (in-page push / vignette). */
export function purgeMonetagAdNodes(): void {
  if (typeof document === "undefined") return;

  document.querySelectorAll("iframe[src]").forEach((node) => {
    const src = node.getAttribute("src") ?? "";
    if (isMonetagScriptSrc(src) || MONETAG_HOST_RE.test(src)) {
      node.remove();
    }
  });

  const root = document.body;
  if (!root) return;

  for (const el of Array.from(root.querySelectorAll<HTMLElement>("div, aside, section"))) {
    if (el.closest("[data-cookie-consent], .cookie-consent, #cookie-consent")) continue;
    if (el.id === MONETAG_TAG_SCRIPT_ID) continue;

    const style = window.getComputedStyle(el);
    const z = Number.parseInt(style.zIndex, 10);
    const fixedLike =
      style.position === "fixed" ||
      style.position === "sticky" ||
      (style.position === "absolute" && z >= 9999);

    if (!fixedLike || (Number.isFinite(z) && z < 900)) continue;

    const text = (el.textContent ?? "").trim();
    const looksLikeAdLabel =
      /\bAd\b/.test(text) ||
      /立即下载|點按即可|收到\[?\d+\]?个?文件|繼續進行|要關閉|繼續/.test(text);

    const hasAdIframe = el.querySelector("iframe[src*='3nbf4'], iframe[src*='quge5']");
    if (looksLikeAdLabel || hasAdIframe) {
      el.remove();
    }
  }
}

export function blockMonetagServiceWorkerRegistration(): void {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const sw = navigator.serviceWorker;
  const flagged = sw as ServiceWorkerContainer & { __gptoapkBlocked?: boolean };
  if (flagged.__gptoapkBlocked) return;

  const originalRegister = sw.register.bind(sw);
  flagged.register = ((scriptURL: string | URL, options?: RegistrationOptions) => {
    const url = String(scriptURL);
    if (url.includes("sw.js") || MONETAG_HOST_RE.test(url)) {
      return Promise.reject(new Error("Monetag service worker disabled"));
    }
    return originalRegister(scriptURL, options);
  }) as typeof sw.register;

  flagged.__gptoapkBlocked = true;
}

export async function teardownMonetagOnMobile(): Promise<void> {
  if (!isMobileAdViewport()) return;

  blockMonetagServiceWorkerRegistration();
  removeMonetagTagScript();

  try {
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.unregister().catch(() => undefined)));
    }
  } catch {
    // ignore
  }

  purgeMonetagAdNodes();
}

export function startMonetagMobileGuard(): () => void {
  if (typeof window === "undefined") return () => undefined;

  const run = () => {
    void teardownMonetagOnMobile();
  };

  run();

  const observer = new MutationObserver(() => {
    if (!isMobileAdViewport()) return;
    purgeMonetagAdNodes();
    removeMonetagTagScript();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  const interval = window.setInterval(run, 2500);
  const stopInterval = window.setTimeout(() => window.clearInterval(interval), 30000);

  return () => {
    observer.disconnect();
    window.clearInterval(interval);
    window.clearTimeout(stopInterval);
  };
}
