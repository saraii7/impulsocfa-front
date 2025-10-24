import { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import { getCurrentUser } from "../../services/user.service";

export default function UsuarioPanel() {
  const [activeTab, setActiveTab] = useState("perfil"); // 'campanas' o 'perfil'
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Error al obtener usuario:", err.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("perfil")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "perfil" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Mi Perfil
        </button>
      </div>

      <div>
        {activeTab === "perfil" && user && <UserProfile user={user} />}
      </div>
    </div>
  );
}