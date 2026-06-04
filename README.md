# Calculator App

Vue 3 calculator client with calculation history stored through a REST API.

## Stack

- Vue 3 with Composition API
- TypeScript
- Pinia
- Vite
- SASS
- ESLint flat config
- Prettier

Vue Router is not included because the application has a single screen and no route
state.

## API

By default the client uses:

```text
http://localhost:8080
```

Override it with `VITE_API_BASE_URL` when needed:

```bash
VITE_API_BASE_URL=http://localhost:8080 npm run dev
```

The client expects these endpoints:

- `GET /calculations`
- `POST /calculations`
- `PATCH /calculations/:id`
- `DELETE /calculations/:id`

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run type-check
```
