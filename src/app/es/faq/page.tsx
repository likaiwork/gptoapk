import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preguntas frecuentes - APK Downloader | gptoapk.com",
  description:
    "Preguntas frecuentes sobre cómo descargar APK desde Google Play Store usando gptoapk.com. Cómo funciona, seguridad y consejos de solución de problemas.",
};

export default function EsFAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Preguntas frecuentes
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Todo lo que necesitas saber sobre cómo usar gptoapk.com para descargar archivos APK desde Google Play Store.
        </p>
      </div>

      <div className="space-y-6">
        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Qué es gptoapk.com?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            gptoapk.com es una herramienta gratuita en línea que te permite generar enlaces de descarga de APK directamente desde Google Play Store. Solo pega una URL de Google Play o el nombre del paquete y obtén un enlace de descarga directo al instante.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Es gratis?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Sí, totalmente gratis. Sin registro, sin cargos ocultos ni planes premium.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Cómo funciona?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Cuando pegas un enlace de Google Play, nuestro servidor obtiene el archivo APK directamente desde la CDN de Google y te entrega un enlace de descarga. Nunca modificamos ni almacenamos los archivos.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Es seguro descargar APK desde gptoapk.com?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Absolutamente. Los archivos se obtienen directamente desde los servidores de Google. Nunca tocamos ni modificamos los archivos, así que recibes APK 100 % originales y con la firma verificada.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Puedo descargar APK en mi teléfono?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            ¡Sí! Solo abre gptoapk.com en el navegador de tu móvil y pega el enlace. Funciona tanto en teléfonos como en computadoras.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Funciona con aplicaciones de pago?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Sí, pero necesitas haber comprado la aplicación con tu cuenta de Google para que se genere un enlace de descarga válido.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Tengo que instalar software o extensiones?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            No. gptoapk.com funciona completamente en el navegador. Sin descargas, sin extensiones, sin plugins.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Puedo descargar APK desde cualquier país?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Sí, gptoapk.com funciona en todo el mundo. Sin embargo, algunas aplicaciones pueden tener restricciones regionales en Google Play.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Cuál es la diferencia entre APK y AAB?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            APK es el formato de paquete instalable de Android. AAB (Android App Bundle) es un formato de publicación que usa Google Play. gptoapk.com gestiona ambos: cuando una app se publica como AAB, seguimos proporcionando un APK compatible.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Por qué obtengo un error 404 con algunas apps?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Algunas aplicaciones pueden estar restringidas geográficamente, eliminadas de Google Play o requerir una compatibilidad específica de dispositivo. Si la app está bloqueada por región, prueba con una VPN.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿Es legal descargar APK desde Google Play?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            Para uso personal, pruebas y copias de seguridad, totalmente. Redistribuir aplicaciones de pago o material protegido por derechos de autor sin permiso es ilegal.
          </div>
        </details>

        <details className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors list-none">
            <span className="font-semibold text-lg pr-4">¿gptoapk.com está afiliado a Google?</span>
            <svg className="w-5 h-5 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-4">
            No. gptoapk.com es una herramienta independiente y no está afiliada a Google ni a Google Play.
          </div>
        </details>
      </div>

      <div className="mt-16 text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <h2 className="text-2xl font-bold mb-3">¿Aún tienes preguntas?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Prueba nuestro <Link href="/es" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">APK Downloader</Link> y velo en acción, o consulta nuestro <Link href="/es/blog" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">blog</Link> para guías detalladas.
        </p>
      </div>
    </div>
  );
}
