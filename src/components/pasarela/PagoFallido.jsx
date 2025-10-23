export default function PagoFallido() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <h1 className="text-2xl font-bold text-red-700">El pago no se completó. Intenta de nuevo.</h1>
      <p className="mt-2 text-green-600">Gracias por tu apoyo. Tu donación fue registrada correctamente.</p>
      <a href="/campanas" className="mt-6 text-violet-600 font-semibold underline">
        Volver a campañas
      </a>
    </div>
  )
}