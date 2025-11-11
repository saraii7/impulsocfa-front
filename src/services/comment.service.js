const API_URL = `${import.meta.env.VITE_API_URL}/comments`;


// Función para obtener token del localStorage
function getToken() {
    const token = localStorage.getItem("access_token");
    console.log("TOKEN FRONT:", token);
    return token;
}

export const commentService = {
    // Crear un comentario
    async createComment({ id_campana, contenido }) {
        const token = getToken(); // cambia esto
        const res = await fetch(`${API_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id_campana, contenido }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Error al crear comentario");
        }

        return res.json();
    },

    // Obtener comentarios por campaña
    async getCommentsByCampaign(id_campana) {
        const res = await fetch(`${API_URL}/campana/${id_campana}`);
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Error al obtener comentarios");
        }
        return res.json();
    },

    // Actualizar un comentario
    async updateComment({ id_comentario, contenido }) {
        const token = getToken(); 
        const res = await fetch(`${API_URL}/${id_comentario}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ contenido }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Error al actualizar comentario");
        }

        return res.json();
    },

    // Eliminar un comentario
    async deleteComment(id_comentario) {
        const token = getToken(); // 
        const res = await fetch(`${API_URL}/${id_comentario}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Error al eliminar comentario");
        }

        return res.json();
    },
};