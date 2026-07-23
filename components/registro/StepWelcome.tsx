import ProgressDots from "./ProgressDots"

export default function StepWelcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
        ¡Bienvenido!
      </h1>

      <p className="mt-5 max-w-sm text-lg leading-8 text-stone-700">
        Gracias por decidir formar parte de nuestra familia.
      </p>

      <p className="mt-5 max-w-sm text-lg leading-8 text-stone-700">
        Este registro nos ayudará a conocerte mejor y a orar por ti.
      </p>

      <div className="mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50/80 ring-1 ring-amber-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-9 w-9 text-amber-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21s-6.75-4.35-6.75-10.125A3.375 3.375 0 0 1 8.625 7.5c1.365 0 2.48.72 3.375 1.875.895-1.155 2.01-1.875 3.375-1.875a3.375 3.375 0 0 1 3.375 3.375C18.75 16.65 12 21 12 21Z"
          />
        </svg>
      </div>

      <p className="mt-8 text-base leading-7 text-stone-500">
        El siguiente proceso tomará solo unos minutos.
      </p>

      <button
        type="button"
        onClick={onStart}
        className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-5 py-4 text-lg font-semibold text-white shadow-[0_14px_30px_rgba(217,119,6,0.28)] transition hover:opacity-95 active:scale-[0.99]"
      >
        Comenzar
      </button>

      <ProgressDots paso={1} />
    </div>
  )
}