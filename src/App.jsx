import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
export default App;