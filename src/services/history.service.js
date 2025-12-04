const API_URL = `${import.meta.env.VITE_API_URL}/history`;

function getToken() {
  return localStorage.getItem("access_token");
}

// 1. Obtener TODAS las historias (no requiere token)
export async function getAllHistories() {
  const res = await fetch(`${API_URL}/`);

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo historias");

  return data;
}
// 2. Obtener una historia específica + datos de campaña (sin token)
export async function getHistoryById(id_historia) {
  const res = await fetch(`${API_URL}/${id_historia}`);

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo la historia");

  return data;
}
// 3. Crear historia (requiere token + archivos)
export async function createHistory(historyData) {
  const token = getToken();
  if (!token) throw new Error("No autenticado");

  const formData = new FormData();

  // Cargar campos normales
  for (const key in historyData) {
    if (
      historyData[key] !== undefined &&
      historyData[key] !== null &&
      key !== "archivo1" &&
      key !== "archivo2" &&
      key !== "archivo3"
    ) {
      formData.append(key, historyData[key]);
    }
  }

  // Cargar archivos (si existen)
  ["archivo1", "archivo2", "archivo3"].forEach((fileKey) => {
    if (historyData[fileKey]) {
      formData.append(fileKey, historyData[fileKey]);
    }
  });

  const res = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al crear historia");

  return data;
}

//  4. Actualizar historia (requiere token + archivos opcionales)
export async function updateHistory(id_historia, updateData) {
  const token = getToken();
  if (!token) throw new Error("No autenticado");

  const formData = new FormData();

  // Campos normales
  for (const key in updateData) {
    if (
      updateData[key] !== undefined &&
      updateData[key] !== null &&
      key !== "archivo1" &&
      key !== "archivo2" &&
      key !== "archivo3"
    ) {
      formData.append(key, updateData[key]);
    }
  }

  // Archivos nuevos opcionales
  ["archivo1", "archivo2", "archivo3"].forEach((fileKey) => {
    if (updateData[fileKey]) {
      formData.append(fileKey, updateData[fileKey]);
    }
  });

  const res = await fetch(`${API_URL}/${id_historia}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al actualizar historia");

  return data;
}

// 5. Eliminar historia (requiere token)
export async function deleteHistory(id_historia) {
  const token = getToken();
  if (!token) throw new Error("No autenticado");

  const res = await fetch(`${API_URL}/${id_historia}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al eliminar la historia");

  return data;
}
// 6. Obtener todas las historias de una campaña (no requiere token)
export async function getHistoriesByCampaign(id_campana) {
  try {
    const res = await fetch(`${API_URL}/campaign/${id_campana}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error obteniendo historias de la campaña");
    return data; // [] | [historia50] | [historia50, historia100]
  } catch (err) {
    console.error(err);
    return [];
  }
}
