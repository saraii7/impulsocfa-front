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
    <div>
      <div>
        {activeTab === "perfil" && user && <UserProfile user={user} />}
           {activeTab === "Mis Campañas" && user && <UserProfile user={user} />}
        
      </div>
    </div>
  );
}