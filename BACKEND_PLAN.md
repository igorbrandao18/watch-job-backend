# Plano Backend - WatchMe (NestJS + TMDb)

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

## 8. Passos de Implementação
1. Instalar dependências
2. Configurar Prisma e banco de dados
3. Criar módulos: `auth`, `user`, `movies`, `observability`, `messaging`
4. Implementar autenticação JWT
5. Integrar endpoints com TMDb usando `axios`
6. Implementar logs estruturados
7. Instrumentar código com OpenTelemetry
8. Implementar testes unitários, integração e carga
9. Configurar deploy serverless/containerizado
10. Provisionar infraestrutura com IaC
11. Configurar CI/CD
12. Documentação da API

## 9. Observações
- Código limpo, modular e documentado
- Tratamento de erros essenciais
- Testes unitários, integração e carga
- Observabilidade e rastreabilidade
- Pronto para produção e escalabilidade

--- 