import { labelClass } from "@/lib/registro/constants"
import type { RegistroForm } from "@/types/registro"

type Props = {
  form: RegistroForm
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export default function StepPrayerRequest({ form, onChange }: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-[30px] font-bold tracking-tight text-stone-900 sm:text-[34px]">
        Petición de oración
      </h2>

      <p className="mt-2 text-lg leading-7 text-stone-600">
        Cuéntanos en qué podemos orar por ti.
      </p>

      <div className="mt-8 flex flex-1 flex-col">
        <label htmlFor="peticion_oracion" className={labelClass}>
          Escribe tu petición
        </label>

        <textarea
          id="peticion_oracion"
          name="peticion_oracion"
          value={form.peticion_oracion}
          onChange={onChange}
          className="min-h-[250px] flex-1 resize-none rounded-3xl border border-stone-200 bg-white px-4 py-4 text-[15px] text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          placeholder="Comparte tu petición de oración con nosotros..."
        />
      </div>
    </div>
  )
}