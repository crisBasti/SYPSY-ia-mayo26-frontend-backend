# 📌 PROJECT_CONTEXT.md — SYPSY

## 🧠 Resumen del proyecto

SYPSY es una plataforma web de compra y venta online con enfoque en velocidad de entrega, simplicidad operativa y escalabilidad, orientada a competir con marketplaces tradicionales mediante mejoras en logística y experiencia de usuario.

Lema: “LO QUE QUERES YA!”

---

## 🏗️ Arquitectura general

El proyecto está dividido en dos partes principales:

### 🔵 Frontend
- Tecnologías: HTML, CSS/SASS, JavaScript, React (Vite)
- Estructura basada en componentes
- Context API para manejo de estado global (productos)
- Páginas principales:
  - Home
  - Catálogo de productos
  - Secciones por categoría

### 🟢 Backend
- Node.js + Express
- API REST para productos

---

## 🗄️ Modelo de datos

- id
- nombre
- descripcion
- precio
- stock
- categoria
- imagen

---

## ⚙️ Funcionalidades actuales

- Listado de productos
- Formulario de carga
- Backend básico
- Comunicación frontend/backend

---

## 🚧 Próximos pasos

- Base de datos real (MongoDB o SQLite)
- Sistema de pedidos WhatsApp
- Panel admin
- Deploy