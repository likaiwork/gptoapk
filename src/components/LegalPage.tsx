import type { ReactNode } from "react";
import Link from "next/link";

type LegalSection = {
  title: string;
  body: ReactNode;
};

type LegalPageProps = {
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

export default function LegalPage({ title, description, updated, sections }: LegalPageProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 border-b border-slate-200 pb-8 dark:border-slate-800">
        <p className="mb-3 text-sm font-semibold uppercase text-blue-600 dark:text-blue-400">
          gptoapk.com
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          {description}
        </p>
        <p className="mt-4 text-sm text-slate-500">Last updated: {updated}</p>
      </div>

      <div className="space-y-9">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3 leading-7 text-slate-600 dark:text-slate-300">
              {section.body}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800">
        Questions about these policies? Contact us at{" "}
        <a className="text-blue-600 hover:underline dark:text-blue-400" href="mailto:likaiwork12@gmail.com">
          likaiwork12@gmail.com
        </a>
        . You can also return to the{" "}
        <Link className="text-blue-600 hover:underline dark:text-blue-400" href="/en">
          home page
        </Link>
        .
      </div>
    </div>
  );
}
