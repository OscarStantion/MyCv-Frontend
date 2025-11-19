# cvFront (Angular)

Frontend simple para gestionar un CV que consume un backend Spring Boot en `http://localhost:8080`.

Quick start

1. Instalar dependencias:

```powershell
cd C:\Users\Usuario\Desktop\MyCv\Frontend\cvFront
npm install
```

2. Levantar servidor de desarrollo:

```powershell
npm start
```

La app estará en `http://localhost:4200`.

Comprobaciones rápidas

- Build:

```powershell
npm run build
```

- Tests unitarios (Karma):

```powershell
npx ng test --watch=false
```

Notas

- Endpoints esperados del backend (base): `http://localhost:8080/api/cv`
- Rutas especiales usadas por el frontend (tal como están en el repo):
	- GET `/api/cv` (resumen)
	- GET `/api/cv/{id}/completo` (CV con secciones e items)
	- PUT `/api/cv/{id}/foto` (multipart field `file`)
	- Rutas de secciones/items: el frontend está adaptado a las rutas actuales del backend.

Si quieres que arranque el servidor de desarrollo aquí y pruebe flujos básicos con tu backend en `http://localhost:8080`, confírmalo y lo hago.
