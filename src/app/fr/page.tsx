import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function FrHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Téléchargeur APK
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Téléchargez des APK directement depuis Google Play Store. Collez un lien Google Play ou un identifiant d&apos;application ci-dessous et générez votre lien de téléchargement instantanément.
        </p>
        <div className="mt-8">
          <SearchBox />
        </div>
      </div>

      {/* Features */}
      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Téléchargement rapide</h3>
          <p className="text-slate-600 dark:text-slate-400">Pas d&apos;attente, pas de captchas. Générez des liens de téléchargement directs en quelques secondes.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Sûr et fiable</h3>
          <p className="text-slate-600 dark:text-slate-400">Les fichiers sont récupérés directement depuis les serveurs de Google. Aucune modification, des APK 100 % originaux.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Aucune inscription</h3>
          <p className="text-slate-600 dark:text-slate-400">Totalement gratuit, sans création de compte ni installation d&apos;extension.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">Comment télécharger un APK depuis Google Play</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Copiez le lien Google Play</h3>
              <p className="text-slate-600 dark:text-slate-400">Trouvez l&apos;application sur Google Play Store et copiez son URL depuis la barre d&apos;adresse.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Collez et générez</h3>
              <p className="text-slate-600 dark:text-slate-400">Collez le lien dans le champ ci-dessus et cliquez sur le bouton Générer le lien.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Téléchargez votre APK</h3>
              <p className="text-slate-600 dark:text-slate-400">Cliquez sur le lien de téléchargement pour enregistrer le fichier APK et installez-le sur votre appareil Android.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">Pourquoi choisir gptoapk.com&nbsp;?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Direct depuis Google</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Les fichiers proviennent directement des serveurs Google</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Aucun téléversement</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Les fichiers transitent par nos serveurs sans jamais y être stockés</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100 % gratuit</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Pas de frais cachés, pas d&apos;abonnement premium</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Sans inscription</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Commencez à télécharger immédiatement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">Guides et astuces de téléchargement APK</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Apprenez-en plus sur les fichiers APK, leur installation et les meilleurs outils pour extraire des APK de Google Play.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/fr/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Comment télécharger un APK depuis Google Play&nbsp;: guide complet</h3>
            <p className="text-sm text-slate-500 mt-2">Guide complet couvrant les outils web, ADB et les meilleures pratiques.</p>
          </Link>
          <Link href="/fr/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Qu&apos;est-ce qu&apos;un fichier APK&nbsp;?</h3>
            <p className="text-sm text-slate-500 mt-2">Tout ce qu&apos;il faut savoir sur les paquets d&apos;installation Android.</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/fr/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Voir tous les articles →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">Questions fréquentes</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Comment télécharger un APK depuis Google Play&nbsp;?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Il suffit de coller le lien Google Play sur cette page et de cliquer sur Générer le lien. Votre APK sera prêt en quelques secondes.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Est-il sûr de télécharger des APK&nbsp;?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Oui. Notre outil récupère les fichiers directement depuis les serveurs Google. Les APK sont 100 % originaux et non modifiés.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Dois-je installer quelque chose&nbsp;?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Non. gptoapk.com fonctionne entièrement dans votre navigateur, sans extensions ni logiciels.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/fr/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Voir toutes les FAQ →
          </Link>
        </div>
      </div>
    </div>
  );
}
