import { useEffect, useState } from "react";
import { commentService } from "../../services/comment.service";
import { toast } from "react-hot-toast";
import { MessageCircle, Send, Trash2, Edit3 } from "lucide-react";

export default function Comments({ id_campana }) {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  async function fetchComentarios() {
    try {
      const data = await commentService.getCommentsByCampaign(id_campana);
      setComentarios(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchComentarios();
  }, [id_campana]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    try {
      setLoading(true);
      await commentService.createComment({
        id_campana,
        contenido: nuevoComentario,
      });
      await fetchComentarios();
      setNuevoComentario("");
      toast.success("Comentario publicado");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // editar comentario
  const handleEdit = (c) => {
    setEditingId(c.id_comentario);
    setEditText(c.contenido);
  };

  // Guardar edición
  const saveEdit = async (id_comentario) => {
    try {
      await commentService.updateComment({
        id_comentario,
        contenido: editText,
      });
      toast.success("Comentario actualizado");
      setEditingId(null);
      setEditText("");
      fetchComentarios();
    } catch (error) {
      toast.error(error.message);
    }
  };

async function handleDelete(id_comentario) {
  toast((t) => (
    <div className="flex flex-col gap-2">
      <span>¿Seguro que querés eliminar este comentario?</span>
      <div className="flex justify-end gap-2 mt-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancelar
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={async () => {
            toast.dismiss(t.id);
            try {
              await commentService.deleteComment(id_comentario);
              toast.success("Comentario eliminado");
              fetchComentarios();
            } catch (error) {
              toast.error(error.message);
            }
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  ), { duration: Infinity });
}


  return (
    <div className="mt-12 pt-8 border-t border-violet-200">
      {/* Título de sección */}
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-7 h-7 text-violet-600" />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
          Comentarios
        </h3>
      </div>

      {/* Formulario de nuevo comentario */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-gradient-to-br from-violet-50 to-blue-50 rounded-xl p-6 border border-violet-200"
      >
        <textarea
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          placeholder="Comparte tu opinión sobre esta campaña..."
          className="w-full h-24 bg-white/70 border border-violet-300 rounded-lg p-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent resize-none transition-all"
        />
        <div className="flex justify-end mt-4">
          <button
            disabled={loading || !nuevoComentario.trim()}
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 hover:from-blue-500 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <Send className="w-4 h-4" />
            {loading ? "Publicando..." : "Comentar"}
          </button>
        </div>
      </form>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comentarios.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-violet-50 to-blue-50 rounded-xl border border-violet-200">
            <MessageCircle className="w-12 h-12 text-violet-300 mx-auto mb-3" />
            <p className="text-slate-500 text-lg font-medium">No hay comentarios aún</p>
            <p className="text-slate-400 text-sm">Sé el primero en compartir tu opinión</p>
          </div>
        ) : (
          comentarios.map((c) => (
            <div
              key={c.id_comentario}
              className="bg-white/60 backdrop-blur-sm border border-violet-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:border-violet-300"
            >
              {/* Header del comentario - usuario y fecha */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  {c.usuario?.foto_perfil && (
                    <img
                      src={c.usuario.foto_perfil || "/placeholder.svg"}
                      alt={`${c.usuario?.nombre} ${c.usuario?.apellido}`}
                      className="w-10 h-10 rounded-full object-cover border border-violet-200 flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800">
                      {c.usuario?.nombre} {c.usuario?.apellido}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(c.fecha).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Botones de editar y eliminar */}
                {user && c.id_usuario === user.id_usuario && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="Editar comentario"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id_comentario)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Eliminar comentario"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* modo edición inline */}
              {editingId === c.id_comentario ? (
                <div className="mt-3 bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-200 rounded-xl p-4 shadow-sm transition-all duration-300">
                  <textarea
                    className="w-full bg-white/70 border border-violet-300 rounded-lg p-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent resize-none transition-all"
                    rows={3}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="flex justify-end gap-3 mt-3">
                    <button
                      onClick={() => saveEdit(c.id_comentario)}
                      className="flex items-center gap-1 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:shadow-md hover:scale-105"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-slate-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-sm"
                    >
                      ✖ Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-slate-700 leading-relaxed">{c.contenido}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
