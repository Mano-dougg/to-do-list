# To-Do List API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 1. Tecnologia escolhida

Este projeto foi desenvolvido utilizando o framework NestJS, uma estrutura progressiva para construir aplicações server-side eficientes e escaláveis em Node.js.

**Justificativa da escolha:**
- Framework estruturado com arquitetura modular baseada em decoradores
- Suporte nativo a TypeScript, proporcionando tipagem estática e melhor manutenção de código
- Injeção de dependências integrada para melhor organização e testabilidade
- Documentação robusta com Swagger integrado
- Fácil implementação de validações com class-validator e class-transformer
- Boa integração com diferentes ORMs, incluindo TypeORM e Prisma

## 2. Setup do projeto

```bash
# Instalar dependências
$ npm install

# Iniciar banco de dados com Docker
$ docker-compose up -d

# Configurar variáveis de ambiente
# Crie um arquivo .env na raiz do projeto com base no .env.example:
# DB_HOST=localhost
# DB_USER=postgres
# DB_PASSWORD=postgres
# DB_NAME=todo_db
# JWTSECRET=seu_segredo_jwt
```

## 3. Como executar

```bash
# Desenvolvimento
$ npm run start

# Modo watch (desenvolvimento)
$ npm run start:dev

# Modo produção
$ npm run start:prod

# Executar migrações do banco de dados
$ npm run migration:run
```

## 4. Como testar

### Testes automatizados
```bash
# Testes unitários
$ npm run test

# Testes e2e
$ npm run test:e2e

# Verificar cobertura de testes
$ npm run test:cov
```

### Testes via Swagger
Após iniciar a aplicação, acesse a documentação Swagger em:
```
http://localhost:3000/api
```
Na interface do Swagger, você pode:
- Visualizar todos os endpoints disponíveis
- Testar as operações diretamente pelo navegador
- Autenticar-se usando o botão "Authorize" com seu token JWT
- Verificar os esquemas de dados e requisitos de cada rota

### Collection Postman/Insomnia
Uma collection para testes também está disponível no diretório `/docs/api-collection.json`. Importe este arquivo no Postman ou Insomnia para testar a API.

Exemplos de requisições cURL:
```bash
# Criar nova tarefa
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_token" \
  -d '{"title": "Nova tarefa", "description": "Descrição da tarefa", "dueDate": "2025-06-10"}'

# Listar tarefas
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer seu_token"
```

## 5. Decisões técnicas

- **Arquitetura em camadas**: Separação clara entre controladores, serviços e repositórios
- **Docker para ambiente de desenvolvimento**: Facilita a configuração do banco de dados e garante consistência entre ambientes
- **Autenticação JWT**: Implementação de autenticação baseada em tokens JWT
- **Validação de dados**: Uso de DTOs com class-validator para garantir a integridade dos dados
- **Tratamento de exceções**: Centralização do tratamento de erros com filtros de exceção
- **Documentação com Swagger**: Interface interativa para testar e documentar a API
- **Soft Delete**: Exclusão lógica de registros para manter histórico
- **Migrations**: Utilização de migrations para controle do esquema do banco de dados

## 6. Melhorias futuras

Com mais tempo, as seguintes melhorias poderiam ser implementadas:

- Sistema de notificação para tarefas próximas do vencimento
- Dashboard com métricas de produtividade
- Melhor cobertura de testes (unitários e e2e)
- Implementação de CI/CD para deploy automático


## Estrutura do repositório

```
src/
├── auth/               # Módulo de autenticação
├── config/             # Configurações da aplicação
├── tasks/              # Módulo de tarefas
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # Entidades
│   ├── repositories/   # Repositórios
│   ├── tasks.service.ts
│   └── tasks.controller.ts
├── users/              # Módulo de usuários
├── common/             # Utilitários, filtros, guards
└── main.ts             # Ponto de entrada da aplicação
docker-compose.yml      # Configuração do Docker para o banco de dados
```

## Recursos originais do NestJS

Para mais informações sobre o NestJS:

- [Documentação oficial](https://docs.nestjs.com)
- [Discord](https://discord.gg/G7Qnnhy)
- [Cursos](https://courses.nestjs.com)

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
