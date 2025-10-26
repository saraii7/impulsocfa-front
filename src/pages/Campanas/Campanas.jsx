import CardCampana from "../../components/CardCampana"
import { getAllCampaigns, getCampaignsByCategory} from "../../services/campaing.service"
import { getCategories } from "../../services/category.service"
import { useEffect, useState } from "react"

export default function Campanas() {
  const [campanas, setCampanas] = useState([])
   const [categories, setCategories] = useState([])
   const [selectedCategory, setSelectedCategory] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

// 🟣 useEffect principal: carga categorías y campañas al montar
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Carga las categorías y todas las campañas aprobadas
        const [cats, camps] = await Promise.all([
          getCategories(),
          getCampaignsByCategory(), // sin parámetro → trae todas
        ])
        setCategories(cats)
        setCampanas(camps)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 🟣 Manejador de cambio de categoría
  const handleCategoryChange = async (e) => {
    const id_categoria = e.target.value
    setSelectedCategory(id_categoria)

    try {
      setLoading(true)
      const filtered = await getCampaignsByCategory(id_categoria)
      setCampanas(filtered)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50">
        <p className="text-violet-600 text-lg font-semibold animate-pulse">Cargando campañas...</p>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50">
        <p className="text-red-600 font-medium">Error: {error}</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 py-16 px-6 text-slate-800">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Campañas Activas
        </h1>
        <p className="text-slate-700 max-w-2xl mx-auto mb-6">
          Explorá las campañas solidarias en curso y descubrí cómo podés aportar para generar un impacto real.
        </p>

        {/* 🟢 NUEVO: Selector de categorías */}
        <div className="flex justify-center mb-8">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 rounded-lg border border-violet-300 shadow-sm focus:ring-2 focus:ring-violet-400 text-slate-700 bg-white"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🟢 Lista de campañas (filtradas o no) */}
      {campanas.length === 0 ? (
        <div className="text-center text-slate-600 text-lg">
          No hay campañas disponibles en esta categoría.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {campanas.map((c) => (
            <CardCampana key={c.id_campana} campana={c} />
          ))}
        </div>
      )}
    </div>
  )
}
