# FlowTMS - Transportation Management System

A  Transportation Management System (TMS) POC built with modern full-stack technologies.

## Tech Stack

### Backend
- Node.js with NestJS
- GraphQL (Apollo Server)
- TypeScript
- JWT Authentication
- In-memory data store with 50 seeded shipments
- DataLoader for optimized queries

### Frontend
- React 18
- TypeScript
- Vite
- Apollo Client
- React Router
- CSS Modules
- Responsive design

## Features

- JWT-based authentication with role-based access control (Admin/Employee)
- Shipment management with CRUD operations
- Grid and Tile view modes
- Advanced filtering by status, carrier, and pickup location
- Column sorting
- Pagination
- Detailed shipment view modal
- Premium UI with smooth transitions
- Optimized GraphQL queries with DataLoader

## Project Structure

```
flowtms/
├── backend/              # NestJS GraphQL API
│   ├── src/
│   │   ├── auth/        # Authentication module
│   │   ├── shipments/   # Shipments module
│   │   ├── common/      # Guards and decorators
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── features/    # Feature modules
│   │   ├── hooks/       # Custom React hooks
│   │   ├── graphql/     # GraphQL client and queries
│   │   ├── types/       # TypeScript types
│   │   ├── styles/      # Global styles
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── shared/              # Shared types
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

The GraphQL API will be available at `http://localhost:4000/graphql`

### Frontend Setup

1. Navigate to the frontend directory:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

The application will be available at `http://localhost:5173`

## Demo Credentials

### Admin Account
- Username: `admin`
- Password: `admin123`
- Permissions: Full access (create, read, update, delete)

### Employee Account
- Username: `employee`
- Password: `employee123`
- Permissions: Read-only access

## GraphQL API

### Authentication

**Login**
```graphql
mutation {
  login(username: "admin", password: "admin123")
}
```

### Queries

**Get Shipments (with pagination, sorting, filtering)**
```graphql
query {
  shipments(
    page: 1
    limit: 10
    sortField: "pickupDate"
    sortDirection: "DESC"
    status: "IN_TRANSIT"
    carrierName: "FedEx"
    pickupLocation: "New York"
  )
}
```

**Get Single Shipment**
```graphql
query {
  shipment(id: "1")
}
```

### Mutations (Admin Only)

**Add Shipment**
```graphql
mutation {
  addShipment(input: "{ ... }")
}
```

**Update Shipment**
```graphql
mutation {
  updateShipment(input: "{ ... }")
}
```

**Delete Shipment**
```graphql
mutation {
  deleteShipment(id: "1")
}
```

## Features by Role

### Admin
- View all shipments
- Create new shipments
- Edit existing shipments
- Delete shipments
- Access all filtering and sorting options
- Toggle between grid and tile views

### Employee
- View all shipments
- Access filtering and sorting options
- Toggle between grid and tile views
- View detailed shipment information

## Architecture Highlights

### Backend
- Clean separation of concerns with NestJS modules
- JWT authentication with Passport strategy
- Role-based guards for authorization
- DataLoader pattern for optimized batch loading
- GraphQL resolvers with type safety
- In-memory data store with 50 pre-seeded shipments

### Frontend
- Feature-based folder structure
- Custom hooks for data fetching and authentication
- Memoized components for optimal rendering
- Context API for global auth state
- Apollo Client for GraphQL state management
- CSS Modules for scoped styling
- Protected routes with authentication guards

## Development

### Backend Commands
```powershell
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

### Frontend Commands
```powershell
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Performance Optimizations

- React component memoization
- DataLoader for batch GraphQL queries
- Efficient pagination with offset-based approach
- Debounced filter inputs
- Optimized re-renders with proper React hooks
- CSS transitions for smooth UI interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
