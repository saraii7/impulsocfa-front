const API_URL = 'http://localhost:3000/api/categories';


// Obtener todas las categorías
export async function getCategories() {
  const res = await fetch(API_URL);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Error al obtener las categorías");
  return data;
}

// Crear categoría (solo admin)
export async function createCategory(nombre) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No estás autenticado");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nombre }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al crear la categoría");

  return data;
}

// Editar categoría (solo admin)
export async function updateCategory(id, nombre) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No estás autenticado");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nombre }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al editar la categoría");

  return data;
}

// Eliminar categoría (solo admin)
export async function deleteCategory(id) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No estás autenticado");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al eliminar la categoría");

  return data;
}
