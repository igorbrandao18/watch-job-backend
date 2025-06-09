import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

const BASE_URL = 'http://localhost:3000';
const EMAIL = `k6user${Math.floor(Math.random() * 100000)}@test.com`;
const PASSWORD = '123456';
const NAME = 'K6 User';
const MOVIE_ID = 550; // Exemplo: Fight Club

export default function () {
  // 1. Registro
  const registerRes = http.post(`${BASE_URL}/auth/register`, JSON.stringify({
    email: EMAIL,
    password: PASSWORD,
    name: NAME,
  }), { headers: { 'Content-Type': 'application/json' } });
  check(registerRes, { 'register status 201 or 409': (r) => r.status === 201 || r.status === 409 });

  // 2. Login
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: EMAIL,
    password: PASSWORD,
  }), { headers: { 'Content-Type': 'application/json' } });
  check(loginRes, { 'login status 201': (r) => r.status === 201 });
  const token = loginRes.json('access_token');
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  // 3. Acessar /users (GET)
  const usersRes = http.get(`${BASE_URL}/users`, authHeaders);
  check(usersRes, { 'users status 200': (r) => r.status === 200 });

  // 4. Buscar usuário recém-criado (GET /users/:id)
  const userId = usersRes.json().find(u => u.email === EMAIL)?.id;
  if (userId) {
    const userDetailRes = http.get(`${BASE_URL}/users/${userId}`, authHeaders);
    check(userDetailRes, { 'user detail 200': (r) => r.status === 200 });

    // 5. Atualizar usuário (PUT /users/:id)
    const updateRes = http.put(`${BASE_URL}/users/${userId}`, JSON.stringify({ name: 'K6 User Updated' }), {
      ...authHeaders,
      headers: { ...authHeaders.headers, 'Content-Type': 'application/json' },
    });
    check(updateRes, { 'user update 200': (r) => r.status === 200 });

    // 6. Deletar usuário (DELETE /users/:id)
    const deleteRes = http.del(`${BASE_URL}/users/${userId}`, null, authHeaders);
    check(deleteRes, { 'user delete 200': (r) => r.status === 200 });
  }

  // 7. Acessar /movies/popular
  const moviesRes = http.get(`${BASE_URL}/movies/popular`, authHeaders);
  check(moviesRes, { 'movies status 200': (r) => r.status === 200 });

  // 8. Detalhe de filme
  const movieDetailRes = http.get(`${BASE_URL}/movies/${MOVIE_ID}`, authHeaders);
  check(movieDetailRes, { 'movie detail 200': (r) => r.status === 200 });

  // 9. Teste de autenticação inválida
  const invalidTokenRes = http.get(`${BASE_URL}/users`, { headers: { Authorization: 'Bearer invalidtoken' } });
  check(invalidTokenRes, { 'invalid token 401': (r) => r.status === 401 });
  const noTokenRes = http.get(`${BASE_URL}/users`);
  check(noTokenRes, { 'no token 401': (r) => r.status === 401 });

  // 10. Health check
  const healthRes = http.get(`${BASE_URL}/health`);
  check(healthRes, { 'health 200': (r) => r.status === 200 });

  sleep(1);
} 