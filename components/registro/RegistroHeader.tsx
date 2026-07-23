import Image from "next/image"

type Props = {
  paso: number
  onBack: () => void
}

export default function RegistroHeader({ paso, onBack }: Props) {
  return (
    <div className="px-5 pt-4 sm:px-6 sm:pt-5">
      <div className="flex items-center justify-between">
        {paso > 0 ? (
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-stone-50"
            aria-label="Volver"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        ) : (
          <div className="h-10 w-10" />
        )}

        <div className="flex justify-center">
          <Image
            src={paso === 0 ? "/logo-completo.png" : "/logo-icono.png"}
            alt="Reino y Gloria"
            width={paso === 0 ? 220 : 80}
            height={paso === 0 ? 110 : 80}
            className={paso === 0 ? "h-20 w-auto sm:h-24" : "h-14 w-auto sm:h-16"}
            priority
          />
        </div>

        <div className="h-10 w-10" />
      </div>

      <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
    </div>
  )
}