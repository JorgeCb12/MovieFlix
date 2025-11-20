# 🎬 MovieFlix – Buscador de Películas (React + Vite)

MovieFlix es una aplicación web desarrollada con **React + Vite** que permite explorar películas mediante una API externa, visualizar detalles completos y gestionar una lista personalizada de favoritos.  
El proyecto está construido con un enfoque en **arquitectura limpia**, **componentización**, **manejo de estado**, y una interfaz ligera y rápida gracias a Vite.

---

## 🚀 Características principales

✔️ Búsqueda de películas por nombre  
✔️ Vista de detalles individuales  
✔️ Sistema de favoritos con persistencia local  
✔️ Renderizado optimizado con `useMemo` y componentes desacoplados  
✔️ Integración con API externa para obtener información real  
✔️ Rutas dinámicas para páginas de detalle  
✔️ Diseño responsive y moderno  

---

## 🛠️ Tecnologías utilizadas

- **React**
- **Vite**
- **React Router**
- **CSS Modules**
- **JavaScript / JSX**
- **LocalStorage**
- **Fetch API / Servicios externos**

---

## 📁 Estructura del proyecto

src/
│── assets/ → Imágenes y recursos
│── components/ → Componentes reutilizables (MovieCard, MovieGrid, etc.)
│── context/ → Contexto global (favoritos, estados)
│── hooks/ → Custom hooks
│── pages/ → Páginas principales (Home, Details, Favorites)
│── services/ → Conexión con la API externa
│── utils/ → Funciones de utilidad
│── App.jsx → Rutas principales
│── main.jsx → Punto de entrada

