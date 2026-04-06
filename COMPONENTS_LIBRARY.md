# 📚 Librería de Componentes UI - AECC UIDE Web

## 🎯 Descripción

Se ha creado una **sección de documentación completa de componentes** accesible en `/docs`. Esta página permite probar y visualizar todos los componentes reutilizables del proyecto en un mismo lugar.

## 📍 Ubicación

- **URL**: `http://localhost:3000/docs`
- **Archivo**: `src/app/docs/page.tsx`

## 📦 Componentes Documentados

### 1. **Botones (Buttons)**

- **Variantes disponibles**:
  - `default` - Botón por defecto con variables CSS personalizadas
  - `white` - Botón blanco
  - `destructive` - Botón de acción destructiva
  - `link` - Botón tipo enlace
  - `heart` - Botón con estilo de corazón
  - `baricon` - Icono barra transparente

- **Tamaños**:
  - `default` - Tamaño estándar (h-12 px-8 py-4)
  - `sm` - Pequeño (h-10)
  - `lg` - Grande (h-14)
  - `icon` - Solo ícono (12x12)

- **Props especiales**:
  - `lefticon` - Ícono a la izquierda
  - `rightIcon` - Ícono a la derecha
  - `loading` - Estado de carga

### 2. **Badges**

- **Variantes**:
  - `default` - Fondo primario
  - `secondary` - Fondo secundario
  - `destructive` - Fondo destructivo
  - `outline` - Solo borde

### 3. **Cards**

- Componente flexible para mostrar contenido
- **Props principales**:
  - `cardData` - Array o objeto único de datos de tarjeta
  - `onClick` - Callback cuando se hace clic en la tarjeta
- Soporta carrusel horizontal automático
- Incluye imagen, badge, título, descripción y tags

### 4. **Switch (Interruptor)**

- Componente toggle reutilizable
- Basado en `@radix-ui/react-switch`
- Estados: checked/unchecked
- Accesible por defecto

### 5. **Search Bar**

- Barra de búsqueda con ícono de lupa integrado
- **Props**:
  - `onSearch` - Callback de búsqueda
  - Soporta todos los atributos de `HTMLInputElement`

### 6. **Button Category**

- Botón con imagen y nombre
- Diseño neumórfico
- Soporta estado activo
- Ideal para menús de categorías

### 7. **Iconos**

- **Discord Icon** - SVG del logo de Discord
- Escalable a cualquier tamaño
- Usa `currentColor` para tomar color del contexto

### 8. **Galería de Imágenes**

- Grid responsivo de imágenes
- Efectos hover con zoom
- Soporta lazy loading

### 9. **Formularios**

- Ejemplo completo de formulario
- Campos de entrada personalizados
- Área de texto
- Integración con componentes Button

### 10. **Tipografía**

- Ejemplos de todos los niveles de encabezados
- Tamaños de texto disponibles
- Casos de uso recomendados

### 11. **Paleta de Colores**

- Visualización de todos los colores disponibles
- Vista previa de todas las variables CSS

## 🚀 Cómo Usar Esta Documentación

### Para Probar Componentes:

1. Navega a `http://localhost:3000/docs`
2. Desplázate por las diferentes secciones
3. Interactúa con los componentes:
   - Prueba diferentes variantes de botones
   - Activa/desactiva switches
   - Busca en la barra de búsqueda
   - Haz clic en las tarjetas
   - Visualiza la galería de imágenes

### Para Desarrolladores:

#### Importar componentes:

```jsx
// Botones
import { Button } from '@/components/ui/buttom';

// Badges
import { Badge } from '@/components/ui/badge';

// Cards
import Card from '@/components/ui/card';

// Componentes compartidos
import { ButtonCategory } from '@/shared/components/buttonCategory';
import { SearchBar } from '@/modules/comida/components/searchBar';
```

#### Ejemplo de uso:

```jsx
import { Button } from '@/components/ui/buttom';

export function MyComponent() {
	return (
		<Button
			variant="default"
			size="lg"
			lefticon={<YourIcon />}
			onClick={() => console.log('Clicked')}
		>
			Click me
		</Button>
	);
}
```

## 📋 Características de la Página

✅ Diseño responsivo (mobile, tablet, desktop)
✅ Tema claro/oscuro automático
✅ Secciones organizadas y expandibles
✅ Ejemplos interactivos de cada componente
✅ Código modular y mantenible
✅ Documentación inline en el código
✅ Paleta de colores visual
✅ Tipografía documentada

## 🎨 Estructura CSS

La página utiliza:

- **Tailwind CSS** para estilos utilitarios
- **CSS Variables** para colores personalizados
- **Dark mode** automático
- **Diseño neumórfico** para ButtonCategory

## 📝 Notas Adicionales

- La página es completamente **reactiva** con estados interactivos
- Se pueden probar todas las variantes sin necesidad de código
- La página se regenera estáticamente en build time
- Ideal para testing visual y demo de componentes

## 🔄 Próximas Mejoras Sugeridas

- [ ] Agregar más ejemplos de formularios complejos
- [ ] Documentar hooks personalizados
- [ ] Agregar sección de animaciones
- [ ] Crear tabla de compatibilidad de componentes
- [ ] Agregar ejemplos de layouts

## 📚 Archivos Relacionados

- `/src/components/ui/` - Componentes base de UI
- `/src/shared/components/` - Componentes compartidos
- `/src/modules/*/components/` - Componentes específicos de módulos
- `/biome.json` - Configuración de linting

---

**Creado**: 2026-04-05  
**Última actualización**: 2026-04-05
