import type { RegistroForm } from "@/types/registro"

export function validarPasoActual(paso: number, form: RegistroForm) {
  if (paso === 1 && (!form.nombre_completo.trim() || !form.celular.trim())) {
    return "Por favor completa nombre completo y celular."
  }

  if (paso === 2 && !form.acepto_jesus) {
    return "Por favor selecciona una opción para continuar."
  }

  if (paso === 4 && !form.autorizacion_datos) {
    return "Debes autorizar el tratamiento de datos para continuar."
  }

  return ""
}