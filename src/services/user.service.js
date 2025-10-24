const API_URL = "http://localhost:3000/api/user";
import { supabase } from "./../supabaseClient";

export async function getCurrentUser() {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No estás autenticado");

  const { data, error } = await supabase.auth.getUser(token);
  if (error) throw new Error(error.message);

  return data.user;
}

// Actualizar perfil del usuario
export async function updateUserProfile(profileData) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No estás autenticado");

  const formData = new FormData();

  for (const key in profileData) {
    // 🧠 solo incluir foto si es realmente un archivo nuevo
    if (key === "foto_perfil") {
      const foto = profileData[key];
      if (foto && typeof foto === "object" && foto.name) {
        formData.append(key, foto);
      }
      continue;
    }

    // incluir los demás campos si tienen valor
    if (profileData[key] !== null && profileData[key] !== undefined) {
      formData.append(key, profileData[key]);
    }
  }

  const res = await fetch(API_URL, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al actualizar perfil");

  return data; // el backend devuelve el usuario actualizado
}
