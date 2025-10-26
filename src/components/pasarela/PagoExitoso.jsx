export default function PagoExitoso() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <h1 className="text-2xl font-bold text-green-700">¡Gracias por tu donación!</h1>
       <p className="mt-2 text-green-600">Gracias por tu apoyo. Tu donación fue registrada correctamente.</p>
      <a href="/campanas" className="mt-6 text-violet-600 font-semibold underline">
        Volver a campañas
      </a>
    </div>
  )
}