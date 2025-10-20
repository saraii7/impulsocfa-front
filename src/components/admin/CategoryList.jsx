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
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-violet-200">
      <h2 className="text-xl font-semibold text-violet-700 mb-4">
        Categorías
      </h2>

      {/* Formulario para crear categoría */}
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
            <li key={cat.id_categoria} className="flex justify-between items-center py-2">
              {cat.isEditing ? (
                // Modo edición
                <>
                  <input
                    type="text"
                    value={cat.editName}
                    onChange={(e) => {
                      const updatedCategories = categories.map((c) =>
                        c.id_categoria === cat.id_categoria
                          ? { ...c, editName: e.target.value }
                          : c
                      );
                      setCategories(updatedCategories);
                    }}
                    className="border p-1 rounded-lg flex-1 mr-2"
                  />
                  <button
                    onClick={() => handleSaveEdit(cat)}
                    className="text-green-500 hover:underline mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      // Cancelar edición
                      const updatedCategories = categories.map((c) =>
                        c.id_categoria === cat.id_categoria
                          ? { ...c, isEditing: false, editName: c.nombre }
                          : c
                      );
                      setCategories(updatedCategories);
                    }}
                    className="text-gray-500 hover:underline"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                // Vista normal
                <>
                  <span>{cat.nombre}</span>
                  <div className="flex gap-2">
                    {/* BOTÓN DE EDITAR */}
                    <button
                      onClick={() => {
                        const updatedCategories = categories.map((c) =>
                          c.id_categoria === cat.id_categoria
                            ? { ...c, isEditing: true }
                            : c
                        );
                        setCategories(updatedCategories);
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      Editar
                    </button>

                    {/* BOTÓN DE ELIMINAR */}
                    <button
                      onClick={() => handleDelete(cat.id_categoria)}
                      className="text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
