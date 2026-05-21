import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "DMCA Copyright Policy",
  description: "DMCA Copyright Policy for gptoapk.com. Learn how to submit copyright infringement notices and counter-notifications.",
  alternates: {
    canonical: "https://gptoapk.com/dmca",
  },
};

export default function DMCAPage() {
  return (
    <LegalPage
      title="DMCA Copyright Policy"
      description="gptoapk.com respects the intellectual property rights of others and expects its users to do the same. This page outlines our policy for responding to copyright infringement claims under the Digital Millennium Copyright Act (DMCA)."
      updated="May 21, 2026"
      sections={[
        {
          title: "Policy statement",
          body: (
            <p>
              It is our policy to respond to clear notices of alleged copyright infringement that comply with the Digital Millennium Copyright Act (17 U.S.C. § 512). We will promptly investigate and take appropriate action, which may include removing or disabling access to allegedly infringing content, and terminating the accounts of repeat infringers where applicable.
            </p>
          ),
        },
        {
          title: "Filing a DMCA takedown notice",
          body: (
            <>
              <p>
                If you believe that any content or material on gptoapk.com infringes your copyright, you or your authorized agent may submit a written notification to our designated DMCA agent. The notice must include the following information as required by 17 U.S.C. § 512(c)(3):
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.</li>
                <li>Identification of the copyrighted work(s) claimed to have been infringed. If multiple works are covered by a single notification, provide a representative list.</li>
                <li>Identification of the infringing material and information reasonably sufficient to permit us to locate the material on gptoapk.com (e.g., the specific URL or page link).</li>
                <li>Information reasonably sufficient to permit us to contact you, such as your name, email address, mailing address, and telephone number.</li>
                <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
              </ol>
            </>
          ),
        },
        {
          title: "Designated DMCA agent contact",
          body: (
            <>
              <p>Please send all DMCA notices to:</p>
              <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <p><strong>Email:</strong>{" "}
                  <a className="text-blue-600 hover:underline dark:text-blue-400" href="mailto:likaiwork12@gmail.com">
                    likaiwork12@gmail.com
                  </a>
                </p>
                <p className="mt-1"><strong>Subject line:</strong> DMCA Takedown Notice — gptoapk.com</p>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Please note that under Section 512(f) of the DMCA, anyone who knowingly materially misrepresents that content is infringing may be subject to liability for damages, including costs and attorneys&apos; fees.
              </p>
            </>
          ),
        },
        {
          title: "Counter-notification procedure",
          body: (
            <>
              <p>
                If you believe that content you posted was removed or access to it was disabled by mistake or misidentification, you may file a counter-notification with us. The counter-notification must include:
              </p>
              <ol className="list-decimal pl-6 space-y-2 mt-2">
                <li>Your physical or electronic signature.</li>
                <li>Identification of the material that has been removed or to which access has been disabled, and the location where the material appeared before it was removed or disabled.</li>
                <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification.</li>
                <li>Your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal district court for your judicial district (or the judicial district where gptoapk.com is located if you are outside the United States), and that you will accept service of process from the person who provided the original DMCA notification or an agent of such person.</li>
              </ol>
            </>
          ),
        },
        {
          title: "Repeat infringer policy",
          body: (
            <p>
              In accordance with the DMCA and other applicable laws, gptoapk.com will, in appropriate circumstances, disable and/or terminate access to the website for users who are repeat infringers. We reserve the right to take such action at our sole discretion.
            </p>
          ),
        },
        {
          title: "Disclaimer",
          body: (
            <p>
              gptoapk.com is an informational tool that helps users search for Android app information and locate APK download sources available publicly on the web. We do not host or store APK files. App names, icons, descriptions, and trademarks belong to their respective owners. If you are a rights holder and believe that any content on gptoapk.com should be removed for reasons beyond copyright infringement, you may still contact us at the email above and we will review your request.
            </p>
          ),
        },
        {
          title: "Paid and restricted apps",
          body: (
            <p>
              gptoapk.com does not provide paid apps for free, cracked APKs, or modified packages. Requests involving paid apps may be blocked with an unsupported notice, and repeat abuse or rights-holder reports may result in removal of related links or pages.
            </p>
          ),
        },
      ]}
    />
  );
}
