"use client";

import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const adsbygoogle: any[];

type AdUnitProps = {
  /** AdSense 广告 slot ID */
  slot: string;
  /** 广告格式: auto = 自适应, horizontal = 水平横幅, vertical = 垂直 */
  format?: "auto" | "horizontal" | "vertical";
  /** 额外类名 */
  className?: string;
};

/**
 * Google AdSense 广告单元（Client 组件）
 * 用法: <AdUnit slot="1234567890" format="auto" />
 */
export default function AdUnit({ slot, format = "auto", className = "" }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    // 避免重复加载
    if (loaded.current) return;

    const timer = setTimeout(() => {
      try {
        if (typeof adsbygoogle !== "undefined" && adsbygoogle) {
          loaded.current = true;
          adsbygoogle.push({});
        }
      } catch {
        // 忽略广告加载错误
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const style = format === "vertical"
    ? { display: "block", minHeight: "250px" }
    : format === "horizontal"
      ? { display: "block", minHeight: "90px" }
      : { display: "block", minHeight: "100px" };

  return (
    <div ref={adRef} className={`ad-unit w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-2144172051563531"
        data-ad-slot={slot}
        data-ad-format={format === "auto" ? "auto" : "rectangle"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
