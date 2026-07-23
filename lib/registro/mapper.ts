import type { RegistroForm } from "@/types/registro"

export function mapRegistroToPersona(form: RegistroForm) {
  return {
    nombre_completo: form.nombre_completo,
    celular: form.celular,
    edad: form.edad ? parseInt(form.edad, 10) : null,
    barrio: form.barrio || null,
    fecha_nacimiento: form.fecha_nacimiento || null,
    como_conocio: form.como_conocio || null,
    invitado_por: form.invitado_por || null,
    acepto_jesus: form.acepto_jesus === "si",
    peticion_oracion: form.peticion_oracion || null,
    autorizacion_datos: form.autorizacion_datos,
  }
}