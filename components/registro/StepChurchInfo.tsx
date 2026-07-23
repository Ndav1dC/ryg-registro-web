import { inputClass, labelClass } from "@/lib/registro/constants"
import type { RegistroForm } from "@/types/registro"

type Props = {
  form: RegistroForm
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
  onSelect: (name: keyof RegistroForm, value: string | boolean) => void
}

export default function StepChurchInfo({ form, onChange, onSelect }: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-[30px] font-bold tracking-tight text-stone-900 sm:text-[34px]">
        Conócenos mejor
      </h2>

      <p className="mt-2 text-lg leading-7 text-stone-600">
        Estas preguntas nos ayudan a conocerte más.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="como_conocio" className={labelClass}>
            ¿Cómo nos conoció?
          </label>
          <select
            id="como_conocio"
            name="como_conocio"
            value={form.como_conocio}
            onChange={onChange}
            className={inputClass}
          >
            <option value="">Selecciona una opción</option>
            <option value="amigo o familiar">Amigo o familiar</option>
            <option value="redes sociales">Redes sociales</option>
            <option value="evento o campaña">Evento o campaña</option>
            <option value="pasaba por el lugar">Pasaba por el lugar</option>
            <option value="otra">Otra</option>
          </select>
        </div>

        <div>
          <label htmlFor="invitado_por" className={labelClass}>
            ¿Quién lo invitó?
          </label>
          <input
            id="invitado_por"
            name="invitado_por"
            value={form.invitado_por}
            onChange={onChange}
            className={inputClass}
            placeholder="Escribe el nombre de la persona"
          />
        </div>

        <fieldset>
          <legend className={labelClass}>¿Aceptó a Jesús hoy?</legend>
          <p className="mb-4 text-base leading-7 text-stone-600">
            Este paso es muy importante en nuestra caminata espiritual.
          </p>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => onSelect("acepto_jesus", "si")}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                form.acepto_jesus === "si"
                  ? "border-amber-500 bg-amber-50"
                  : "border-stone-200 bg-white hover:bg-stone-50"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  form.acepto_jesus === "si"
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-stone-300 bg-white"
                }`}
              >
                {form.acepto_jesus === "si" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13.5 9.5 18 19 7.5" />
                  </svg>
                )}
              </span>
              <span className="text-[15px] font-medium text-stone-800">
                Sí, acepté a Jesús hoy
              </span>
            </button>

            <button
              type="button"
              onClick={() => onSelect("acepto_jesus", "no")}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${
                form.acepto_jesus === "no"
                  ? "border-amber-500 bg-amber-50"
                  : "border-stone-200 bg-white hover:bg-stone-50"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  form.acepto_jesus === "no"
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-stone-300 bg-white"
                }`}
              >
                {form.acepto_jesus === "no" && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13.5 9.5 18 19 7.5" />
                  </svg>
                )}
              </span>
              <span className="text-[15px] font-medium text-stone-800">Aún no</span>
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  )
}