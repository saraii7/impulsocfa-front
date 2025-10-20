import { useEffect, useState } from "react";
import { getUsers, changeUserState } from "../../services/admin.service";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("❌ Error al cargar usuarios:", error);
    }
  }

  async function handleStateChange(id, newState) {
    try {
      await changeUserState(id, newState);
      loadUsers();
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-violet-200">
      <h2 className="text-xl font-semibold text-violet-700 mb-4">
        Lista de Usuarios
      </h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No hay usuarios registrados.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-violet-100 text-violet-700">
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_usuario} className="border-t">
                <td className="p-2">{user.nombre} {user.apellido}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2 capitalize">{user.estado_cuenta}</td>
                <td className="p-2 space-x-2 text-center">
                  <button
                    onClick={() => handleStateChange(user.id_usuario, "habilitada")}
                    className="text-green-600 hover:underline"
                  >
                    Habilitar
                  </button>
                  <button
                    onClick={() => handleStateChange(user.id_usuario, "deshabilitada")}
                    className="text-red-500 hover:underline"
                  >
                    Deshabilitar
                  </button>
                  <button
                    onClick={() => handleStateChange(user.id_usuario, "suspendida")}
                    className="text-yellow-600 hover:underline"
                  >
                    Suspender
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
