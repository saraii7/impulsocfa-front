import{ BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/header";
import Donar from "./pages/Donar/Donar";
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


function App() {
  return (
    <Router>

      <div className="cover-container d-flex w-100 p-3 mx-auto flex-column">
      <Header />
      </div>
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
        <Route path="/campanas" element={<CampanasPage/>} /> 
        <Route path="/crearcampana" element={<CreateCampaignForm />} /> 
        
        <Route path="/campanas/:id" element={<DetalleCampana />} />

      </Routes>
       <div className="cover-container d-flex w-100 p-3 mx-auto flex-column">
      <Footer />
      </div>
    </Router>
  );
}
export default App;