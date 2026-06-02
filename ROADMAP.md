# Roadmap del Proyecto Maiquel

Este roadmap define una evolucion incremental y realista del proyecto.

## Fase 1 - Base estable (actual)

- [x] Estructura inicial frontend y backend
- [x] API REST con autenticacion JWT
- [x] CRUD de tareas por usuario
- [x] Interfaz moderna y responsive en espanol
- [x] Documentacion base

## Fase 2 - Calidad de desarrollo

- [ ] ESLint y Prettier para frontend y backend
- [ ] Tests unitarios backend (Jest)
- [ ] Tests frontend (Vitest)
- [ ] Pruebas E2E (Cypress o Playwright)
- [ ] Cobertura de pruebas minima del 70%

## Fase 3 - Infraestructura y despliegue

- [x] Dockerfile para backend
- [x] Docker Compose para entorno local completo
- [ ] Despliegue de frontend en CDN/hosting estatico
- [ ] Despliegue de backend en entorno cloud
- [ ] Variables seguras y secretos por entorno

## Fase 4 - Datos y escalabilidad

- [ ] Migrar persistencia JSON a PostgreSQL
- [ ] Integrar ORM (Prisma o TypeORM)
- [ ] Migraciones y seeds automatizadas
- [ ] Paginacion y filtros avanzados de tareas
- [ ] Cache de consultas frecuentes

## Fase 5 - Producto y experiencia

- [ ] Busqueda y etiquetas en tareas
- [ ] Vista calendario y recordatorios
- [ ] Notificaciones en tiempo real
- [ ] Perfil de usuario editable
- [ ] Modo oscuro/claro configurable

## Fase 6 - Seguridad avanzada

- [ ] Rate limiting por IP y usuario
- [ ] Auditoria de accesos y cambios criticos
- [ ] Politica de contrasenas robusta
- [ ] Rotacion de secretos y hardening adicional
- [ ] Escaneo de dependencias y SAST en CI

## Criterio de priorizacion

Cada nueva funcionalidad deberia evaluarse por:

1. Impacto directo en usuarios
2. Riesgo tecnico
3. Tiempo de implementacion
4. Complejidad de mantenimiento
