# Social Media Mini Feed

A full-stack social media feed application built with SST (Serverless Stack), featuring a Next.js frontend and GraphQL backend.

## Prerequisites

- Node.js >= 18
- Yarn package manager (v1.22.22 or later)
- AWS CLI configured with appropriate credentials
- Docker (for local database)
- AWS SSO configured for deployment

## Local Development Setup

### 1. Install Dependencies

```bash
# Install project dependencies
yarn install
```

### 2. Environment Setup

```bash
# Copy environment files
cp .env.development.dist .env
cp apps/backend/.env.development.dist apps/backend/.env

# Configure the environment variables in both files
```

### 3. Database Setup

Start the local database using Docker:

```bash
# Start the database container
docker-compose up -d
```

Run migrations to create the database tables:

```bash
yarn workspace backend migrate
```

### 4. SST Setup

Install SST tunnel for local development. This allows your local server to be accessible via the internet for testing webhooks and other integrations:

```bash
sudo sst tunnel install
```

### 5. Start Development Server

```bash
# Start all services in development mode
yarn dev
```

## Development Workflow

- Frontend (Next.js) runs at: `http://localhost:3000`
- Backend (GraphQL) runs at: `http://localhost:4000/graphql`
- Database runs at: `localhost:5432`

## SST Notes

### Key Features Used

- **SST Dev Mode**: Provides a local development environment that closely mirrors production
- **Live Lambda Development**: Enables real-time Lambda function development without redeployment
- **Resource Binding**: Automatically injects environment variables and configurations
- **Database**: Uses RDS for PostgreSQL database management

### Deployment

The project supports multiple deployment stages:

```bash
# Deploy to preview environment
yarn deploy:preview

# Deploy to development environment
yarn deploy:dev

# Login to AWS SSO (required before deployment)
yarn sso
```

### Important SST Commands

- `sst dev`: Start local development environment
- `sst deploy`: Deploy to AWS
- `sst remove`: Remove deployed resources
- `sst console`: Open the SST Console for debugging

## Project Structure

```
.
├── apps/
│   ├── backend/              # GraphQL API service
│   │   ├── migrations/       # Database migrations
│   │   └── src/             # Backend source code
│   └── web/                  # Next.js frontend
│       └── src/             # Frontend source code
├── packages/                 # Shared packages
│   ├── eslint-config/       # ESLint configurations
│   └── typescript-config/   # TypeScript configurations
└── sst/                     # SST infrastructure code
```

## Available Scripts

- `yarn dev`: Start development environment
- `yarn build`: Build all packages and applications

## Notes

- The project uses a monorepo structure managed by Turborepo
- GraphQL schema is automatically generated for the frontend
- Local development uses SST's Live Lambda Development feature
