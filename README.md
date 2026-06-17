# ImpulsoCFA - Frontend Web

Aplicación web de ImpulsoCFA, una plataforma de crowdfunding social desarrollada para conectar personas que necesitan apoyo económico con personas dispuestas a colaborar de forma segura, transparente y organizada.

La aplicación permite a usuarios crear campañas de recaudación, realizar donaciones mediante Mercado Pago, interactuar con la comunidad y hacer seguimiento del progreso de iniciativas sociales.

## 📖 Sobre el proyecto

ImpulsoCFA surge a partir de situaciones reales que evidenciaron problemas de confianza y organización en los mecanismos tradicionales de donaciones.

Esta plataforma web busca ofrecer una alternativa donde cualquier persona pueda crear una campaña de recaudación y recibir apoyo económico de otros usuarios, incorporando herramientas de transparencia que permitan visualizar el impacto generado por cada contribución.

## 🎯 Objetivo

Facilitar la financiación de proyectos, necesidades y causas sociales mediante una aplicación web segura que promueva la confianza entre creadores de campañas y donantes.

## 🚀 Funcionalidades principales

* Autenticación de usuarios con email/contraseña y Google OAuth.
* Visualización y gestión de campañas de recaudación.
* Creación y edición de campañas con soporte multimedia.
* Realización de donaciones integradas con Mercado Pago.
* Publicación y seguimiento de historias de impacto.
* Sistema de comentarios para interacción comunitaria.
* Gestión de perfil de usuario e historial de donaciones.
* Filtrado de campañas por categoría.
* Sistema de reportes para moderación.
* Panel de administrador para gestión de la plataforma.
* Panel de validador para supervisión y aprobación de campañas.

## 🔍 Características diferenciales

### Transparencia

La aplicación incorpora mecanismos que permiten a los usuarios realizar un seguimiento del estado y la gestión de las campañas:

* Visualización de campañas con detalle de donaciones recibidas.
* Historias de seguimiento que permiten narrar el impacto de las campañas.
* Sistema de validación de campañas por administradores y validadores.
* Historial completo de donaciones realizadas.
* Reportes de campañas para moderación y control.

### Integración con Mercado Pago

Las donaciones se procesan mediante Mercado Pago, permitiendo realizar aportes de forma rápida y segura utilizando una plataforma ampliamente adoptada en Argentina.

### Gestión de roles

Sistema diferenciado de acceso según rol:

* **Usuarios regulares:** creación de campañas, donaciones y comentarios.
* **Validadores:** supervisión y aprobación/rechazo de campañas pendientes.
* **Administradores:** gestión completa de usuarios, campañas, categorías y administradores.

## 🏗️ Arquitectura

La aplicación implementa una arquitectura modular basada en páginas, componentes y servicios:

```text
Pages (pantallas)
   ↓
Components (componentes reutilizables)
   ↓
Services (llamadas a la API / lógica)
   ↓
Backend API
```

### Responsabilidades

* **Pages** → Pantallas principales de la aplicación.
* **Components** → Componentes reutilizables como formularios, tarjetas y listas.
* **Services** → Llamadas a la API y manejo de la lógica de negocio.
* **LocalStorage** → Persistencia de tokens y usuario en el navegador.

## 🔐 Autenticación y Autorización

La autenticación se realiza mediante:

* **Email/Contraseña:** autenticación tradicional.
* **Google OAuth:** login social mediante la integración con Google.
* **JWT Tokens:** almacenamiento de sesión en `localStorage`.

### Roles

* Usuario
* Validador
* Administrador

Los permisos se gestionan según el rol del usuario autenticado.

## 🗄️ Modelo de datos

Principales entidades del sistema:

* Usuario
* Campaña
* Historia
* Categoría
* Comentario
* Donación
* Reporte

Persistencia y sesión:

* Backend API para datos principales.
* `localStorage` para tokens y perfil de usuario en el cliente.

## 🛠️ Tecnologías

### Frontend

* React 19
* Vite
* Tailwind CSS
* React Router DOM
* Framer Motion
* React Hot Toast
* Lucide Icons

### Autenticación y base de datos

* Supabase Auth
* Supabase Client (`@supabase/supabase-js`)

### Pagos

* Mercado Pago SDK (`@mercadopago/sdk-js`, `@mercadopago/sdk-react`)

### Herramientas

* JavaScript
* ESLint
* PNPM

## 📁 Estructura del proyecto

```text
src/
├── App.jsx
├── main.jsx
├── supabaseClient.js
├── tailwind.css
├── components/
│   ├── LlaveMaestra/
│   ├── campaña/
│   ├── comentarios/
│   ├── historias/
│   ├── pasarela/
│   ├── header/
│   ├── footer/
│   └── ...
├── pages/
│   ├── AdminPanel/
│   ├── Campanas/
│   ├── Donar/
│   ├── Historias/
│   ├── home/
│   ├── IniciarSesion/
│   ├── Registrarse/
│   ├── UsuarioPanel/
│   └── ...
└── services/
    ├── admin.service.js
    ├── auth.service.js
    ├── campaign.service.js
    ├── category.service.js
    ├── comment.service.js
    ├── history.service.js
    ├── payment.service.js
    ├── report.service.js
    └── user.service.js
```

## 🔧 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/FrancoJarc/impulsocfa-front.git
```

Ingresar al directorio:

```bash
cd impulsocfa-front
```

Instalar dependencias:

```bash
pnpm install
```

## ⚙️ Variables de entorno

Crear un archivo `.env` con las siguientes variables:

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
VITE_GOOGLE_REDIRECT=
VITE_REDIRECT_AFTER_CONFIRM=
VITE_MERCADOPAGO_PUBLIC_KEY=
```

## ▶️ Ejecución

Modo desarrollo:

```bash
pnpm dev
```

## 🌐 Despliegue

| Servicio | URL |
|---|---|
| Frontend web | https://impulsocfa-front.vercel.app |
| Backend API | https://impulsocfa-back.onrender.com |
| Aplicación móvil (APK) | [Descargar desde Expo](https://expo.dev/accounts/francojarc/projects/impulso-cfa-mobile/builds/333a90ea-1f98-4984-acae-63c2339a3998) |

## 💡 Desafíos técnicos abordados

* Integración de pagos con Mercado Pago desde la interfaz web.
* Autenticación con Google OAuth y email/contraseña.
* Manejo de roles y control de acceso para administrador y validador.
* Persistencia de sesión en `localStorage`.
* Gestión de campañas, historias, comentarios y reportes.
* Arquitectura modular con páginas, componentes y servicios.

## 👨‍💻 Autores

Camila Ocaña y Franco Jarc

Proyecto desarrollado como parte de la carrera de Analista de Sistemas.
