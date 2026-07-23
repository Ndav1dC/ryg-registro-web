import { PASOS_TOTAL } from "@/lib/registro/constants"

export default function ProgressDots({ paso }: { paso: number }) {
  return (
    <div className="mt-5 flex flex-col items-center gap-2">
      <div className="flex items-center gap-2.5">
        {Array.from({ length: PASOS_TOTAL }).map((_, i) => {
          const activo = i < paso

          return (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                activo ? "bg-amber-500" : "bg-stone-300"
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}