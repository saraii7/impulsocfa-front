import{ BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/header";
import Donar from "./pages/Donar/Donar";
import Campanas from "./pages/Campanas/Campanas";
import Nosotros from "./pages/Nosotros/Nosotros";
import Footer from "./components/footer/Footer";
import IniciarSesion from "./pages/IniciarSesion/IniciarSesion";
import Registrarse from "./pages/Registrarse/Registrarse"; 
import EmailConfirmed from "./components/EmailConfirmed";

function App() {
  return (
    <Router>

      <div className="cover-container d-flex w-100 p-3 mx-auto flex-column">
      <Header />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/donar" element={<Donar />} />
        <Route path="/campanas" element={<Campanas />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/iniciarsesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/email-confirmed" element={<EmailConfirmed />} />
      </Routes>
       <div className="cover-container d-flex w-100 p-3 mx-auto flex-column">
      <Footer />
      </div>
    </Router>
  );
}
export default App;