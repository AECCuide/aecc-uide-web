# Arquitectura del Proyecto AECC UIDE Web

## Visión General

El proyecto es una aplicación web construida con **Next.js (App Router)** y **TypeScript**, optimizada para el rendimiento y la escalabilidad. Sigue de base una **arquitectura en capas orientada a módulos** (Similar al patrón _Feature-Driven/Domain-Driven_ en el Frontend), donde el enrutamiento visual está separado de la lógica de negocio, centralizada por dominio.

---

## Estructura de la Carpeta `/src`

El directorio principal (`src/`) se organiza en capas según su responsabilidad en la aplicación:

### 1. Sistema de Enrutamiento: `/app`

Gestiona todas las rutas, diseños (layouts) y metadatos del sitio utilizando el **App Router** de Next.js.

- **Rutas Principales:** Define la estructura de las URIs de la página web (`/` home, `/cuarenta` para el juego de cartas, `/eat` para comida, `/merch`, `/perfil`).
- **Archivos Base:** Aloja el diseño global (`layout.tsx`), los estilos globales (`globals.css`) y la gestión de URLs fallidas (`not-found.tsx`).
- **Configuración SEO y PWA:** Contiene `robots.ts`, `manifest.ts` y `sitemap.ts` para optimización de indexación.

### 2. Componentes y Proveedores Globales: `/components`

Aloja componentes reutilizables a nivel global, interfaces de usuario (UI Components) y manejadores de estado o contexto general de la aplicación.

- **Contexto y Proveedores:** Envolturas principales como `auth-provider.tsx` (Autenticación) y `theme-provider.tsx` (Modo claro/oscuro).
- **Estructura Base Visual:** Componentes como la barra de navegación responsive central y la parte inferior de la página (`menu-bar`, `footer`).
- **Elementos de UI (Design System):** Interfaces atómicas genéricas como `badge.tsx`, `card.tsx`, `switch.tsx` que construyen los bloques base del diseño.

### 3. Configuraciones y Servicios: `/lib`

Destinada a las instancias de conexión para base de datos y utilidades base estructurales del proyecto.

- **BaaS (Backend as a Service):**
  - Cliente de conexión de **Supabase** (`supabase.ts`).
  - Configuración del proyecto de **Firebase** (`firebase/config.ts`).
- **Utilidades Globales:** `utils.ts` que actúan en un entorno central de la infraestructura Next.

### 4. Lógica de Negocio y Features: `/modules`

Es el corazón de la aplicación escalable. El código está aislado en "módulos" dependiendo del área de negocio al cual pertenece. Dentro de cada módulo subyacen sus propios hooks y componentes aislados.

- **`comida`**: Enfocado al entorno gastronómico. Contiene componentes de búsqueda (`searchBar.tsx`) y selección de categorías.
- **`cuarenta`**: El módulo más extenso; administra toda la lógica relacionada al juego tradicional interuniversitario. Incluye lógica de registro (`registrationService.ts`, `validation.ts`), sistema de torneos (`useTournament.ts`), animaciones especializadas (`coinFlipAnimation.ts`, `animacionCartas.tsx`), y componentes de presentación (`ParticipantCard.tsx`, `WinnerDisplay.tsx`).
- **`home`**: Elementos exclusivos de la interfaz principal o _Landing Page_, por ejemplo, el historial de eventos organizado como línea de tiempo (`timeLine`).
- **`merch`**: Arquitectura de componentes visuales para ventas o catálogo (`masonryGrid.tsx`).
- **`sheets`**: Funciones dedicadas al acceso y tratamiento de datos estructurados para las interfaces.

### 5. Elementos Compartidos Secundarios: `/shared`

Ubicación para aquellos componentes transversales rápidos como botoneras interactivas (Ej. `buttonCategory.tsx`, `buttons.tsx`), que si bien son UI, responden de forma más independiente que la librería central de componentes.

### 6. Ayudas Transversales: `/utils`

Directorio dedicado a funciones de manipulación técnica en el cliente, de manera muy focalizada, como por ejemplo la compilación condicional y unión de clases estéticas de Tailwind CSS a través de la función `cn` (`cn.ts`).

---

## Flujo de Datos y Tecnologías Empleadas

- **Framework Core:** Next.js bajo React.
- **Sistema de Tipos:** Empleo fuerte de TypeScript transversalmente (definiendo interfaces y tipos por directorio, e.g. `types/registration.ts`).
- **Base de Datos y Autenticación:** Supabase sirve como motor central acompañado de Firebase para eventos paralelos (eventualmente análisis o almacenamiento externo).
- **Estándar de Diseño:** Tailwind CSS es el motor generador de estilos integrados gestionados mediante componentes modulares atómicos, previniendo choques entre el Layout global y los features específicos.
