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
      setCategories(data);
    } catch (error) {
      console.error("❌ Error al cargar categorías:", error);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await createCategory({ nombre: newCategory });
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

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-violet-200">
      <h2 className="text-xl font-semibold text-violet-700 mb-4">
        Categorías
      </h2>

      <form onSubmit={handleCreate} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nueva categoría"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border p-2 rounded-lg flex-1"
        />
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg"
        >
          Agregar
        </button>
      </form>

      {categories.length === 0 ? (
        <p className="text-gray-500">No hay categorías aún.</p>
      ) : (
        <ul className="divide-y divide-violet-100">
          {categories.map((cat) => (
            <li key={cat.id_categoria} className="flex justify-between py-2">
              <span>{cat.nombre}</span>
              <button
                onClick={() => handleDelete(cat.id_categoria)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
