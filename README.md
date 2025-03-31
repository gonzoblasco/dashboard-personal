# Dashboard Personal

Un dashboard interactivo y personalizable construido con React que permite visualizar y gestionar información personal a través de diferentes widgets.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Dashboard+Personal+Preview)

## Características

- **Interfaz personalizable**: Cambia el tema (claro/oscuro), colores y disposición de los widgets según tus preferencias
- **Persistencia de datos**: Tus preferencias y datos se guardan automáticamente en el navegador
- **Widgets interactivos**:
  - **Lista de tareas**: Gestiona tus tareas pendientes con funcionalidad completa (añadir, completar, eliminar)
  - **Gráficos**: Visualiza datos con gráficos interactivos
  - **Contadores**: Realiza seguimiento de métricas importantes
  - **Resúmenes**: Visualiza información resumida de manera clara
- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla

## Tecnologías utilizadas

- **React 19**: Biblioteca JavaScript para construir interfaces de usuario
- **React Router**: Para la navegación entre páginas
- **Emotion**: Para estilos con CSS-in-JS
- **Recharts**: Para la visualización de datos con gráficos
- **LocalStorage API**: Para la persistencia de datos en el navegador
- **Context API**: Para la gestión del estado global

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/gonzoblasco/dashboard-personal.git
   cd dashboard-personal
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm start
   ```

4. Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

## Uso

### Personalización del dashboard

1. Accede a la página de configuración haciendo clic en el icono de ajustes
2. Cambia el tema entre claro y oscuro
3. Personaliza los colores de la aplicación
4. Activa o desactiva widgets según tus necesidades
5. Reorganiza los widgets arrastrándolos a la posición deseada

### Gestión de tareas

El widget de lista de tareas te permite:
- Añadir nuevas tareas
- Marcar tareas como completadas
- Filtrar tareas por estado (todas, activas, completadas)
- Eliminar tareas

### Visualización de datos

Los widgets de gráficos y contadores muestran información visual de tus datos, permitiéndote:
- Ver tendencias a lo largo del tiempo
- Identificar patrones
- Realizar seguimiento de métricas importantes

## Scripts disponibles

- `npm start`: Ejecuta la aplicación en modo desarrollo
- `npm test`: Lanza el ejecutor de pruebas
- `npm run build`: Construye la aplicación para producción
- `npm run eject`: Expone la configuración de Create React App

## Estructura del proyecto

```
dashboard-personal/
├── public/                  # Archivos estáticos
├── src/                     # Código fuente
│   ├── components/          # Componentes React
│   │   ├── common/          # Componentes comunes (botones, tarjetas, etc.)
│   │   ├── layout/          # Componentes de estructura (header, grid, etc.)
│   │   └── widgets/         # Widgets del dashboard
│   ├── context/             # Contextos de React (preferencias de usuario)
│   ├── data/                # Datos mock y utilidades
│   ├── pages/               # Componentes de página
│   ├── App.js               # Componente principal
│   └── index.js             # Punto de entrada
└── package.json             # Dependencias y scripts
```

## Contribución

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre primero un issue para discutir lo que te gustaría cambiar.

## Autor

Desarrollado por [Gonzalo Blasco](https://github.com/gonzoblasco)

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
