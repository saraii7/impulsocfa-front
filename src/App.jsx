import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import Header from "./components/header/header";
import Nosotros from "./pages/Nosotros/Nosotros";
import Footer from "./components/footer/Footer";
import IniciarSesion from "./pages/IniciarSesion/IniciarSesion";
import Registrarse from "./pages/Registrarse/Registrarse";
import EmailConfirmed from "./components/EmailConfirmed";
import RecuperarContrasenia from "./pages/RecuperarContrasenia/RecuperarContrasenia";
import GoogleCallback from "./components/GoogleCallback";
import MostrarLlaveMaestra from "./components/LlaveMaestra/MostrarLLaveMaestra";
import CreateCampaignForm from "./components/campañas/CreateCampaignForm/CreateCampaignForm";
import CampanasPage from "./components/campañas/CampanasPage/CampanasPage";
import DetalleCampana from "./pages/Campanas/DetalleCampana";
import Campanas from "./pages/Campanas/Campanas";
import EditarCampana from "./components/campañas/CreateCampaignForm/EditarCampana";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import UsuarioPanel from "./pages/UsuarioPanel/UsuarioPanel";
import PagoExitoso from "./components/pasarela/PagoExitoso";
import PagoFallido from "./components/pasarela/PagoFallido";
import PagoPendiente from "./components/pasarela/PagoPendiente";
import TodasDonaciones from "./pages/UsuarioPanel/TodasDonaciones";
import VerMasCampana from "./components/campañas/CampanasPage/VerMasCampana";
import Historias from "./pages/Historias/Historias";
import LeerHist from "./pages/Historias/LeerHist";
import VerMasHist from "./pages/Historias/VerMasHist";
import FormHist from "./pages/Historias/FormHist";
import TusHist from "./components/historias/TusHist";
import EditHist from "./components/historias/EditHist";
import ReportCampana from "./components/ReportCampana";
function App() {
  return (
    <BrowserRouter>
      {/* 🔔 Toaster global (estilo glassmorphism) */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "rgba(60, 60, 70, 0.85)", // fondo translúcido
            color: "#fff",
            backdropFilter: "blur(10px)", // efecto vidrio
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            fontSize: "14px",
            padding: "12px 16px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          },
          success: {
            iconTheme: {
              primary: "#22c55e", // verde éxito
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // rojo error
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/donar" element={<Campanas />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/iniciarsesion" element={<IniciarSesion />} />
            <Route path="/registrarse" element={<Registrarse />} />
            <Route path="/recuperar-contrasenia" element={<RecuperarContrasenia />} />
            <Route path="/email-confirmed" element={<EmailConfirmed />} />
            <Route path="/google-callback" element={<GoogleCallback />} />
            <Route path="/mostrarllavemaestra" element={<MostrarLlaveMaestra />} />
            <Route path="/campanas" element={<CampanasPage />} />
            <Route path="/crearcampana" element={<CreateCampaignForm />} />
            <Route path="/campanas/:id" element={<DetalleCampana />} />
            <Route path="/editarcampana/:id" element={<EditarCampana />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/usuariopanel" element={<UsuarioPanel />} />
            <Route path="/pago-exitoso" element={<PagoExitoso />} />
            <Route path="/pago-fallido" element={<PagoFallido />} />
            <Route path="/pago-pendiente" element={<PagoPendiente />} />
            <Route path="/todasdonaciones" element={<TodasDonaciones />} />
            <Route path="/vermascampana/:id" element={<VerMasCampana />} />
            <Route path="/historias/" element={<Historias />} />
            <Route path="/leerhist" element={<LeerHist />} />
            <Route path="/vermashist/:id" element={<VerMasHist />} />
            <Route path="/formhist" element={<FormHist />} />
            <Route path="/tushist" element={<TusHist />} />
            <Route path="/edithist/:id" element={<EditHist />} />
            <Route path="/reportcampana/:id" element={<ReportCampana />} />
            <Route path= "/detallecampana/:id" element= {<DetalleCampana/>}/>
          </Routes>

        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
