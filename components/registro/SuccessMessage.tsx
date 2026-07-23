export default function SuccessMessage() {
  return (
    <main className="min-h-screen bg-stone-100 px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-lg items-center justify-center sm:min-h-0">
        <section className="w-full rounded-[32px] border border-white/80 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.10)] sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 ring-1 ring-amber-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-8 w-8 text-amber-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="text-center text-3xl font-bold tracking-tight text-stone-900">
            Registro enviado
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-center text-[15px] leading-7 text-stone-600">
            Gracias por compartir tu información. Pronto alguien de nuestro equipo se pondrá en contacto contigo.
          </p>
        </section>
      </div>
    </main>
  )
}