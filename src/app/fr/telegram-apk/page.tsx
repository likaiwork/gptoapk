import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Télécharger Telegram APK pour Android",
  description:
    "Téléchargez la dernière version de Telegram APK. Guide d'installation.",
};

export default function TelegramApkPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/fr" className="hover:underline">Accueil</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">Telegram APK</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
        Télécharger Telegram APK pour Android
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        Telegram est l'une des applications de messagerie les plus rapides et sécurisées au monde.
        Très populaire en France et en Afrique, elle offre des canaux, des groupes, des bots et
        le partage de fichiers jusqu'à 2 Go. Découvrez comment télécharger Telegram APK et
        l'installer sur votre Android sans Google Play.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">Telegram APK — Dernière Version</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-slate-200 dark:border-slate-700">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold">Paramètre</th>
              <th className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold">Valeur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Version</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">11.7.1</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Date de Mise à Jour</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">Mai 2026</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Taille de l'APK</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">~55 Mo</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Android Minimum</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">Android 5.0+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Comment Télécharger Telegram APK</h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>Rendez-vous sur gptoapk.com</strong> — l'outil le plus rapide pour télécharger des APK.</li>
        <li><strong>Recherchez &quot;Telegram&quot;</strong> dans la barre de recherche.</li>
        <li><strong>Cliquez sur &quot;Télécharger l'APK&quot;</strong> pour obtenir la dernière version.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">Comment Installer Telegram APK</h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>Autorisez les sources inconnues</strong> dans les Paramètres.</li>
        <li><strong>Ouvrez le fichier APK</strong> téléchargé.</li>
        <li><strong>Appuyez sur &quot;Installer&quot;</strong> et attendez.</li>
        <li><strong>Ouvrez Telegram</strong> et connectez-vous avec votre numéro de téléphone.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">Fonctionnalités de Telegram</h2>
      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 mb-8">
        <li>Chiffrement de bout en bout pour les discussions secrètes</li>
        <li>Groupes jusqu'à 200 000 membres</li>
        <li>Canaux avec abonnés illimités</li>
        <li>Partage de fichiers jusqu'à 2 Go</li>
        <li>Synchronisation cloud entre tous vos appareils</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4">Questions Fréquentes (FAQ)</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Telegram est-il sécurisé ?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Oui. Telegram APK officiel téléchargé depuis gptoapk.com est 100 % sûr, sans virus ni logiciel malveillant.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">Telegram est-il bloqué en Afrique ?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Telegram est accessible dans la plupart des pays africains. Le téléchargement via APK est simplement une alternative pratique au Google Play.</p>
        </div>
      </div>

      {/* CTA Block */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
        <p className="font-semibold text-lg mb-2">Besoin de la dernière version de l'APK ?</p>
        <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — un moyen rapide et sûr de télécharger n'importe quel APK. Entrez simplement le nom de l'application dans la barre de recherche.</p>
        <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Rechercher →<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
      </div>
    </div>
  );
}
