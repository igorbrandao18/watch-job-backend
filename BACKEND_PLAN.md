# Plano Backend - WatchMe (NestJS + TMDb)

## Checklist de Implementação

- [x] Instalar dependências principais e de desenvolvimento
- [x] Configurar Prisma e banco de dados (PostgreSQL via Docker Compose)
- [x] Gerar e configurar Prisma Client no padrão
- [x] Criar módulos: `auth`, `user`, `movies`, `observability`, `messaging`
- [x] Implementar autenticação JWT (registro, login, proteção de rotas)
- [x] Implementar CRUD de usuários
- [x] Integrar endpoints com TMDb usando `axios`
- [x] Implementar logs estruturados (Winston)
- [x] Instrumentar código com OpenTelemetry (Jaeger via Docker Compose)
- [x] Configurar mensageria (Kafka via Docker Compose)
- [x] Configurar Grafana para métricas (via Docker Compose)
- [x] Versionamento no Git
- [x] Scripts utilitários para infraestrutura (rebuild:infra)
- [x] Implementar endpoints de health check e métricas
- [x] Implementar testes unitários, integração e carga
- [x] Configurar deploy serverless/containerizado
- [x] Provisionar infraestrutura com IaC
- [x] Configurar CI/CD
- [x] Documentação da API

## 1. Objetivo
Backend simples em NestJS, com autenticação JWT, integração com a API do TMDb e persistência de usuários.

## 2. Funcionalidades
- Autenticação (login com JWT)
- Listar filmes populares (via TMDb)
- Detalhes de filme (via TMDb)
- Cadastro e persistência de usuários (Prisma + PostgreSQL)
- Endpoints CRUD para usuários

## 3. Requisitos Técnicos
- API RESTful utilizando NestJS (com Fastify)
- ORM para banco relacional (Prisma + PostgreSQL)
- Autenticação via JWT
- Logs estruturados
- Observabilidade: OpenTelemetry integrado a Jaeger, Grafana ou Datadog
- Implementação de métricas e tracing distribuído
- Testes unitários (Jest), integração e carga (K6)
- Deploy serverless (AWS Lambda) ou containerizado (ECS + Fargate)
- Infraestrutura como código (Terraform ou AWS CDK)
- CI/CD automatizado (GitHub Actions, GitLab CI/CD ou AWS CodePipeline)
- Arquitetura distribuída, baixo acoplamento e alta coesão
- Integração com mensageria (Kafka, SQS, etc) em trechos da aplicação

## 4. Dependências
- `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt` (autenticação)
- `bcrypt` (hash de senha)
- `axios` (HTTP requests para TMDb)
- `@prisma/client`, `prisma` (ORM)
- `@nestjs/terminus` (health checks)
- `@nestjs/otel`, `opentelemetry` (observabilidade)
- `winston` ou `pino` (logs estruturados)
- `kafkajs` ou `@nestjs/microservices` (mensageria)
- `jest` (testes unitários)
- `k6` (testes de carga)

## 5. Estrutura de Módulos
- `auth` (login, JWT)
- `user` (registro, busca, CRUD)
- `movies` (integração TMDb)
- `observability` (telemetria, métricas, logs)
- `messaging` (mensageria)

## 6. Endpoints
- `POST /auth/login` — Login do usuário, retorna JWT
- `POST /auth/register` — Cadastro de usuário
- `GET /movies/popular` — Lista de filmes populares (TMDb)
- `GET /movies/:id` — Detalhes de um filme (TMDb)
- `GET /users` — Listar usuários
- `GET /users/:id` — Detalhar usuário
- `PUT /users/:id` — Atualizar usuário
- `DELETE /users/:id` — Remover usuário
- Endpoints de health check e métricas

## 7. Configuração
- Variável de ambiente: `TMDB_API_KEY` para autenticação na API do TMDb
- Variável de ambiente: `JWT_SECRET` para assinar tokens
- Variáveis para banco, mensageria e observabilidade
- **Banco de dados PostgreSQL será executado via Docker Compose para facilitar o desenvolvimento local.**

### Exemplo de docker-compose.yml para PostgreSQL
```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: watchme
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```