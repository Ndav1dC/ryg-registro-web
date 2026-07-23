import { inputClass, labelClass } from "@/lib/registro/constants"
import type { RegistroForm } from "@/types/registro"
import InputIcon from "./InputIcon"

type Props = {
  form: RegistroForm
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function StepPersonalInfo({ form, onChange }: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-[30px] font-bold tracking-tight text-stone-900 sm:text-[34px]">
        Información personal
      </h2>

      <p className="mt-2 text-lg leading-7 text-stone-600">
        Cuéntanos un poco sobre ti.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label htmlFor="nombre_completo" className={labelClass}>
            Nombre completo
          </label>
          <div className="relative">
            <InputIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0" />
              </svg>
            </InputIcon>
            <input
              id="nombre_completo"
              name="nombre_completo"
              value={form.nombre_completo}
              onChange={onChange}
              className={inputClass + " pl-12"}
              placeholder="Escribe tu nombre completo"
            />
          </div>
        </div>

        <div>
          <label htmlFor="celular" className={labelClass}>
            Celular
          </label>
          <div className="relative">
            <InputIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 7.456 6.044 13.5 13.5 13.5h2.25A2.25 2.25 0 0 0 20.25 18v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a.99.99 0 0 1-1.21.305 10.499 10.499 0 0 1-5.068-5.068.99.99 0 0 1 .305-1.21l1.293-.97c.363-.272.53-.74.417-1.173L7.463 4.602A1.125 1.125 0 0 0 6.372 3.75H5A2.25 2.25 0 0 0 2.75 6v.75Z" />
              </svg>
            </InputIcon>
            <input
              id="celular"
              name="celular"
              value={form.celular}
              onChange={onChange}
              className={inputClass + " pl-12"}
              placeholder="Ej. 300 123 4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="edad" className={labelClass}>
            Edad
          </label>
          <div className="relative">
            <InputIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5M8.25 12h7.5m-7.5 4.5h4.5M6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75Z" />
              </svg>
            </InputIcon>
            <input
              id="edad"
              name="edad"
              type="number"
              value={form.edad}
              onChange={onChange}
              className={inputClass + " pl-12"}
              placeholder="Ej. 25"
            />
          </div>
        </div>

        <div>
          <label htmlFor="fecha_nacimiento" className={labelClass}>
            Fecha de nacimiento
          </label>
          <input
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={form.fecha_nacimiento}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="barrio" className={labelClass}>
            Barrio o dirección
          </label>
          <div className="relative">
            <InputIcon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </InputIcon>
            <input
              id="barrio"
              name="barrio"
              value={form.barrio}
              onChange={onChange}
              className={inputClass + " pl-12"}
              placeholder="Escribe tu barrio o dirección"
            />
          </div>
        </div>
      </div>
    </div>
  )
}