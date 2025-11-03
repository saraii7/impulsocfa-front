import { useState, useEffect, useRef } from "react"
import { ChevronDown, Search } from "lucide-react"
import CardCampana from "../../components/CardCampana"
import { getCampaignsByCategory } from "../../services/campaing.service"
import { getCategories } from "../../services/category.service"

export default function Campanas() {
  const [campanas, setCampanas] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Dropdown (CategorySelector) states
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Cerrar el menú si se hace clic afuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // useEffect principal: carga categorías y campañas al montar
  useEffect(() => {
    const fetchData = async () => {
      try {
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

  // Efecto: actualiza campañas si cambia categoría o búsqueda
  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        setLoading(true)
        const filtered = await getCampaignsByCategory(selectedCategory, searchQuery)
        setCampanas(filtered)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    // Solo busca si hay 0 o ≥3 caracteres
    if (searchQuery.length === 0 || searchQuery.length >= 3) {
      fetchFiltered()
    }
  }, [selectedCategory, searchQuery])

  // Manejador de cambio de categoría
  const handleCategoryChange = async (id_categoria) => {
    setSelectedCategory(id_categoria)
  }

  // Etiqueta mostrada en el botón del dropdown
  const selectedLabel =
    selectedCategory === ""
      ? "Todas las categorías"
      : categories.find((cat) => cat.id_categoria === selectedCategory)?.nombre || "Todas las categorías"

  // Función al seleccionar categoría
  const handleSelect = (value) => {
    handleCategoryChange(value)
    setIsOpen(false)
  }

  // Estados de carga y error
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

  // Render principal
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-blue-50 to-purple-50 py-16 px-6 text-slate-800">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Campañas Activas
        </h1>
        <p className="text-slate-700 max-w-2xl mx-auto mb-8">
          Explorá las campañas solidarias en curso y descubrí cómo podés aportar para generar un impacto real.
        </p>

        {/* 🆕 Contenedor con input de búsqueda + botón dropdown al lado */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mx-auto mb-8">

          {/* 🔍 Input para buscar campañas por título */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar campañas (mínimo 3 caracteres)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-violet-200 focus:ring-2 focus:ring-violet-400 outline-none shadow-sm bg-white"
            />
          </div>

          {/* ⬇️ Tu botón actual de categoría (sin cambios visuales) */}
          <div ref={dropdownRef} className="relative w-full sm:w-auto max-w-xs">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full sm:w-56 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-out flex items-center justify-between group hover:from-violet-600 hover:to-blue-600"
            >
              <span className="truncate">{selectedLabel}</span>
              <ChevronDown
                size={20}
                className={`ml-2 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-violet-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Opción "Todas las categorías" */}
                <button
                  onClick={() => handleSelect("")}
                  className={`w-full px-6 py-3 text-left transition-all duration-200 flex items-center gap-3 ${selectedCategory === ""
                    ? "bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 font-semibold"
                    : "text-slate-700 hover:bg-violet-50"
                    }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-all ${selectedCategory === "" ? "bg-violet-600 scale-100" : "bg-transparent scale-0"
                      }`}
                  />
                  Todas las categorías
                </button>

                {/* Divisor */}
                {categories.length > 0 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />
                )}

                {/* Opciones de categorías */}
                {categories.map((cat) => (
                  <button
                    key={cat.id_categoria}
                    onClick={() => handleSelect(cat.id_categoria)}
                    className={`w-full px-6 py-3 text-left transition-all duration-200 flex items-center gap-3 ${selectedCategory === cat.id_categoria
                      ? "bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 font-semibold"
                      : "text-slate-700 hover:bg-violet-50"
                      }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${selectedCategory === cat.id_categoria
                        ? "bg-violet-600 scale-100"
                        : "bg-transparent scale-0"
                        }`}
                    />
                    {cat.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lista de campañas */}
      {campanas.length === 0 ? (
        <div className="text-center text-slate-600 text-lg">
          No hay campañas que coincidan con tu búsqueda o categoría seleccionada.
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
