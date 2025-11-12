import { useEffect, useState } from "react";
import { getUsers, changeUserState } from "../../services/admin.service";
import { toast } from "react-hot-toast";

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
      toast.error("❌ Error al cargar la lista de usuarios");
    }
  }

  async function handleStateChange(id, newState) {
    try {
      await changeUserState(id, newState);
      loadUsers();
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
      toast.error("❌ No se pudo cambiar el estado del usuario");
    
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-blue-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
        <span>👥</span> Lista de Usuarios
      </h2>
      {users.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No hay usuarios registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-cyan-100 border-b-2 border-blue-200">
                <th className="p-4 text-left font-semibold text-blue-700">Nombre</th>
                <th className="p-4 text-left font-semibold text-blue-700">Email</th>
                <th className="p-4 text-left font-semibold text-blue-700">Estado</th>
                <th className="p-4 text-center font-semibold text-blue-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id_usuario} className="border-b border-blue-100 hover:bg-blue-50 transition">
                  <td className="p-4 font-medium text-gray-800">
                    {user.nombre} {user.apellido}
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.estado_cuenta === "habilitada"
                          ? "bg-green-100 text-green-700"
                          : user.estado_cuenta === "deshabilitada"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.estado_cuenta}
                    </span>
                  </td>
                  <td className="p-4 space-x-2 text-center">
                    <button
                      onClick={() => handleStateChange(user.id_usuario, "habilitada")}
                      className="text-green-600 hover:text-green-700 font-semibold hover:underline transition"
                    >
                      ✓ Habilitar
                    </button>
                    <button
                      onClick={() => handleStateChange(user.id_usuario, "deshabilitada")}
                      className="text-red-600 hover:text-red-700 font-semibold hover:underline transition"
                    >
                      ✕ Deshabilitar
                    </button>
                    <button
                      onClick={() => handleStateChange(user.id_usuario, "suspendida")}
                      className="text-yellow-600 hover:text-yellow-700 font-semibold hover:underline transition"
                    >
                      ⏸ Suspender
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
