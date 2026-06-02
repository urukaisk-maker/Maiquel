# Roadmap del Proyecto Maiquel (Sprints)

Este roadmap transforma las fases en un plan ejecutable por sprints, con enfoque en entrega incremental y calidad continua.

## Estado actual (completado)

- [x] Estructura base frontend y backend
- [x] Autenticacion JWT (registro/login)
- [x] CRUD de tareas por usuario
- [x] UI moderna y responsive en espanol
- [x] CI inicial y organizacion del repositorio
- [x] Docker y docker-compose para entorno local

## Sprint 1 - Calidad de codigo y estandares

### Objetivo

Dejar una base consistente para desarrollar con velocidad y menos errores.

### Tareas

- [x] Configurar ESLint en frontend y backend
- [x] Configurar Prettier con reglas compartidas
- [x] Agregar scripts de calidad en `package.json` (`lint`, `format`, `check`)
- [x] Validar flujo en CI (local pendiente de entorno con npm)

### Entregables

- Configuracion de lint/formato versionada
- Comandos de calidad documentados en `README.md`

### Criterio de cierre

- Todo el proyecto pasa lint sin errores
- Los cambios nuevos siguen formato automatico

## Sprint 2 - Testing tecnico

### Objetivo

Aumentar la confianza en cambios futuros con pruebas automatizadas.

### Tareas

- [x] Tests unitarios backend con Jest
- [x] Tests frontend con Vitest
- [ ] Prueba E2E critica (login + CRUD basico) con Playwright o Cypress
- [ ] Incorporar cobertura minima del 70%

### Entregables

- Suite de pruebas automatizada
- Reporte de cobertura en CI

### Criterio de cierre

- CI ejecuta tests en cada push/PR
- Cobertura igual o superior al umbral definido

## Sprint 3 - Despliegue real

### Objetivo

Publicar la aplicacion en un entorno accesible y estable.

### Tareas

- [ ] Desplegar frontend en hosting estatico/CDN
- [ ] Desplegar backend en servicio cloud
- [ ] Gestionar variables de entorno por ambiente
- [ ] Configurar dominio y HTTPS

### Entregables

- URL publica de frontend y API
- Documento corto de despliegue y rollback

### Criterio de cierre

- Aplicacion accesible en entorno productivo
- Flujo de login y tareas funcionando en produccion

## Sprint 4 - Datos y escalabilidad

### Objetivo

Reemplazar persistencia JSON por una base de datos robusta.

### Tareas

- [ ] Migrar a PostgreSQL
- [ ] Integrar ORM (Prisma recomendado)
- [ ] Crear migraciones y seeds
- [ ] Agregar paginacion y filtros en listados

### Entregables

- Esquema de datos versionado
- API operando con base de datos relacional

### Criterio de cierre

- Datos persistentes en PostgreSQL
- Rendimiento aceptable en listados con paginacion

## Sprint 5 - Producto y experiencia

### Objetivo

Subir el valor para usuario final con funciones de productividad.

### Tareas

- [ ] Busqueda por texto y filtros por estado/prioridad
- [ ] Etiquetas/categorias en tareas
- [ ] Perfil de usuario editable
- [ ] Vista de calendario y recordatorios

### Entregables

- Nuevas vistas y componentes UX
- Historias de usuario cerradas con demo funcional

### Criterio de cierre

- Usuario puede organizar y consultar tareas con mayor eficiencia

## Sprint 6 - Seguridad avanzada y observabilidad

### Objetivo

Fortalecer seguridad operativa y monitoreo del sistema.

### Tareas

- [ ] Endurecer autenticacion (politica de contrasenas y expiracion)
- [ ] Auditoria basica de acciones criticas
- [ ] Escaneo de dependencias y SAST en CI
- [ ] Logging estructurado y alertas de errores

### Entregables

- Pipeline de seguridad activo
- Base de observabilidad para incidentes

### Criterio de cierre

- Riesgo de seguridad reducido y eventos criticos trazables

## Priorizacion de backlog

Cada nueva tarea deberia evaluarse por:

1. Impacto en usuario
2. Riesgo tecnico
3. Esfuerzo/tiempo
4. Costo de mantenimiento
