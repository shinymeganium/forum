# SoftForum

SoftForum is a full-stack discussion forum. Users can register and log in, create and manage discussion threads, post comments, and view profile activity.

## Live Application

- Frontend: https://softforum.vercel.app
- Backend API: https://softforum.onrender.com/

## Technologies

- **Languages:** JavaScript, TypeScript, HTML, and CSS
- **Frontend:** React, Vite, React Router, Tailwind CSS, Zustand, Axios
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt, and CORS
- **Database:** MongoDB running in Docker locally; MongoDB Atlas in production
- **Testing:** Playwright

## Project Structure

```forum
.
├── backend/       Express API and MongoDB models
├── frontend/      React and TypeScript application
├── tests/         Playwright end-to-end and production tests and live app smoke tests
├── compose.yaml   MongoDB Docker Compose configuration
└── playwright.config.ts
```

## Requirements

- Node.js and npm
- Docker Desktop with Docker Compose

## Installation and Local Development

Install dependencies in each project folder:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

Start MongoDB in Docker from the project root:

```bash
docker compose up -d
```

### Backend Environment

Create `backend/.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/softforum
JWT_SECRET=replace-with-a-long-random-secret
CREATE_TEST_USER=false
```

Set `CREATE_TEST_USER=true` when a local test account should be created automatically at startup.

Start the backend:

```bash
cd backend
npm run dev
```

### Frontend Environment

------ CHECK THIS PART LATER ------

Create `frontend/.env` for local development. Use the backend host without the `/api` suffix because the API modules add that prefix to each request:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

The local frontend is normally available at `http://localhost:5173`.

For the deployed frontend, configure `VITE_API_URL` to point to the deployed backend API, for example:

```env
VITE_API_URL=https://softforum.onrender.com
```

## Backend

The backend is an Express REST API. It connects to MongoDB through Mongoose and uses JSON Web Tokens for authentication.

### Backend Packages

#### Production dependencies

- `express` - HTTP server and routing
- `mongoose` - MongoDB object modeling
- `bcrypt` - Password hashing and comparison
- `jsonwebtoken` - JWT creation and verification
- `cors` - Cross-origin request handling
- `dotenv` - Environment variable loading

#### Development dependencies

- `nodemon` - Automatic server restart during development

### Middleware

- `cors()` allows requests from the frontend application.
- `express.json()` parses JSON request bodies.
- `express.urlencoded()` parses form data.
- `authenticateToken` verifies the JWT from the `Authorization: Bearer <token>` header and attaches the authenticated user to the request.

### Database Models

- **User:** username, email, password hash, role, and timestamps
- **Thread:** title, content, author, categories, comment count, and timestamps
- **Comment:** content, author, related thread, and timestamps
- **Category:** name and description

### API Routes

All routes are prefixed with `/api`.

| Method | Endpoint                | Description                                        | Authentication |
| ------ | ----------------------- | -------------------------------------------------- | -------------- |
| GET    | `/health`               | Check API health                                   | No             |
| POST   | `/register`             | Register a user                                    | No             |
| POST   | `/login`                | Log in and receive a JWT                           | No             |
| GET    | `/profile`              | Get the current user's profile and activity counts | Yes            |
| GET    | `/profile/threads`      | Get the current user's threads                     | Yes            |
| GET    | `/profile/comments`     | Get the current user's comments                    | Yes            |
| GET    | `/users`                | List users without password hashes                 | No             |
| GET    | `/users/:id`            | Get one user without the password hash             | No             |
| GET    | `/threads`              | List recent threads                                | No             |
| POST   | `/threads`              | Create a thread                                    | Yes            |
| GET    | `/threads/:id`          | Get one thread                                     | No             |
| PUT    | `/threads/:id`          | Edit a thread owned by the current user            | Yes            |
| DELETE | `/threads/:id`          | Delete a thread owned by the current user          | Yes            |
| GET    | `/threads/:id/comments` | List comments for a thread                         | No             |
| GET    | `/comments`             | List recent comments                               | No             |
| POST   | `/comments`             | Add a comment                                      | Yes            |
| GET    | `/comments/:id`         | Get one comment                                    | No             |
| PUT    | `/comments/:id`         | Edit a comment owned by the current user           | Yes            |
| DELETE | `/comments/:id`         | Delete a comment owned by the current user         | Yes            |

