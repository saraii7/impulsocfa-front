import Pattern from "../../components/Pattern";

export default function Nosotros() {

  return (
    <div className="position-relative min-vh-100">
      {/* Fondo Uiverse */}
      <Pattern />
      
      <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3" style={{ color: '#8B5CF6' }}>
                Sobre Nosotros
              </h1>
              <p className="lead text-muted">
                Conectando ideas brillantes con personas que creen en ellas, sin fronteras ni limitaciones
              </p>
            </div>

            {/* Nuestra Historia */}
            <div className="card shadow-lg border-0 mb-5">
              <div className="card-body p-5">
                <h2 className="h3 mb-4" style={{ color: '#8B5CF6' }}>
                  <i className="bi bi-heart-fill me-2"></i>
                  Nuestra Historia
                </h2>
                <p className="mb-4">
                  <strong>Impulso CFA</strong> nació en 2024 tras los hechos en Bahia Blanca donde con una misión revolucionaria: democratizar 
                  el acceso al financiamiento de proyectos en todo el mundo. Lo que comenzó como una 
                  idea para eliminar las barreras geográficas y monetarias del crowdfunding, se ha 
                  convertido en la plataforma global líder que conecta creadores con patrocinadores 
                  de cualquier país y en cualquier moneda.
                </p>
                <p className="mb-0">
                  Desde nuestro lanzamiento, hemos financiado miles de proyectos únicos: desde 
                  innovaciones tecnológicas hasta iniciativas artísticas, emprendimientos sociales 
                  y sueños personales que merecían una oportunidad de hacerse realidad.
                </p>
              </div>
            </div>

            {/* Misión y Visión */}
            <div className="row mb-5">
              <div className="col-md-6 mb-4">
                <div className="card h-100 shadow border-0 border-start border-4" 
                     style={{ borderColor: '#8B5CF6 !important' }}>
                  <div className="card-body p-4">
                    <h3 className="h4 mb-3" style={{ color: '#8B5CF6' }}>
                      <i className="bi bi-compass me-2"></i>
                      Nuestra Misión
                    </h3>
                    <p className="mb-0">
                      Facilitar el financiamiento colaborativo de proyectos innovadores a nivel 
                      global, eliminando barreras geográficas y monetarias. Conectamos creadores 
                      visionarios con una comunidad internacional de patrocinadores que comparten 
                      su pasión por la innovación y el progreso.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100 shadow border-0 border-start border-4" 
                     style={{ borderColor: '#06B6D4' }}>
                  <div className="card-body p-4">
                    <h3 className="h4 mb-3" style={{ color: '#06B6D4' }}>
                      <i className="bi bi-eye me-2"></i>
                      Nuestra Visión
                    </h3>
                    <p className="mb-0">
                      Ser la plataforma de crowdfunding más inclusiva y accesible del mundo, 
                      donde cualquier persona, desde cualquier país y con cualquier moneda, 
                      pueda financiar o apoyar proyectos que transformen ideas en realidades.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nuestros Valores */}
            <div className="card shadow-lg border-0 mb-5">
              <div className="card-body p-5">
                <h2 className="h3 mb-4" style={{ color: '#8B5CF6' }}>
                  <i className="bi bi-star-fill me-2"></i>
                  Nuestros Valores
                </h2>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="text-white rounded-circle p-2 me-3 flex-shrink-0" 
                           style={{ backgroundColor: '#8B5CF6' }}>
                        <i className="bi bi-shield-check"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">Transparencia</h5>
                        <p className="mb-0 text-muted">
                          Operamos con total claridad en el uso de recursos y resultados.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="text-white rounded-circle p-2 me-3 flex-shrink-0" 
                           style={{ backgroundColor: '#06B6D4' }}>
                        <i className="bi bi-people-fill"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">Solidaridad</h5>
                        <p className="mb-0 text-muted">
                          Creemos en el poder de la comunidad y el apoyo mutuo.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="text-white rounded-circle p-2 me-3 flex-shrink-0" 
                           style={{ backgroundColor: '#A855F7' }}>
                        <i className="bi bi-arrow-up-circle"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">Compromiso</h5>
                        <p className="mb-0 text-muted">
                          Nos dedicamos completamente a cumplir nuestra misión.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="text-white rounded-circle p-2 me-3 flex-shrink-0" 
                           style={{ backgroundColor: '#0891B2' }}>
                        <i className="bi bi-lightbulb-fill"></i>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">Innovación</h5>
                        <p className="mb-0 text-muted">
                          Buscamos constantemente nuevas formas de generar impacto.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas de Impacto */}
            <div className="card shadow-lg border-0 mb-5" 
                 style={{ 
                   background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #3B82F6 100%)',
                   position: 'relative',
                   overflow: 'hidden'
                 }}>
              {/* Overlay para mejor contraste */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.2)',
                zIndex: 1
              }}></div>
              
              <div className="card-body p-5 text-white position-relative" style={{ zIndex: 2 }}>
                <h2 className="h3 mb-4 text-center text-white">
                  <i className="bi bi-graph-up me-2"></i>
                  Nuestro Impacto
                </h2>
                <div className="row text-center">
                  <div className="col-md-3 mb-4">
                    <div className="pe-3">
                      <div className="bg-white bg-opacity-10 rounded-3 p-3 mb-2 backdrop-blur">
                        <h3 className="display-5 fw-bold mb-1 text-white">15,000+</h3>
                        <p className="mb-0 text-white-75 fw-medium">Proyectos Financiados</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="pe-3">
                      <div className="bg-white bg-opacity-10 rounded-3 p-3 mb-2 backdrop-blur">
                        <h3 className="display-5 fw-bold mb-1 text-white">180+</h3>
                        <p className="mb-0 text-white-75 fw-medium">Países Participantes</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="pe-3">
                      <div className="bg-white bg-opacity-10 rounded-3 p-3 mb-2 backdrop-blur">
                        <h3 className="display-5 fw-bold mb-1 text-white">50+</h3>
                        <p className="mb-0 text-white-75 fw-medium">Monedas Aceptadas</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div>
                      <div className="bg-white bg-opacity-10 rounded-3 p-3 mb-2 backdrop-blur">
                        <h3 className="display-5 fw-bold mb-1 text-white">$50M+</h3>
                        <p className="mb-0 text-white-75 fw-medium">Fondos Recaudados</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nuestros Programas */}
            <div className="card shadow-lg border-0 mb-5">
              <div className="card-body p-5">
                <h2 className="h3 mb-4" style={{ color: '#8B5CF6' }}>
                  <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                  Categorías Populares
                </h2>
                <div className="row">
                  <div className="col-lg-4 mb-4">
                    <div className="text-center p-3">
                      <div className="rounded-circle p-3 d-inline-flex mb-3" 
                           style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                        <i className="bi bi-cpu fs-2" style={{ color: '#8B5CF6' }}></i>
                      </div>
                      <h5 className="fw-bold">Tecnología e Innovación</h5>
                      <p className="text-muted">
                        Apps, gadgets, inteligencia artificial y soluciones tech disruptivas.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <div className="text-center p-3">
                      <div className="rounded-circle p-3 d-inline-flex mb-3" 
                           style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}>
                        <i className="bi bi-palette fs-2" style={{ color: '#06B6D4' }}></i>
                      </div>
                      <h5 className="fw-bold">Arte y Creatividad</h5>
                      <p className="text-muted">
                        Películas, música, libros, videojuegos y proyectos artísticos únicos.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <div className="text-center p-3">
                      <div className="rounded-circle p-3 d-inline-flex mb-3" 
                           style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
                        <i className="bi bi-rocket-takeoff fs-2" style={{ color: '#A855F7' }}></i>
                      </div>
                      <h5 className="fw-bold">Emprendimientos</h5>
                      <p className="text-muted">
                        Startups, productos innovadores y negocios con impacto social.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipo */}
            <div className="card shadow-lg border-0 mb-5">
              <div className="card-body p-5">
                <h2 className="h3 text-center mb-4" style={{ color: '#8B5CF6' }}>
                  <i className="bi bi-people-fill me-2"></i>
                  Nuestro Equipo
                </h2>
                <p className="text-center text-muted mb-5">
                  El equipo que hace posible la conexión global entre ideas y patrocinadores.
                </p>
                <div className="row justify-content-center">
                  <div className="col-lg-4 mb-4">
                    <div className="text-center">
                      <div className="rounded-circle p-4 d-inline-flex mb-3" 
                           style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                        <i className="bi bi-person-fill fs-1" style={{ color: '#8B5CF6' }}></i>
                      </div>
                      <h5 className="fw-bold">Franco Jarc</h5>
                      <p className="mb-2" style={{ color: '#8B5CF6' }}>CEO & Fundador</p>
                      <p className="text-muted small">
                        Visionario en fintech y crowdfunding con 15 años revolucionando el acceso global al financiamiento.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4">
                    <div className="text-center">
                      <div className="rounded-circle p-4 d-inline-flex mb-3" 
                           style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}>
                        <i className="bi bi-person-fill fs-1" style={{ color: '#06B6D4' }}></i>
                      </div>
                      <h5 className="fw-bold">Camila Ocaña</h5>
                      <p className="mb-2" style={{ color: '#06B6D4' }}>CTO & Co-fundadora</p>
                      <p className="text-muted small">
                        Experta en tecnología blockchain y sistemas de pagos internacionales multi-moneda.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="card shadow-lg border-0 position-relative overflow-hidden" 
                   style={{ 
                     background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #A855F7 100%)',
                   }}>
                {/* Patrón decorativo */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.05)',
                  zIndex: 1
                }}></div>
                
                <div className="card-body p-5 text-white position-relative" style={{ zIndex: 2 }}>
                  <h2 className="h2 mb-3 fw-bold">¡Impulsa el próximo gran proyecto!</h2>
                  <p className="lead mb-4">
                    Desde cualquier país, con cualquier moneda. Conecta con creadores únicos 
                    o lanza tu propia idea al mundo. El futuro se construye con tu apoyo.
                  </p>
                  <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                    <button className="btn btn-light btn-lg px-5 py-3 fw-bold shadow-sm">
                      <i className="bi bi-plus-circle-fill me-2" style={{ color: '#8B5CF6' }}></i>
                      Crear Proyecto
                    </button>
                    <button className="btn btn-outline-light btn-lg px-5 py-3 fw-bold">
                      <i className="bi bi-search me-2"></i>
                      Explorar Proyectos
                    </button>
                  </div>
                  <div className="mt-4">
                    <small className="text-white-75">
                      <i className="bi bi-shield-check me-1"></i>
                      Transacciones seguras • Sin fronteras • Múltiples monedas
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}