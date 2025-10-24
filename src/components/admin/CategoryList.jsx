import { useEffect, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../services/category.service";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      // Inicializamos las propiedades para editar
      const categoriesWithEdit = data.map((cat) => ({
        ...cat,
        isEditing: false, // controla si está en modo edición
        editName: cat.nombre, // almacena temporalmente el nuevo nombre
      }));
      setCategories(categoriesWithEdit);
    } catch (error) {
      console.error("❌ Error al cargar categorías:", error);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await createCategory(newCategory); // enviamos solo el nombre
      setNewCategory("");
      loadCategories();
    } catch (error) {
      console.error("❌ Error al crear categoría:", error);
    }
  }

  async function handleDelete(id) {
    if (!confirm("¿Eliminar esta categoría?")) return;
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error("❌ Error al eliminar categoría:", error);
    }
  }

  async function handleSaveEdit(cat) {
    try {
      await updateCategory(cat.id_categoria, cat.editName);
      loadCategories();
    } catch (error) {
      console.error("❌ Error al editar categoría:", error);
    }
  }

  return (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-pink-100">
      <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
        <span>📂</span> Categorías
      </h2>

      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 border-2 border-pink-200 p-3 rounded-lg focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
        >
          ➕ Agregar
        </button>
      </form>

      {categories.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No hay categorías aún.</p>
      ) : (
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.id_categoria}
              className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border-2 border-pink-100 hover:border-pink-300 transition-all flex justify-between items-center"
            >
              {cat.isEditing ? (
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={cat.editName}
                    onChange={(e) => {
                      const updatedCategories = categories.map((c) =>
                        c.id_categoria === cat.id_categoria ? { ...c, editName: e.target.value } : c,
                      )
                      setCategories(updatedCategories)
                    }}
                    className="flex-1 border-2 border-pink-200 p-2 rounded-lg focus:outline-none focus:border-pink-400"
                  />
                  <button
                    onClick={() => handleSaveEdit(cat)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    ✓ Guardar
                  </button>
                  <button
                    onClick={() => {
                      const updatedCategories = categories.map((c) =>
                        c.id_categoria === cat.id_categoria ? { ...c, isEditing: false, editName: c.nombre } : c,
                      )
                      setCategories(updatedCategories)
                    }}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    ✕ Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-semibold text-gray-800">{cat.nombre}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const updatedCategories = categories.map((c) =>
                          c.id_categoria === cat.id_categoria ? { ...c, isEditing: true } : c,
                        )
                        setCategories(updatedCategories)
                      }}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id_categoria)}
                      className="text-red-600 hover:text-red-700 font-semibold hover:underline transition"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
