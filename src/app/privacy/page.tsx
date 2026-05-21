import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for gptoapk.com, including analytics, advertising, cookies, your rights under GDPR/CCPA, and contact information.",
  alternates: {
    canonical: "https://gptoapk.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This Privacy Policy explains how gptoapk.com collects, uses, and shares information when you use our Android app search and APK link service."
      updated="May 20, 2026"
      sections={[
        {
          title: "Information we collect",
          body: (
            <>
              <p>
                When you use gptoapk.com, we may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Information you provide:</strong> search queries such as app names, package names, or Google Play URLs.</li>
                <li><strong>Automatically collected information:</strong> IP address, browser type, device information, operating system, referring/exit pages, date/time stamps, and pages visited.</li>
                <li><strong>Cookie data:</strong> information stored via cookies and similar technologies (see below).</li>
              </ul>
            </>
          ),
        },
        {
          title: "Cookies and tracking technologies",
          body: (
            <>
              <p>
                We use cookies, web beacons, and similar tracking technologies to operate the website, analyze traffic, support advertising, and improve user experience. Cookies are small text files placed on your device by your web browser.
              </p>
              <p className="font-semibold mt-3">Types of cookies we use:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Essential cookies:</strong> necessary for the website to function properly (e.g., cookie consent preference).</li>
                <li><strong>Analytics cookies:</strong> help us understand how visitors interact with the website (Google Analytics, Microsoft Clarity).</li>
                <li><strong>Advertising cookies:</strong> used by Google AdSense and other advertising partners to serve relevant ads based on your interests and browsing history.</li>
              </ul>
              <p className="mt-3">
                You can control and delete cookies through your browser settings. Note that disabling cookies may affect the functionality of certain features.
              </p>
            </>
          ),
        },
        {
          title: "Google AdSense and advertising partners",
          body: (
            <>
              <p>
                We use Google AdSense to display advertisements on gptoapk.com. Google AdSense may use cookies and web beacons to collect information about your visits to this and other websites in order to provide advertisements about goods and services that may be of interest to you.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  Google, as a <strong>third-party vendor</strong>, uses cookies to serve ads on gptoapk.com.
                </li>
                <li>
                  Google&apos;s use of the <strong>DART cookie</strong> enables it to serve ads to users based on their visit to gptoapk.com and other sites on the Internet.
                </li>
                <li>
                  You may opt out of the DART cookie by visiting the Google ad and content network privacy policy at{" "}
                  <a className="text-blue-600 hover:underline dark:text-blue-400" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                    https://policies.google.com/technologies/ads
                  </a>.
                </li>
                <li>
                  You can manage personalized ad settings or opt out of personalized advertising through{" "}
                  <a className="text-blue-600 hover:underline dark:text-blue-400" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                    Google Ad Settings
                  </a>{" "}
                  or the{" "}
                  <a className="text-blue-600 hover:underline dark:text-blue-400" href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
                    Network Advertising Initiative opt-out page
                  </a>.
                </li>
                <li>
                  Third-party vendors, including Google, may also serve ads based on a user&apos;s prior visits to this website.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Analytics services",
          body: (
            <>
              <p>We use the following analytics services to understand website traffic and improve our service:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Google Analytics 4 (GA4)</strong> — provided by Google LLC. GA4 uses cookies to collect data about website usage. For details, see{" "}
                  <a className="text-blue-600 hover:underline dark:text-blue-400" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                    Google&apos;s Privacy Policy
                  </a>.
                </li>
                <li><strong>Microsoft Clarity</strong> — provided by Microsoft Corporation. Helps us understand user behavior through heatmaps and session recordings. See{" "}
                  <a className="text-blue-600 hover:underline dark:text-blue-400" href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer">
                    Microsoft Privacy Statement
                  </a>.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "How we use your information",
          body: (
            <ul className="list-disc pl-6 space-y-1">
              <li>To operate and maintain the website</li>
              <li>To process search queries and return app information</li>
              <li>To prepare APK download links from third-party sources</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To serve advertisements through Google AdSense</li>
              <li>To detect and prevent fraud, abuse, and security incidents</li>
              <li>To comply with legal obligations</li>
            </ul>
          ),
        },
        {
          title: "Your rights under GDPR",
          body: (
            <>
              <p className="text-sm text-slate-500 mb-2">
                This section applies if you are located in the European Economic Area (EEA) or the United Kingdom.
              </p>
              <p>Under the General Data Protection Regulation (GDPR), you have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Access:</strong> request a copy of your personal data we process.</li>
                <li><strong>Rectification:</strong> request that we correct inaccurate or incomplete data.</li>
                <li><strong>Erasure:</strong> request deletion of your personal data under certain conditions.</li>
                <li><strong>Restrict processing:</strong> request limitation of how we process your data.</li>
                <li><strong>Data portability:</strong> request transfer of your data to another organization.</li>
                <li><strong>Object:</strong> object to processing of your personal data for direct marketing purposes.</li>
                <li><strong>Withdraw consent:</strong> withdraw previously given consent at any time.</li>
              </ul>
              <p className="mt-3">
                The legal bases for processing your data include: your consent (for cookies and advertising), legitimate interests (for website operation and analytics), and legal obligations.
              </p>
            </>
          ),
        },
        {
          title: "Your rights under CCPA / CPRA",
          body: (
            <>
              <p className="text-sm text-slate-500 mb-2">
                This section applies if you are a California resident.
              </p>
              <p>Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), you have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li><strong>Know:</strong> request information about the categories and specific pieces of personal data we have collected about you.</li>
                <li><strong>Delete:</strong> request deletion of personal data we have collected from you.</li>
                <li><strong>Opt-out:</strong> direct us not to sell or share your personal data. gptoapk.com does not sell personal data, but advertising cookies may constitute sharing under CCPA. You can opt out via the cookie consent banner.</li>
                <li><strong>Non-discrimination:</strong> you will not receive discriminatory treatment for exercising your CCPA rights.</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, email us at likaiwork12@gmail.com with the subject &quot;CCPA Request&quot;. We may need to verify your identity before processing your request.
              </p>
            </>
          ),
        },
        {
          title: "Children’s privacy (COPPA)",
          body: (
            <p>
              gptoapk.com is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal data, please contact us and we will delete such information promptly.
            </p>
          ),
        },
        {
          title: "Third-party links and downloads",
          body: (
            <p>
              gptoapk.com may link to third-party app pages, CDNs, APK sources, and other websites. Those third parties operate independently and have their own privacy practices. We do not control their policies or how they process information after you leave our site. We encourage you to review the privacy policies of any third-party websites you visit through our links.
            </p>
          ),
        },
        {
          title: "Data retention and security",
          body: (
            <p>
              We retain operational data only as long as reasonably necessary for service provision, security monitoring, analytics, legal compliance, and business purposes. We implement reasonable administrative, technical, and physical security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          ),
        },
        {
          title: "International data transfers",
          body: (
            <p>
              gptoapk.com is hosted in the United States. If you access the website from outside the United States, your information may be transferred to, stored, and processed in the United States or other jurisdictions where our service providers operate. By using the website, you acknowledge this transfer. We take steps to ensure that data transfers comply with applicable data protection laws.
            </p>
          ),
        },
        {
          title: "Changes to this Privacy Policy",
          body: (
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the website after changes constitutes acceptance of the revised policy. We encourage you to review this page periodically.
            </p>
          ),
        },
        {
          title: "Contact",
          body: (
            <p>
              For privacy questions, data rights requests, or concerns about how we handle your information, contact us at{" "}
              <a className="text-blue-600 hover:underline dark:text-blue-400" href="mailto:likaiwork12@gmail.com">
                likaiwork12@gmail.com
              </a>
              . Please include enough detail for us to understand and address your request. We aim to respond within 30 days.
            </p>
          ),
        },
      ]}
    />
  );
}
