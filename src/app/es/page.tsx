import SearchBox from "@/components/SearchBox";
import Link from "next/link";

export default function EsHome() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center space-y-8 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          APK Downloader
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {"Busca por nombre de app, pega un enlace de Google Play o introduce el nombre del paquete para encontrar la app y generar un enlace de descarga APK."}
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
          <h3 className="text-xl font-bold mb-3">Descarga rápida</h3>
          <p className="text-slate-600 dark:text-slate-400">Sin esperas ni captchas. Genera enlaces de descarga directos en segundos.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Seguro y confiable</h3>
          <p className="text-slate-600 dark:text-slate-400">Los archivos se obtienen directamente de los servidores de Google. Sin modificaciones, APK 100 % originales.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Sin registro</h3>
          <p className="text-slate-600 dark:text-slate-400">Totalmente gratuito, sin cuenta ni extensiones.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-12">Cómo descargar APK desde Google Play</h2>
        <div className="space-y-8">
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Copia el enlace de Google Play</h3>
              <p className="text-slate-600 dark:text-slate-400">Encuentra cualquier aplicación en Google Play Store y copia su URL desde la barra de direcciones.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Pégalo y genera</h3>
              <p className="text-slate-600 dark:text-slate-400">Pega el enlace en el campo de arriba y haz clic en el botón Generar enlace.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="text-lg font-bold mb-1">Descarga tu APK</h3>
              <p className="text-slate-600 dark:text-slate-400">Haz clic en el enlace de descarga para guardar el archivo APK e instálalo en tu dispositivo Android.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Use This Tool */}
      <div className="mt-24 max-w-4xl w-full bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-extrabold text-center mb-8">¿Por qué elegir gptoapk.com?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Directo desde Google</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Los archivos provienen directamente de los servidores de Google</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Sin subidas</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Los archivos pasan por nuestros servidores pero nunca se almacenan</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">100 % gratis</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sin cargos ocultos ni planes premium</p>
            </div>
          </div>
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-green-500 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold">Sin registro</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Empieza a descargar de inmediato</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Preview */}
      <div className="mt-24 max-w-5xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-4">Guías y consejos para descargar APK</h2>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Aprende más sobre los archivos APK, su instalación y las mejores herramientas para extraer APK de Google Play.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/es/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">Cómo descargar APK desde Google Play: guía completa</h3>
            <p className="text-sm text-slate-500 mt-2">Guía completa que cubre herramientas web, ADB y mejores prácticas.</p>
          </Link>
          <Link href="/es/blog" className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
            <h3 className="font-bold group-hover:text-blue-600 transition-colors">¿Qué es un archivo APK?</h3>
            <p className="text-sm text-slate-500 mt-2">Todo lo que necesitas saber sobre los paquetes de instalación de Android.</p>
          </Link>
        </div>
        <div className="text-center mt-8">
          <Link href="/es/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Ver todos los artículos →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl w-full">
        <h2 className="text-3xl font-extrabold text-center mb-8">Preguntas frecuentes</h2>
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">¿Cómo descargar APK desde Google Play?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Solo pega el enlace de Google Play en esta página y haz clic en Generar enlace. Tu descarga estará lista en segundos.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">¿Es seguro descargar archivos APK?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Sí. Nuestra herramienta obtiene los archivos directamente de los servidores de Google. Los APK son 100 % originales y no modificados.</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-2">¿Necesito instalar algo?</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">No. gptoapk.com funciona completamente en tu navegador. Sin extensiones ni software.</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/es/faq" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Ver todas las preguntas →
          </Link>
        </div>
      </div>
    </div>
  );
}
