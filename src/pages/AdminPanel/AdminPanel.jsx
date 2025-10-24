import { useState } from "react";
import AdminList from "../../components/admin/AdminList";
import UserList from "../../components/admin/UserList";
import CategoryList from "../../components/admin/CategoryList";
import CreateAdminForm from "../../components/admin/CreateAdminForm.jsx";
import CampañasList from "../../components/admin/CampañasList.jsx";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("admins");
  const tabs = [
    { id: "admins", label: "Administradores", icon: "👤" },
    { id: "users", label: "Usuarios", icon: "👥" },
    { id: "categories", label: "Categorías", icon: "📂" },
    { id: "campaigns", label: "Campañas", icon: "📢" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-pink-50 p-6 md:p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Panel de Administración
        </h1>
        <p className="text-gray-600">Gestiona administradores, usuarios, categorías y campañas</p>
      </div>

      {/* Navegación entre secciones */}
       <div className="flex flex-wrap gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-violet-400 to-pink-400 text-white shadow-lg shadow-violet-200 scale-105"
                : "bg-white text-gray-700 border-2 border-violet-200 hover:border-violet-400 hover:shadow-md"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido dinámico */}
      <div className="space-y-6">
        {activeTab === "admins" && (
          <div className="space-y-6 animate-fadeIn">
            <CreateAdminForm />
            <AdminList />
          </div>
        )}
        {activeTab === "users" && <UserList />}
        {activeTab === "categories" && <CategoryList />}
        {activeTab === "campaigns" && <CampañasList />}
      </div>
    </div>
  );
}
