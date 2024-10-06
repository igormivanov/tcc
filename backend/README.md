 <h1 align="center">Api med</h1>

<p align="center">
 <a href="#sobre-o-projeto">Sobre o projeto</a> |
 <a href="#rotas">Rotas</a> |
 <a href="#tecnologias">Tecnologias</a> |
 <a href="#pré-requisitos">Pré-requisitos</a> |
 <a href="#configuração">Configuração</a> 
</p>

## Sobre o projeto
Projeto desenvolvido em Node com TypeScript, nele é possível fazer operações simples com usuários e plantões médicos, possibilitando simular o controle e adesão médicos aos plantões.

## Rotas
#### Usuários
  ```
  /register
  /authenticate
  /users
  ```
#### Plantões médicos
  ```
  /medical-duties (GET & POST)
  /med8cal-duties/medicalDutyId/associate
  ```

## Tecnologias
- Node
- TypeScript
- Fastify
- Autenticação com token JWT
- Prisma
- Vitest 
- Docker

## Pré-requisitos

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com)
* [NodeJS](https://nodejs.org/en/)
* [Docker - Opcional](https://www.docker.com/)

## Configuração
Clone do Projeto:
```
https://github.com/igormivanov/node-api-med.git
```
Instale as dependências
```
npm install ou yarn install.
```
Configure as variáveis de ambiente utilizando como exemplo o arquivo .env.example.

Conexão com o banco de dados: utilizar o postgres instalado na própria máquina ou através do Docker.
```
docker-compose up
```



## Comandos
Executar a aplicação
```
npm run start:dev
```
Executar comando para testes
```
npm run test
```


