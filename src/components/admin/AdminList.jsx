import { useEffect, useState } from "react";
import { getAdmins, disableAdmin, updateAdmin } from "../../services/admin.service";
import { toast, Toaster } from "react-hot-toast";

export default function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ nombre: "", apellido: "", email: "" });

  useEffect(() => {
    loadAdmins();
  }, []);

  async function loadAdmins() {
    try {
      const data = await getAdmins();
      setAdmins(data);
    } catch (error) {
      toast.error("❌ Error al cargar administradores");
      console.error("Error al cargar administradores:", error);
    }
  }
  function toastConfirm(message, onConfirm) {
  toast((t) => (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">{message}</p>

      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 text-sm"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancelar
        </button>

        <button
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm(); // ejecuta acción
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  ));
}


async function handleDisable(id) {
  toastConfirm("¿Seguro que querés deshabilitar este administrador?", async () => {
    try {
      await disableAdmin(id);
      toast.success("Administrador deshabilitado correctamente ✅");
      loadAdmins();
    } catch (error) {
      toast.error("❌ Error al deshabilitar administrador");
      console.error("❌ Error al deshabilitar administrador:", error);
    }
  });
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
      toast.success("Administrador actualizado correctamente ✅");
      setEditId(null); // cerrar edición
      loadAdmins(); // recargar admins
    } catch (error) {
      toast.error("❌ Error al actualizar administrador");
      console.error("❌ Error al actualizar admin:", error);
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 border-violet-100">
      <h2 className="text-2xl font-bold text-violet-700 mb-6 flex items-center gap-2">
        <span>👤</span> Lista de Administradores
      </h2>
      {admins.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No hay administradores registrados.</p>
      ) : (
        <div className="space-y-3">
          {admins.map((admin) => (
            <div
              key={admin.id_usuario}
              className="bg-gradient-to-r from-violet-50 to-blue-50 p-4 rounded-xl border-2 border-violet-100 hover:border-violet-300 transition-all"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex-1">
                  {editId === admin.id_usuario ? (
                    <div className="flex flex-col gap-2">
                      <input
                        className="border-2 border-violet-200 px-3 py-2 rounded-lg focus:outline-none focus:border-violet-400"
                        value={editData.nombre}
                        onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                        placeholder="Nombre"
                      />
                      <input
                        className="border-2 border-violet-200 px-3 py-2 rounded-lg focus:outline-none focus:border-violet-400"
                        value={editData.apellido}
                        onChange={(e) => setEditData({ ...editData, apellido: e.target.value })}
                        placeholder="Apellido"
                      />

                    </div>
                  ) : (
                    <>
                      <p className="font-semibold text-gray-800 text-lg">
                        {admin.nombre} {admin.apellido}
                      </p>
                      <p className="text-sm text-gray-600">{admin.email}</p>
                    </>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {editId === admin.id_usuario ? (
                    <>
                      <button
                        onClick={() => handleSave(admin.id_usuario)}
                        className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      >
                        ✓ Guardar
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      >
                        ✕ Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(admin)}
                        className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDisable(admin.id_usuario)}
                        className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                      >
                        🚫 Deshabilitar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
