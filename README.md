# AECC UIDE Web

¡Bienvenido al repositorio oficial del proyecto web de la Asociación de Estudiantes de la Carrera de Computación (AECC) de la UIDE!

## 🌟 Objetivo Comunitario

Este proyecto nace con el propósito de ser una plataforma comunitaria colaborativa, desarrollada por y para los estudiantes de la carrera de Computación de la UIDE. Nuestro principal objetivo es centralizar información de utilidad, recursos, eventos y noticias en un solo lugar, fomentando la integración estudiantil, el aprendizaje continuo y el sentido de comunidad.

Al ser una iniciativa de código abierto respaldada por la asociación, invitamos a todos los estudiantes apasionados por la tecnología y el desarrollo de software a sumar sus conocimientos, proponer mejoras y contribuir activamente en la construcción de soluciones tecnológicas que beneficien a toda nuestra carrera.

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para configurar y correr el proyecto en tu propia máquina:

### 1. Requisitos Previos

Asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (se recomienda la versión LTS más reciente)
- [Git](https://git-scm.com/)

### 2. Clonar el repositorio

Abre tu terminal y descarga el proyecto:

```bash
git clone https://github.com/AECCuide/aecc-uide-web.git
cd aecc-uide-web
```

### 3. Instalar dependencias

Instala las librerías necesarias con el gestor de paquetes de Node:

```bash
npm install
```

### 4. Variables de entorno (Opcional/Según entorno)

Si el proyecto requiere de conexiones externas (por ejemplo, a Firebase para el inicio de sesión), asegúrate de crear en la raíz del proyecto un archivo `.env` con las variables y claves necesarias.

### 5. Iniciar el servidor en modo desarrollo

Una vez listas las dependencias, levanta el proyecto:

```bash
npm run dev
```

Abre tu navegador web y visita [http://localhost:3000](http://localhost:3000) para ver el resultado.

---

## 🛠️ Tecnologías y Herramientas

El proyecto está creado usando tecnologías modernas:

- **[Next.js 16](https://nextjs.org/)**: Framework de React que facilita la construcción de aplicaciones robustas.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework de CSS para aplicar estilos mediante clases utilitarias de forma rápida y responsiva.
- **Prettier**: Manteniendo la uniformidad del código sin esfuerzo.
- **Husky**: Gestiona _Git hooks_, para ayudarnos a mantener la seguridad y la calidad del código en cada subida de cambios.

## 🌍 Versión en Producción

Puedes visualizar los avances desplegados en nuestra página oficial de GitHub Pages:
👉 **[AECC UIDE Web - Despliegue en Producción](https://aeccuide.github.io/aecc-uide-web/)**

¡Cada grano de arena cuenta y tu contribución tiene un impacto real. Si tienes ideas de mejora o encuentras algún error, no dudes en crear un _issue_ o enviar un _pull request_!
