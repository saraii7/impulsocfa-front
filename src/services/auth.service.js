const API_URL = 'http://localhost:3000/api/auth';

// Registrarse normal
export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  let data;
  try {
    data = await res.json();
  } catch (parseError) {
    console.error("No se pudo parsear la respuesta del servidor:", parseError);
    throw new Error('Error al parsear la respuesta del servidor');
  }

  // Si no hay session (usuario debe confirmar email)
  if (!data.access_token) {
    return { 
      message: 'Usuario registrado correctamente. Por favor confirma tu correo.' 
    };
  }

  // Guardar token solo si existe
  localStorage.setItem('access_token', data.access_token);

  return { 
    message: 'Usuario registrado y logueado correctamente', 
    access_token: data.access_token 
  };
}

// Registrarse con Google
export async function registerGoogle(access_token) {
  const res = await fetch(`${API_URL}/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Error al registrar usuario con Google');
  }

  // Guardar token
  localStorage.setItem('access_token', data.access_token);

  return data;
}

// Iniciar sesión
export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Error al iniciar sesión');
  }

  localStorage.setItem('access_token', data.access_token);
  return data;
}

// Obtener llave maestra
export async function getLlaveMaestra() {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${API_URL}/usuario/llave`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Error al obtener la llave maestra');
  }

  return data;
}

// Cerrar sesión
export async function logout() {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Error al cerrar sesión');
  }

  localStorage.removeItem('access_token');
  return data;
}

// Cambiar contraseña
export async function changePassword(llave_maestra, newPassword) {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${API_URL}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ llave_maestra, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Error al cambiar la contraseña');
  }

  return data;
}
