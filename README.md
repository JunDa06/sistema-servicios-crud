# 🚀 TechSolutions - Sistema CRUD de Servicios

Aplicación web desarrollada con **React + Node.js + Express + Sequelize**, que permite gestionar servicios (crear, editar, eliminar y visualizar) con autenticación de usuario y base de datos en la nube.

---

## 👥 Integrantes del Proyecto

| Nombre        | GitHub                     |
| ------------- | -------------------------- |
| Dayron Cavero | https://github.com/JunDa06 |

---

## 🧠 Tecnologías Utilizadas

* **Frontend:** React + Vite
* **Backend:** Node.js + Express
* **Base de Datos:** MySQL (Railway) 🌐
* **ORM:** Sequelize
* **Autenticación:** JWT
* **Estilos:** CSS

---

## 🔐 Credenciales de Acceso

```text
Usuario: admin
Contraseña: 1234
```

---

## ⚙️ Instalación del Proyecto

### 📥 1. Clonar repositorio

```bash
git clone https://github.com/JunDa06/sistema-servicios-crud.git
cd sistema-servicios-crud
```

---

### 📦 2. Instalar dependencias

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

---

## 🔑 Configuración del Entorno

### 📄 Crear archivo `.env`

Dentro de la carpeta `server`, crear un archivo:

```bash
server/.env
```

### ✏️ Contenido del archivo

```env
DB_HOST=shinkansen.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=TU_PASSWORD_AQUI
DB_NAME=railway
DB_PORT=58769
```

> ⚠️ Nota: Las credenciales reales deben obtenerse desde Railway o ser proporcionadas por el desarrollador.

---

## ▶️ Ejecución del Proyecto

### 🔹 Backend

```bash
cd server
node app.js
```

---

### 🔹 Frontend

```bash
cd client
npm run dev
```

---

## 🌐 Acceso a la Aplicación

Abrir en el navegador:

```text
http://localhost:5173
```

---

## 🧾 Funcionalidades

✔ Registro de servicios
✔ Edición de servicios
✔ Eliminación de servicios
✔ Búsqueda dinámica
✔ Autenticación de usuario
✔ Persistencia de datos en la nube 🌐

---

## 🧱 Estructura del Proyecto

```text
sistema-servicios-crud/
│
├── client/        # Frontend (React)
├── server/        # Backend (Express + Sequelize)
│   ├── models/
│   ├── routes/
│   ├── database.js
│   └── app.js
│
└── README.md
```

---

## ⚠️ Notas Importantes

* El archivo `.env` NO está incluido por seguridad
* La base de datos está desplegada en Railway
* Se recomienda no modificar las credenciales sin autorización

---

## 📌 Estado del Proyecto

✔ CRUD funcional
✔ Autenticación implementada
✔ Base de datos en la nube operativa
🚧 Próximas mejoras:

* Categorías de servicios
* Soft Delete
* Subida de imágenes

---

## 🎥 Demo



---

## 📄 Licencia

Proyecto desarrollado con fines educativos.
