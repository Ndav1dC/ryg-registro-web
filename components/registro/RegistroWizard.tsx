"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { initialRegistroForm } from "@/lib/registro/initial-state"
import { mapRegistroToPersona } from "@/lib/registro/mapper"
import { validarPasoActual } from "@/lib/registro/validation"
import type { RegistroForm } from "@/types/registro"
import RegistroHeader from "./RegistroHeader"
import ProgressDots from "./ProgressDots"
import StepWelcome from "./StepWelcome"
import StepPersonalInfo from "./StepPersonalInfo"
import StepChurchInfo from "./StepChurchInfo"
import StepPrayerRequest from "./StepPrayerRequest"
import StepPrivacy from "./StepPrivacy"
import SuccessMessage from "./SuccessMessage"

export default function RegistroWizard() {
  const [paso, setPaso] = useState(0)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const [form, setForm] = useState<RegistroForm>(initialRegistroForm)

  function updateField(name: keyof RegistroForm, value: string | boolean) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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
    const validationError = validarPasoActual(paso, form)

    if (validationError) {
      setError(validationError)
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

    const validationError = validarPasoActual(4, form)

    if (validationError) {
      setError(validationError)
      return
    }

    setCargando(true)

    const { error } = await supabase.from("personas").insert([mapRegistroToPersona(form)])

    setCargando(false)

    if (error) {
      setError("Hubo un error al enviar el registro.")
      return
    }

    setEnviado(true)
  }

  if (enviado) {
    return <SuccessMessage />
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.14),_transparent_28%),linear-gradient(to_bottom,_#fafaf9,_#f5f5f4)] px-4 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto flex w-full max-w-lg justify-center">
        <section className="relative w-full overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
          {paso === 0 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(135deg,rgba(217,119,6,0.22),transparent_30%),linear-gradient(25deg,rgba(245,158,11,0.28),transparent_35%),linear-gradient(180deg,transparent,rgba(245,158,11,0.08))]" />
          )}

          <RegistroHeader paso={paso} onBack={anterior} />

          <div className="relative z-10 flex min-h-[660px] flex-col px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
            {paso === 0 && <StepWelcome onStart={() => setPaso(1)} />}
            {paso === 1 && <StepPersonalInfo form={form} onChange={handleChange} />}
            {paso === 2 && (
              <StepChurchInfo form={form} onChange={handleChange} onSelect={updateField} />
            )}
            {paso === 3 && <StepPrayerRequest form={form} onChange={handleChange} />}
            {paso === 4 && (
              <StepPrivacy
                form={form}
                error={error}
                cargando={cargando}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            )}

            {paso > 0 && paso < 4 && (
              <div className="mt-8">
                {error && (
                  <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={siguiente}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-5 py-4 text-lg font-semibold text-white shadow-[0_14px_30px_rgba(217,119,6,0.28)] transition hover:opacity-95 active:scale-[0.99]"
                >
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