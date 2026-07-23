import type { RegistroForm } from "@/types/registro"

type Props = {
  form: RegistroForm
  error: string
  cargando: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export default function StepPrivacy({
  form,
  error,
  cargando,
  onChange,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col">
      <h2 className="text-[30px] font-bold tracking-tight text-stone-900 sm:text-[34px]">
        Último paso
      </h2>

      <p className="mt-2 text-lg leading-7 text-stone-600">
        Tu información está segura con nosotros.
      </p>

      <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50/70 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-600 ring-1 ring-amber-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-1.5 0h12a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 19.5V12a1.5 1.5 0 0 1 1.5-1.5Z" />
            </svg>
          </div>

          <p className="text-[15px] leading-7 text-stone-700">
            Tu información será utilizada únicamente para fines del ministerio y no será compartida con terceros.
          </p>
        </div>
      </div>

      <label className="mt-7 flex items-start gap-3 text-[15px] leading-7 text-stone-700">
        <input
          name="autorizacion_datos"
          type="checkbox"
          checked={form.autorizacion_datos}
          onChange={onChange}
          className="mt-1 h-5 w-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
        />
        <span>Autorizo el tratamiento de mis datos personales</span>
      </label>

      {error && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={cargando}
        className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-5 py-4 text-lg font-semibold text-white shadow-[0_14px_30px_rgba(217,119,6,0.28)] transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {cargando ? "Enviando registro..." : "Enviar registro"}
      </button>
    </form>
  )
}