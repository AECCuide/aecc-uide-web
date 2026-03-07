# Runbook: Componente Card

Este documento describe el uso, la estructura y las propiedades del componente `Card` ubicado en `src/components/ui/card.tsx`.

## Interfaz de Datos (`CardData`)

El componente utiliza la interfaz genérica `CardData` para poblar la información visual de cada tarjeta:

```typescript
export interface CardData {
	image?: string | StaticImageData; // Ruta o imagen estática para el cover principal
	badge?: string; // Etiqueta destacada (ej. "NUEVO", "POPULAR") - renderizado sobre la imagen
	provider?: string; // Texto secundario sobre el título (ej. Categoría o proveedor)
	title?: string; // Título principal de la tarjeta
	description?: string; // Texto descriptivo corto
	tags?: string[]; // Arreglo de etiquetas a mostrar en la parte inferior
	slug?: string; // Identificador único (usado reactivamente como `key`)
}
```

## Propiedades (Props)

El componente recibe una de las siguientes variantes a través de la interfaz `CardProps`:

- `cardData`: Puede ser un **objeto individual** de tipo `CardData` o un **arreglo de objetos** `CardData[]`.

## Comportamiento de Renderizado

### 1. Renderizado de Colección (Array)

Si se pasa un arreglo en `cardData`, el componente automáticamente renderiza un contenedor con scroll horizontal tipo carrusel (`overflow-x-auto` con `snap-x`):

- Oculta la barra de desplazamiento (`scrollbar-hide`).
- Aplica espaciado (`gap-6`) y comportamiento de encaje (`snap-center`).
- **Importante:** Utiliza `slug` como `key` o en su defecto el índice (`index`).

### 2. Renderizado Individual (Objeto)

Si se pasa un solo objeto, el componente renderiza una tarjeta individual con un ancho fijo de `w-80` (320px). Incluye:

- **Área de Imagen:** Un contenedor relativo (`w-full h-32`) con imagen ajustada por `object-cover`. Muestra un placeholder genérico si no se provee `image`.
- **Badge:** Si existe, renderiza una insignia flotante en la esquina superior izquierda.
- **Contenido del Texto:** Proveedor, título (`text-xl font-bold`) y descripción.
- **Sistema de Etiquetas (Tags):**
  - Renderiza como máximo **3 etiquetas**.
  - Si hay más de 3 etiquetas, genera de forma automática una insignia de conteo dinámico (ej. `+2`).

## Ejemplos de Implementación

### Tarjeta Individual

```tsx
import Card from '@/components/ui/card';

const miData = {
	title: 'Ejemplo de Tarjeta',
	description: 'Descripción breve del contenido',
	badge: 'NUEVO',
	tags: ['UI', 'React', 'Next.js', 'Tailwind', 'ExtraTag'],
};

<Card cardData={miData} />;
```

### Carrusel de Tarjetas

```tsx
import Card from '@/components/ui/card';

const coleccionData = [
	{ slug: 'item-1', title: 'Item 1' },
	{ slug: 'item-2', title: 'Item 2' },
	{ slug: 'item-3', title: 'Item 3' },
];

<Card cardData={coleccionData} />;
```

## Dependencias

- Requiere `next/image` para el renderizado optimizado de imágenes.
- Utiliza variables CSS personalizadas del proyecto (ej. `bg-(--color-card)`, `text-(--color-foreground)`) para el soporte de temas.
