"use client"

import { useState } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

const PASOS_TOTAL = 4

const inputClass =
  "w-full rounded-2xl border border-stone-200 bg-white px-4 py-3.5 text-[15px] text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"

const labelClass = "mb-2 block text-[15px] font-semibold text-stone-900"

function ProgressDots({ paso }: { paso: number }) {
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

function Header({ paso, onBack }: { paso: number; onBack: () => void }) {
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
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

function InputIcon({ children }: { children: React.ReactNode }) {
  return <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">{children}</span>
}

export default function RegistroPage() {
  const [paso, setPaso] = useState(0)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  const [form, setForm] = useState({
    nombre_completo: "",
    celular: "",
    edad: "",
    barrio: "",
    fecha_nacimiento: "",
    como_conocio: "",
    invitado_por: "",
    acepto_jesus: "",
    peticion_oracion: "",
    autorizacion_datos: false,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : false
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  function siguiente() {
    setError("")

    if (paso === 1 && (!form.nombre_completo.trim() || !form.celular.trim())) {
      setError("Por favor completa nombre completo y celular.")
      return
    }

    if (paso === 2 && !form.acepto_jesus) {
      setError("Por favor selecciona una opción para continuar.")
      return
    }

    setPaso((prev) => prev + 1)
  }

  function anterior() {
    setError("")
    setPaso((prev) => Math.max(prev - 1, 0))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    if (!form.autorizacion_datos) {
      setError("Debes autorizar el tratamiento de datos para continuar.")
      return
    }

    setCargando(true)

    const { error } = await supabase.from("personas").insert([
      {
        nombre_completo: form.nombre_completo,
        celular: form.celular,
        edad: form.edad ? parseInt(form.edad) : null,
        barrio: form.barrio || null,
        fecha_nacimiento: form.fecha_nacimiento || null,
        como_conocio: form.como_conocio || null,
        invitado_por: form.invitado_por || null,
        acepto_jesus: form.acepto_jesus === "si",
        peticion_oracion: form.peticion_oracion || null,
        autorizacion_datos: form.autorizacion_datos,
      },
    ])

    setCargando(false)

    if (error) {
      setError("Hubo un error al enviar el registro.")
      return
    }

    setEnviado(true)
  }

  if (enviado) {
    return (
      <main className="min-h-screen bg-stone-100 px-4 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-lg items-center justify-center sm:min-h-0">
          <section className="w-full rounded-[32px] border border-white/80 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.10)] sm:p-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 ring-1 ring-amber-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-8 w-8 text-amber-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="text-center text-3xl font-bold tracking-tight text-stone-900">Registro enviado</h1>
            <p className="mx-auto mt-3 max-w-sm text-center text-[15px] leading-7 text-stone-600">
              Gracias por compartir tu información. Pronto alguien de nuestro equipo se pondrá en contacto contigo.
            </p>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.14),_transparent_28%),linear-gradient(to_bottom,_#fafaf9,_#f5f5f4)] px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto flex w-full max-w-lg justify-center">
        <section className="relative w-full overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
          {paso === 0 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(135deg,rgba(217,119,6,0.22),transparent_30%),linear-gradient(25deg,rgba(245,158,11,0.28),transparent_35%),linear-gradient(180deg,transparent,rgba(245,158,11,0.08))]" />
          )}

          <Header paso={paso} onBack={anterior} />

          <div className="relative z-10 flex min-h-[660px] flex-col px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
            {paso === 0 && (
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-9 w-9 text-amber-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6.75-4.35-6.75-10.125A3.375 3.375 0 0 1 8.625 7.5c1.365 0 2.48.72 3.375 1.875.895-1.155 2.01-1.875 3.375-1.875a3.375 3.375 0 0 1 3.375 3.375C18.75 16.65 12 21 12 21Z" />
                  </svg>
                </div>

                <p className="mt-8 text-base leading-7 text-stone-500">
                  El siguiente proceso tomará solo unos minutos.
                </p>

                <button
                  type="button"
                  onClick={() => setPaso(1)}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-5 py-4 text-lg font-semibold text-white shadow-[0_14px_30px_rgba(217,119,6,0.28)] transition hover:opacity-95 active:scale-[0.99]"
                >
                  Comenzar
                </button>

                <ProgressDots paso={1} />
              </div>
            )}

            {paso === 1 && (
              <div className="flex flex-1 flex-col">
                <h2 className="text-[30px] font-bold tracking-tight text-stone-900 sm:text-[34px]">Información personal</h2>
                <p className="mt-2 text-lg leading-7 text-stone-600">Cuéntanos un poco sobre ti.</p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="nombre_completo" className={labelClass}>Nombre completo</label>
                    <div className="relative">
                      <InputIcon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0" /></svg></InputIcon>
                      <input id="nombre_completo" name="nombre_completo" value={form.nombre_completo} onChange={handleChange} className={inputClass + " pl-12"} placeholder="Escribe tu nombre completo" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="celular" className={labelClass}>Celular</label>
                    <div className="relative">
                      <InputIcon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 7.456 6.044 13.5 13.5 13.5h2.25A2.25 2.25 0 0 0 20.25 18v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a.99.99 0 0 1-1.21.305 10.499 10.499 0 0 1-5.068-5.068.99.99 0 0 1 .305-1.21l1.293-.97c.363-.272.53-.74.417-1.173L7.463 4.602A1.125 1.125 0 0 0 6.372 3.75H5A2.25 2.25 0 0 0 2.75 6v.75Z" /></svg></InputIcon>
                      <input id="celular" name="celular" value={form.celular} onChange={handleChange} className={inputClass + " pl-12"} placeholder="Ej. 300 123 4567" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="edad" className={labelClass}>Edad</label>
                    <div className="relative">
                      <InputIcon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5M8.25 12h7.5m-7.5 4.5h4.5M6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75Z" /></svg></InputIcon>
                      <input id="edad" name="edad" type="number" value={form.edad} onChange={handleChange} className={inputClass + " pl-12"} placeholder="Ej. 25" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="fecha_nacimiento" className={labelClass}>Fecha de nacimiento</label>
                    <input id="fecha_nacimiento" name="fecha_nacimiento" type="date" value={form.fecha_nacimiento} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="barrio" className={labelClass}>Barrio o dirección</label>
                    <div className="relative">
                      <InputIcon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg></InputIcon>
                      <input id="barrio" name="barrio" value={form.barrio} onChange={handleChange} className={inputClass + " pl-12"} placeholder="Escribe tu barrio o dirección" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paso === 2 && (
              <div className="flex flex-1 flex-col">
                <h2 className="text-[30px] font-bold tracking-tight text-stone-900 sm:text-[34px]">Conócenos mejor</h2>
                <p className="mt-2 text-lg leading-7 text-stone-600">Estas preguntas nos ayudan a conocerte más.</p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="como_conocio" className={labelClass}>¿Cómo nos conoció?</label>
                    <select id="como_conocio" name="como_conocio" value={form.como_conocio} onChange={handleChange} className={inputClass}>
                      <option value="">Selecciona una opción</option>
                      <option value="amigo o familiar">Amigo o familiar</option>
                      <option value="redes sociales">Redes sociales</option>
                      <option value="evento o campaña">Evento o campaña</option>
                      <option value="pasaba por el lugar">Pasaba por el lugar</option>
                      <option value="otra">Otra</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="invitado_por" className={labelClass}>¿Quién lo invitó?</label>
                    <input id="invitado_por" name="invitado_por" value={form.invitado_por} onChange={handleChange} className={inputClass} placeholder="Escribe el nombre de la persona" />
                  </div>

                  <fieldset>
                    <legend className={labelClass}>¿Aceptó a Jesús hoy?</legend>
                    <p className="mb-4 text-base leading-7 text-stone-600">Este paso es muy importante en nuestra caminata espiritual.</p>

                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, acepto_jesus: "si" }))}
                        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${form.acepto_jesus === "si" ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white hover:bg-stone-50"}`}
                      >
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${form.acepto_jesus === "si" ? "border-amber-500 bg-amber-500 text-white" : "border-stone-300 bg-white"}`}>
                          {form.acepto_jesus === "si" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13.5 9.5 18 19 7.5" /></svg>}
                        </span>
                        <span className="text-[15px] font-medium text-stone-800">Sí, acepté a Jesús hoy</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, acepto_jesus: "no" }))}
                        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition ${form.acepto_jesus === "no" ? "border-amber-500 bg-amber-50" : "border-stone-200 bg-white hover:bg-stone-50"}`}
                      >
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${form.acepto_jesus === "no" ? "border-amber-500 bg-amber-500 text-white" : "border-stone-300 bg-white"}`}>
                          {form.acepto_jesus === "no" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13.5 9.5 18 19 7.5" /></svg>}
                        </span>
                        <span className="text-[15px] font-medium text-stone-800">Aún no</span>
                      </button>
                    </div>
                  </fieldset>
                </div>
              </div>
            )}

            {paso === 3 && (
              <div className="flex flex-1 flex-col">
                <h2 className="text-[30px] font-bold tracking-tight text-stone-900 sm:text-[34px]">Petición de oración</h2>
                <p className="mt-2 text-lg leading-7 text-stone-600">Cuéntanos en qué podemos orar por ti.</p>

                <div className="mt-8 flex flex-1 flex-col">
                  <label htmlFor="peticion_oracion" className={labelClass}>Escribe tu petición</label>
                  <textarea id="peticion_oracion" name="peticion_oracion" value={form.peticion_oracion} onChange={handleChange} className="min-h-[250px] flex-1 resize-none rounded-3xl border border-stone-200 bg-white px-4 py-4 text-[15px] text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100" placeholder="Comparte tu petición de oración con nosotros..." />
                </div>
              </div>
            )}

            {paso === 4 && (
              <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
                <h2 className="text-[30px] font-bold tracking-tight text-stone-900 sm:text-[34px]">Último paso</h2>
                <p className="mt-2 text-lg leading-7 text-stone-600">Tu información está segura con nosotros.</p>

                <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50/70 p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-600 ring-1 ring-amber-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-1.5 0h12a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 19.5V12a1.5 1.5 0 0 1 1.5-1.5Z" />
                      </svg>
                    </div>
                    <p className="text-[15px] leading-7 text-stone-700">Tu información será utilizada únicamente para fines del ministerio y no será compartida con terceros.</p>
                  </div>
                </div>

                <label className="mt-7 flex items-start gap-3 text-[15px] leading-7 text-stone-700">
                  <input name="autorizacion_datos" type="checkbox" checked={form.autorizacion_datos} onChange={handleChange} className="mt-1 h-5 w-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500" />
                  <span>Autorizo el tratamiento de mis datos personales</span>
                </label>

                {error && <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

                <button type="submit" disabled={cargando} className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-5 py-4 text-lg font-semibold text-white shadow-[0_14px_30px_rgba(217,119,6,0.28)] transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60">
                  {cargando ? "Enviando registro..." : "Enviar registro"}
                </button>
              </form>
            )}

            {paso > 0 && paso < 4 && (
              <div className="mt-8">
                {error && <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
                <button type="button" onClick={siguiente} className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-5 py-4 text-lg font-semibold text-white shadow-[0_14px_30px_rgba(217,119,6,0.28)] transition hover:opacity-95 active:scale-[0.99]">
                  Siguiente
                </button>
                <ProgressDots paso={paso} />
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
