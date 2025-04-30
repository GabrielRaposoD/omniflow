# OmniFlow - Automated Workflow Orchestration Platform

**OmniFlow** is a sophisticated, multi-tenant SaaS platform designed for building, managing, and automating workflows across various services such as Slack, Email, Webhooks, and more. It provides a user-friendly visual interface, real-time execution tracking, robust integration support, and powerful scheduling capabilities.

---

## 🌟 Key Features

- **Visual Workflow Builder:** Drag-and-drop interface for creating automated workflows.
- **Real-time Monitoring:** Track workflow execution through detailed logs and statuses.
- **Integrations:** Seamlessly connect with Slack, Email, HTTP APIs, Google Sheets, and GitHub.
- **Scheduling:** Automated triggers and cron-based scheduling for workflow execution.
- **Multi-tenancy:** Secure data isolation for multiple tenants.
- **Advanced Authentication:** JWT-based authentication with OAuth and Role-Based Access Control (RBAC).
- **Observability:** Comprehensive logging, metrics, and alerting.

---

## 🛠 Tech Stack

**Frontend:**

- Next.js 14
- TypeScript
- Tailwind CSS
- React Server Components
- WebSocket (Socket.IO)

**Backend:**

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT & OAuth Authentication
- RESTful APIs

**Infrastructure:**

- Docker & Docker Compose
- Turborepo
- pnpm
- GitHub Actions (CI/CD)

---

## 📂 Project Structure

```bash
omniflow/
├── apps/
│   ├── api/              # NestJS API application
│   │   ├── src/
│   │   ├── test/
│   │   └── Dockerfile
│   └── web/              # Next.js web application
│       ├── app/
│       ├── public/
│       └── Dockerfile
├── packages/
│   ├── api/              # Shared API types and utilities
│   ├── eslint-config/    # ESLint configurations
│   ├── jest-config/      # Jest configurations
│   ├── tsconfig/         # TypeScript configurations
│   └── ui/               # Shared UI components
├── docker-compose.yml    # Docker Compose configuration
└── package.json          # Root package.json
```

---

## 🚀 Getting Started

### Requirements

- Docker
- Node.js (18+)
- pnpm (9+)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/omniflow.git
cd omniflow

# Install dependencies
pnpm install

# Start development environment
docker-compose -f docker-compose.dev.yml up

# Or start production environment
docker-compose up
```

The applications will be available at:

- Web: http://localhost:3000
- API: http://localhost:3001
- Database: localhost:5432

---

## 🔐 Authentication & Security

- JWT-based authentication
- OAuth2 integration (Google, GitHub)
- RBAC for admin and user-level permissions

---

## 📦 Deployment

- Docker-based deployment
- Environment-based configuration

---

## 📊 Monitoring & Logging

---

## 🧩 Integrations Supported

- Slack
- Email
- GitHub
- Google Sheets
- Webhooks / HTTP APIs

---

## 📖 Documentation

- API documentation available with Swagger/OpenAPI
- Detailed architecture diagrams and additional guidelines included in `/docs`

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Please ensure that your code adheres to the existing style guidelines and include tests where applicable.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
