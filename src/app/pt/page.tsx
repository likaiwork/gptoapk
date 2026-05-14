import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function PtHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK Downloader
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {"Pesquise pelo nome do app, cole um link do Google Play ou insira o nome do pacote para encontrar o app e gerar um link de download APK."}
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
          <h3 className="text-xl font-bold mb-3">Download Rápido</h3>
          <p className="text-slate-600 dark:text-slate-400">Sem espera, sem captchas. Gere links de download diretos em segundos.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Seguro e Confiável</h3>
          <p className="text-slate-600 dark:text-slate-400">Arquivos obtidos diretamente dos servidores do Google. Sem modificações, APKs 100% originais.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Sem Cadastro</h3>
          <p className="text-slate-600 dark:text-slate-400">Totalmente grátis para usar, sem precisar criar conta ou baixar extensões.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">Como baixar APK da Google Play</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Copie o link da Google Play</h3>
              <p className="text-slate-600 dark:text-slate-400">Encontre qualquer aplicativo na Google Play Store e copie a URL da barra de endereços.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Cole e gere</h3>
              <p className="text-slate-600 dark:text-slate-400">Cole o link na caixa acima e clique no botão Gerar Link.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Baixe seu APK</h3>
              <p className="text-slate-600 dark:text-slate-400">Clique no link de download para salvar o arquivo APK e instale-o no seu dispositivo Android.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">Por que escolher o gptoapk.com?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Direto do Google</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Arquivos vêm diretamente dos servidores do Google</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Sem upload</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Arquivos passam pelos servidores, mas nunca são armazenados</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100% gratuito</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sem taxas escondidas, sem planos premium</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Sem cadastro</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Comece a baixar imediatamente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">Guias e dicas para baixar APK</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Saiba mais sobre arquivos APK, instalação e as melhores ferramentas para extração de APK do Google Play.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/pt/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Como baixar APK da Google Play: guia completo</h3>
            <p className="text-sm text-slate-500 mt-2">Guia abrangente sobre ferramentas web, ADB e melhores práticas.</p>
          </Link>
          <Link href="/pt/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">O que é um arquivo APK?</h3>
            <p className="text-sm text-slate-500 mt-2">Tudo o que você precisa saber sobre os arquivos de pacote do Android.</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/pt/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Ver todos os artigos →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">Perguntas frequentes</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Como baixar APK da Google Play?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Basta colar o link da Google Play nesta página e clicar em Gerar Link. O download do seu APK estará pronto em segundos.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">É seguro baixar arquivos APK?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Sim. Nossa ferramenta busca arquivos diretamente dos servidores do Google. Os APKs são 100% originais e sem modificações.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">Preciso instalar algum programa?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Não. O gptoapk.com funciona inteiramente no seu navegador, sem extensões nem softwares adicionais.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/pt/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Ver todas as perguntas →
          </Link>
        </div>
      </div>
    </div>
  );
}
