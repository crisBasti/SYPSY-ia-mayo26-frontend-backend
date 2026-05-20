# SYPSY — PROJECT CONTEXT

## 🧠 Qué es SYPSY
SYPSY es una plataforma de compra y venta online enfocada en velocidad de entrega y experiencia simple de usuario.

Objetivo: permitir que un usuario encuentre y solicite productos de forma rápida (“LO QUE QUERES YA!”).

---

## 🏗️ Arquitectura actual

### Frontend
- React (Vite)
- JavaScript
- Context API (ProductsContext)
- Pages:
  - Home
  - Productos por categoría
- Formulario de carga de productos

### Backend
- Node.js + Express
- API REST básica
- Manejo de productos

---

## 🗄️ Modelo de producto

- id (único)
- nombre
- descripcion
- precio
- stock
- categoria
- imagen (opcional)

---

## ⚙️ Estado actual real

✔ Listado de productos funcionando  
✔ Formulario de carga operativo  
✔ Comunicación frontend → backend  
✔ Estructura de páginas React creada  

⚠ Falta:
- Base de datos real (actualmente persistencia simple)
- Sistema de pedidos formal
- Panel admin seguro
- Deploy estable

---

## 🔁 Flujo actual del sistema

Admin → carga producto → backend → frontend lo muestra → usuario lo ve

---

## 🚚 Logística (visión)
- Pedidos deben llegar por WhatsApp
- Enfoque en entrega rápida tipo express
- Sin sistema complejo de usuarios por ahora

---

## 💰 Monetización
- Publicidad directa
- Productos destacados en el futuro
- Servicios premium

---

## 🎯 Objetivo técnico inmediato
Convertir el sistema en un MVP funcional con:
- base de datos real
- pedidos automatizados
- deploy online estable