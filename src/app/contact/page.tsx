import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact gptoapk.com for support, privacy, policy, abuse, and removal requests.",
  alternates: {
    canonical: "https://gptoapk.com/contact",
  },
};

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact"
      description="Reach the gptoapk.com team for support, policy questions, removal requests, and website feedback."
      updated="May 16, 2026"
      sections={[
        {
          title: "Email",
          body: (
            <p>
              The best way to reach us is by email:{" "}
              <a className="text-blue-600 hover:underline dark:text-blue-400" href="mailto:likaiwork12@gmail.com">
                likaiwork12@gmail.com
              </a>
              .
            </p>
          ),
        },
        {
          title: "What to include",
          body: (
            <p>
              For support requests, include the app name or package name, the page URL, your browser, and a brief description of the issue. For removal or rights-holder requests, include the affected URL and information showing your authority to make the request.
            </p>
          ),
        },
        {
          title: "Abuse and security",
          body: (
            <p>
              If you find a malicious link, misleading app listing, security issue, or policy concern, please email us with as much detail as possible so we can review it.
            </p>
          ),
        },
      ]}
    />
  );
}
