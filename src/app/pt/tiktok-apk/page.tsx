import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Baixar TikTok APK para Android (Brasil)",
  description:
    "Baixe o TikTok APK para Android. Instalação sem Google Play.",
};

export default function TikTokApkPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/pt" className="hover:underline">Início</Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700 dark:text-slate-300">TikTok APK</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
        Baixar TikTok APK para Android (Brasil)
      </h1>

      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
        O TikTok é a plataforma de vídeos curtos mais popular do mundo. Com milhões de usuários
        no Brasil, o aplicativo permite criar, assistir e compartilhar vídeos criativos. Aprenda
        como baixar o TikTok APK e instalá-lo no seu Android sem usar o Google Play.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4">TikTok APK — Última Versão</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-slate-200 dark:border-slate-700">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold">Parâmetro</th>
              <th className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Versão</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">38.8.4</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Data de Atualização</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">Maio 2026</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Tamanho do APK</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">~120 MB</td>
            </tr>
            <tr>
              <td className="border border-slate-200 dark:border-slate-700 p-3 font-medium">Android Mínimo</td>
              <td className="border border-slate-200 dark:border-slate-700 p-3">Android 6.0+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Como Baixar o TikTok APK</h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>Acesse gptoapk.com</strong> no navegador do seu celular.</li>
        <li><strong>Digite &quot;TikTok&quot; na barra de pesquisa</strong>.</li>
        <li><strong>Clique em &quot;Baixar APK&quot;</strong> para baixar a versão mais recente.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">Como Instalar o TikTok APK</h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-700 dark:text-slate-300 mb-8">
        <li><strong>Ative a instalação de fontes desconhecidas</strong> nas Configurações.</li>
        <li><strong>Abra o arquivo APK</strong> baixado na pasta &quot;Downloads&quot;.</li>
        <li><strong>Toque em &quot;Instalar&quot;</strong> e aguarde a conclusão.</li>
        <li><strong>Crie sua conta</strong> e comece a explorar o TikTok.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4">Perguntas Frequentes (FAQ)</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">O TikTok é gratuito no Brasil?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Sim, o TikTok é completamente gratuito. Você pode baixar o APK e usar todas as funcionalidades sem pagar nada.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
          <h3 className="font-bold mb-2">O TikTok APK funciona em tablets Android?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Sim, o TikTok funciona em smartphones e tablets Android. A interface se adapta ao tamanho da tela.</p>
        </div>
      </div>

      {/* CTA Block */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 mt-8">
        <p className="font-semibold text-lg mb-2">Precisa da versão mais recente do APK?</p>
        <p className="mb-3"><a href="https://gptoapk.com" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">gptoapk.com</a> — uma maneira rápida e segura de baixar qualquer APK. Basta digitar o nome do aplicativo na barra de pesquisa.</p>
        <a href="https://gptoapk.com" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Pesquisar Agora →<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></a>
      </div>
    </div>
  );
}
