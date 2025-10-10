import { useState } from "react";
import AdminList from "../../components/admin/AdminList";
import UserList from "../../components/admin/UserList";
import CategoryList from "../../components/admin/CategoryList";
import CreateAdminForm from "../../components/admin/CreateAdminForm.jsx";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("admins");

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white p-8">
      <h1 className="text-3xl font-bold text-violet-700 mb-8 text-center">
        Panel de Administración
      </h1>

      {/* Navegación entre secciones */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === "admins"
              ? "bg-violet-600 text-white shadow"
              : "bg-white text-violet-700 border hover:bg-violet-100"
          }`}
          onClick={() => setActiveTab("admins")}
        >
          Administradores
        </button>

        <button
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === "users"
              ? "bg-violet-600 text-white shadow"
              : "bg-white text-violet-700 border hover:bg-violet-100"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Usuarios
        </button>

        <button
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            activeTab === "categories"
              ? "bg-violet-600 text-white shadow"
              : "bg-white text-violet-700 border hover:bg-violet-100"
          }`}
          onClick={() => setActiveTab("categories")}
        >
          Categorías
        </button>
      </div>

      {/* Render dinámico */}
      {activeTab === "admins" && (
        <div className="space-y-8">
          <CreateAdminForm />
          <AdminList />
        </div>
      )}
      {activeTab === "users" && <UserList />}
      {activeTab === "categories" && <CategoryList />}
    </div>
  );
}
