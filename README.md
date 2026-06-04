# Calculator App Frontend

Frontend для калькулятора с историей вычислений. Приложение написано на Vue 3 и работает с отдельным Go backend через REST API.

## Связанные репозитории

- Frontend: [Calculator-Vue-Go](https://github.com/0oLeono0/Calculator-Vue-Go)
- Backend: [Calculator-Vue-Go-Backend](https://github.com/0oLeono0/Calculator-Vue-Go-Backend)

Frontend и backend находятся в отдельных репозиториях. Для локальной разработки сначала запусти backend, затем frontend.

## Возможности

- Ввод математического выражения через интерфейс калькулятора
- Отправка выражения на backend для вычисления
- Получение истории вычислений
- Редактирование сохраненного вычисления
- Удаление вычисления из истории
- Отображение состояний загрузки и ошибок

## Стек

- Vue 3
- TypeScript
- Pinia
- Vite
- Axios
- SASS
- ESLint
- Prettier

## Структура проекта

```text
src/
  api/
    calculations.ts          # HTTP-клиент для backend API
  components/
    CalculatorPanel.vue      # Панель калькулятора
    CalculationHistory.vue   # История вычислений
  constants/
    calculator.ts            # Кнопки и константы калькулятора
  stores/
    calculator.ts            # Pinia store с состоянием приложения
  styles/
    main.scss                # Основные стили
  types/
    calculation.ts           # TypeScript-типы вычислений
```

## Переменные окружения

По умолчанию frontend отправляет запросы на:

```text
http://localhost:8080
```

Если backend запущен на другом адресе, укажи переменную `VITE_API_BASE_URL`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Запуск

Установить зависимости:

```powershell
npm install
```

Запустить dev-сервер:

```powershell
npm run dev
```

По умолчанию Vite запустит приложение локально. Адрес будет показан в терминале после запуска.

## Backend

Для полноценной работы приложения backend должен быть запущен отдельно.

Backend ожидается на:

```text
http://localhost:8080
```

Используемые endpoints:

- `GET /calculations`
- `POST /calculations`
- `PATCH /calculations/:id`
- `DELETE /calculations/:id`

## Скрипты

```powershell
npm run dev
npm run build
npm run preview
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run type-check
```

## Проверки

Проверить типы:

```powershell
npm run type-check
```

Запустить ESLint:

```powershell
npm run lint
```

Собрать production build:

```powershell
npm run build
```