### Dummy Test User

When `CREATE_TEST_USER=true`, the backend creates this user if it does not already exist:

```text
Username: test
Email: test@email.com
Password: 123
Role: user
```

This account is intended for local and automated testing only. Do not use these credentials in a production environment.

## Frontend

The frontend is a React application written in TypeScript and bundled with Vite. React Router handles navigation, while Zustand stores authentication state.

### Frontend Packages

- `react` and `react-dom` - User interface
- `react-router` - Client-side routing
- `axios` - HTTP communication with the backend
- `zustand` - Authentication and session state
- `react-icons` - Interface icons
- `tailwindcss` and `@tailwindcss/vite` - Styling
- `vite` - Development server and build tool
- `typescript` - Static typing
- ESLint packages - Code quality and linting
- React Compiler and Babel packages - React build support

### Frontend Structure

- `src/pages/` contains route-level views such as the front page, login, registration, profile, thread view, and editing pages.
- `src/components/auth/` contains login, registration, and protected-route components.
- `src/components/layout/` contains the application layout, header, sidebar, mobile navigation, and user menu.
- `src/components/thread/` contains thread cards, lists, forms, and detail views.
- `src/components/comment/` contains comment cards, forms, and lists.
- `src/components/profile/` contains profile UI.
- `src/components/ui/` contains reusable buttons, cards, inputs, and text areas.
- `src/api/` contains Axios and feature-specific API modules for authentication, profiles, users, threads, and comments.
- `src/stores/` contains Zustand stores, including authentication state.
- `src/util/` contains shared utility functions.

### Frontend Routes

- `/` - Front page with recent threads
- `/login` - Login page
- `/register` - Registration page
- `/threads/:id` - Thread details and comments
- `/profile` - Authenticated user's profile
- `/create` - Create a thread
- `/editThread/:id` - Edit a thread
- `/editComment/:id` - Edit a comment

## Frontend and Database Communication

The frontend does not connect directly to MongoDB. Communication follows this path:

```text
React components
	↓
Axios API modules
	↓
Express REST API
	↓
Mongoose
	↓
MongoDB Docker container
```

The frontend reads the backend URL from `VITE_API_URL`. After login, the JWT is stored in browser storage and the Axios request interceptor adds it to authenticated requests. The backend verifies the token before allowing protected operations.

For local development, the backend connects to the MongoDB instance started by Docker Compose. The live application uses MongoDB Atlas as its database host through the production `MONGO_URI` environment variable.

## Testing

Install the Playwright browsers if needed:

```bash
npx playwright install
```

Run end-to-end tests against the local application:

```bash
npm run test:e2e
```

Run production smoke tests against the deployed frontend:

```bash
npm run test:production
```

The end-to-end tests expect the frontend and backend to be running locally. Playwright reports are generated in `playwright-report/`.

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment. The main pipeline is defined in `.github/workflows/e2e.yml` and runs automatically when code is pushed to the `main` branch. It can also be started manually with `workflow_dispatch`.

The pipeline:

1. Checks out the repository and installs the Node.js dependencies.
2. Creates the backend environment, starts MongoDB in Docker, and installs Playwright browsers.
3. Builds the frontend and starts the backend and frontend applications.
4. Runs the Playwright end-to-end tests.
5. Deploys the backend to Render through the configured Render deploy hook if the previous steps pass.
6. Uploads the Playwright report as a workflow artifact.

The frontend is deployed to Vercel automatically on every push. Vercel deployment is handled by Vercel's GitHub integration rather than a deployment step in the GitHub Actions workflow.

The production smoke-test workflow is defined in `.github/workflows/production_smoke.yml`. It can be started manually and runs the Playwright tests against the deployed frontend at `https://softforum.vercel.app`.

The CI/CD workflows use repository secrets for values such as `MONGO_URI`, `JWT_SECRET`, and the Render deployment hook. Production database access uses MongoDB Atlas.

## Available Scripts

### Root

- `npm run test:e2e` - Run local end-to-end tests
- `npm run test:production` - Run production smoke tests

### Backend

- `npm run dev` - Start the backend with Nodemon

### Frontend

- `npm run dev` - Start the Vite development server
- `npm run build` - Type-check and build the production frontend
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Author

<!-- Add author information here. -->

## License

This project is free to use. No specific license has been selected yet.
