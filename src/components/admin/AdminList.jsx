import { useEffect, useState } from "react";
import { getAdmins, disableAdmin, updateAdmin } from "../../services/admin.service";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [editId, setEditId] = useState(null); // admin que estamos editando
  const [editData, setEditData] = useState({ nombre: "", apellido: "", email: "" });

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

  // Abrir el formulario de edición
  function handleEditClick(admin) {
    setEditId(admin.id_usuario);
    setEditData({ nombre: admin.nombre, apellido: admin.apellido, email: admin.email });
  }

  // Guardar cambios
  async function handleSave(id) {
    try {
      await updateAdmin(id, editData);
      setEditId(null); // cerrar edición
      loadAdmins(); // recargar admins
    } catch (error) {
      console.error("❌ Error al actualizar admin:", error);
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
            <li key={admin.id_usuario} className="flex justify-between items-center py-3">
              <div>
                {editId === admin.id_usuario ? (
                  // Formulario inline de edición
                  <div className="flex gap-2">
                    <input
                      className="border px-2 py-1 rounded"
                      value={editData.nombre}
                      onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                      placeholder="Nombre"
                    />
                    <input
                      className="border px-2 py-1 rounded"
                      value={editData.apellido}
                      onChange={(e) => setEditData({ ...editData, apellido: e.target.value })}
                      placeholder="Apellido"
                    />
                    <input
                      className="border px-2 py-1 rounded"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      placeholder="Email"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-medium text-slate-700">
                      {admin.nombre} {admin.apellido}
                    </p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                {editId === admin.id_usuario ? (
                  <>
                    <button
                      onClick={() => handleSave(admin.id_usuario)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-lg text-sm"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    {/* Botón de editar */}
                    <button
                      onClick={() => handleEditClick(admin)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Editar
                    </button>

                    {/* Botón de deshabilitar */}
                    <button
                      onClick={() => handleDisable(admin.id_usuario)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Deshabilitar
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
