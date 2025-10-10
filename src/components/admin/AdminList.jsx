import { useEffect, useState } from "react";
import { getAdmins, disableAdmin } from "../../services/admin.service";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    try {
      const data = await getAdmins();
      setAdmins(data);
    } catch (error) {
      console.error("❌ Error al cargar administradores:", error);
    }
  }

  async function handleDisable(id) {
    if (!confirm("¿Seguro que querés deshabilitar este administrador?")) return;
    try {
      await disableAdmin(id);
      loadAdmins();
    } catch (error) {
      console.error("❌ Error al deshabilitar administrador:", error);
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-violet-200">
      <h2 className="text-xl font-semibold text-violet-700 mb-4">
        Lista de Administradores
      </h2>
      {admins.length === 0 ? (
        <p className="text-gray-500">No hay administradores registrados.</p>
      ) : (
        <ul className="divide-y divide-violet-100">
          {admins.map((admin) => (
            <li
              key={admin.id_usuario}
              className="flex justify-between items-center py-3"
            >
              <div>
                <p className="font-medium text-slate-700">
                  {admin.nombre} {admin.apellido}
                </p>
                <p className="text-sm text-gray-500">{admin.email}</p>
              </div>
              <button
                onClick={() => handleDisable(admin.id_usuario)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition"
              >
                Deshabilitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
