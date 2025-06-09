# WatchMe Backend

Backend para desafio técnico, desenvolvido em NestJS, com autenticação JWT, integração com TMDb, mensageria, observabilidade, testes e infraestrutura como código.

## Visão Geral
- **Stack:** NestJS + Fastify, Prisma/PostgreSQL, JWT, integração TMDb, Kafka, OpenTelemetry, Jaeger, Grafana
- **Infraestrutura:** Docker Compose (dev), AWS CDK (prod), CI/CD (GitHub Actions)
- **Testes:** Unitários (Jest), integração (Supertest), carga (K6)

## Requisitos
- Node.js 20+
- pnpm
- Docker e Docker Compose (para dev)
- AWS CLI (para deploy)

## Setup Local
```sh
pnpm install
cp .env.example .env # configure as variáveis
# Suba os serviços necessários
pnpm run infra:up # ou docker-compose up -d
# Gere o Prisma Client
pnpm exec prisma generate
# Rode as migrations
pnpm exec prisma migrate deploy
# Rode a aplicação
pnpm run start:dev
```

## Endpoints da API

### Autenticação
- `POST /auth/register` — Cadastro de usuário
- `POST /auth/login` — Login, retorna JWT

### Usuários (JWT)
- `GET /users` — Listar usuários
- `GET /users/:id` — Detalhar usuário
- `PUT /users/:id` — Atualizar usuário
- `DELETE /users/:id` — Remover usuário

### Filmes (JWT)
- `GET /movies/popular` — Lista de filmes populares (TMDb)
- `GET /movies/:id` — Detalhes de um filme (TMDb)

### Observabilidade
- `GET /health` — Health check
- `GET /metrics` — Métricas Prometheus

## Exemplos de Uso

### Registro
```sh
curl -X POST http://localhost:3000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@email.com","password":"123456","name":"João"}'
```

### Login
```sh
curl -X POST http://localhost:3000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@email.com","password":"123456"}'
```

### Listar filmes populares
```sh
curl -H "Authorization: Bearer <token>" http://localhost:3000/movies/popular
```

## Variáveis de Ambiente
- `DATABASE_URL` — String de conexão do PostgreSQL
- `JWT_SECRET` — Segredo para assinar tokens JWT
- `TMDB_API_KEY` — Chave da API do TMDb
- Outras: variáveis para Kafka, Jaeger, etc

## Arquitetura
- **NestJS**: Modular, baixo acoplamento, alta coesão
- **Prisma**: ORM para PostgreSQL
- **Kafka**: Mensageria
- **OpenTelemetry/Jaeger/Grafana**: Observabilidade
- **Docker Compose**: Dev local
- **AWS CDK**: Provisionamento de ECR, ECS, Fargate, VPC
- **CI/CD**: GitHub Actions (build, test, push Docker)

## Testes
- `pnpm run test` — Unitários
- `pnpm run test:e2e` — Integração
- `k6 run k6/full-flow.js` — Carga

## Deploy
- Build da imagem Docker: `pnpm run build && docker build -t watchme-backend .`
- Push para ECR: `docker push <ECR_REPOSITORY>:latest`
- Provisionamento AWS: `cd infra && cdk deploy`

## Documentação
- Swagger disponível em `/api` após rodar o projeto

---

Desenvolvido para o desafio técnico. Dúvidas? Consulte o código ou abra uma issue.
