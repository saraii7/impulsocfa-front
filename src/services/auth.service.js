const API_URL = 'http://localhost:3000/api/auth';

// Registrarse normal
export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error al registrar usuario");

  return data;
}

// Registrarse con Google
export async function googleCallback(access_token, refresh_token) {
  const res = await fetch(`${API_URL}/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_token, refresh_token }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en login con Google");

  // Guardar tokens y usuario en localStorage
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);

  // Guardar rol y user completo para Header
  localStorage.setItem("user_role", data.profile.rol);
  localStorage.setItem("user", JSON.stringify(data.profile));
  window.dispatchEvent(new Event("storage"));

  return data;
}

// Iniciar sesión con email y contraseña
export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok || !data.access_token) {
    throw new Error(data.error || "Error al iniciar sesión");
  }

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("user_role", data.user.rol);
  window.dispatchEvent(new Event("storage"));

  return data;
}

// Cerrar sesión
export async function logout() {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al cerrar sesión");
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("user_role");
  return data;
}

// Obtener llave maestra
export async function getLlaveMaestra() {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_URL}/usuario/llave`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al obtener la llave maestra");
  }

  return data;
}

// Cambiar contraseña
export async function changePassword(llave_maestra, newPassword) {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`${API_URL}/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ llave_maestra, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al cambiar la contraseña");
  }

  return data;
}
