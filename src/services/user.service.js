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

  Object.keys(profileData).forEach((key) => {
    if (profileData[key] !== null && profileData[key] !== undefined) {
      formData.append(key, profileData[key]);
    }
  });

  const res = await fetch(API_URL, { // ✅ solo /api/user
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al actualizar perfil");

  return data; // data debería incluir la URL completa de foto_perfil
}
