# Pokémon Challenge — NestJS

Exercício de backend NestJS que consulta a PokéAPI e transforma a resposta em nome, movimentos, tipos e atributos de um Pokémon. O projeto preserva um desafio de aprendizado com funcionalidades ainda incompletas: cadastro persistente, treinador e cache não estão implementados.

[![Node.js](https://img.shields.io/badge/Node.js-16.18.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/) [![NestJS](https://img.shields.io/badge/NestJS-9.0.0-E0234E?logo=nestjs)](https://docs.nestjs.com/) [![Licença](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## 📋 Table of contents

- [✨ Features](#features)
- [🧪 Technologies](#technologies)
- [🛠️ Environment setup](#environment-setup)
- [🚀 Getting started](#getting-started)
- [🐋 Getting started with Docker](#docker)
- [🔌 API usage](#api-usage)
- [🗂️ Project structure](#project-structure)
- [✅ Testing and quality](#testing-and-quality)
- [🔎 Troubleshooting](#troubleshooting)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

<a id="features"></a>

## ✨ Features

- Consulta por nome à [PokéAPI](https://pokeapi.co/docs/v2).
- Transformação dos movimentos em lista de nomes.
- Concatenação de dois tipos com `/`, quando aplicável.
- Normalização dos atributos em `hp`, `attack`, `defense`, `specialAttack`, `specialDefense` e `speed`.
- Endpoint de cadastro que valida o corpo e retorna 204, **sem salvar os dados**.

O módulo de treinador está vazio. Redis/cache, persistência MongoDB, cadastro de treinador e Docker funcional continuam pendentes do desafio original.

<a id="technologies"></a>

## 🧪 Technologies

| Tecnologia | Versão declarada | Uso |
| --- | --- | --- |
| [Node.js](https://nodejs.org/) | `16.18.0` | Runtime em `engines.node` |
| [NestJS](https://docs.nestjs.com/) | `9.0.0` | API e módulos |
| [TypeScript](https://www.typescriptlang.org/docs/) | `4.7.4` | Compilação |
| [NestJS Axios](https://docs.nestjs.com/techniques/http-module) | `0.1.0` | Cliente HTTP da PokéAPI |
| [NestJS Config](https://docs.nestjs.com/techniques/configuration) | `2.2.0` | Leitura de `.env` |
| [class-validator](https://github.com/typestack/class-validator) | `0.13.2` | Corpo de cadastro |
| [RxJS](https://rxjs.dev/) | `7.2.0` | Conversão da resposta HTTP em Promise |

O `package.json` também declara `npm` (`^8.19.2`) como dependência. Não existe lockfile; as versões transitivas podem variar. Node 16.18.0 reproduz a configuração histórica, sem atualização de dependências nesta entrega.

<a id="environment-setup"></a>

## 🛠️ Environment setup

Requer Git, Node.js 16.18.0 com npm e acesso HTTPS à PokéAPI para a consulta funcional.

```bash
nvm install 16.18.0
nvm use 16.18.0
git clone https://github.com/paulodaluz/pokemon-challenge-nestjs.git
cd pokemon-challenge-nestjs
npm install
```

Use npm, conforme os scripts. Não existe `package-lock.json` ou `yarn.lock` para instalação congelada. Não há Husky, hooks ou script `prepare`; o Nest CLI é local.

O repositório já contém `.env`, carregado por `ConfigModule`. Não existe `.env.example`. Confira os valores locais:

```dotenv
PORT=8081
APPLICATION_PREFIX=poke-api/v1
POKEMON_API_URL=https://pokeapi.co/api/v2
```

| Variável | Finalidade |
| --- | --- |
| `PORT` | Escuta HTTP; fallback no código é `8081` |
| `APPLICATION_PREFIX` | Prefixo global; configure explicitamente, pois o código converte ausência em string `undefined` |
| `POKEMON_API_URL` | Base para a chamada `/pokemon/:name` |

Não é necessário MongoDB ou Redis para as funcionalidades implementadas. O cliente HTTP tem timeout de 1000 ms e até cinco redirecionamentos.

<a id="getting-started"></a>

## 🚀 Getting started

```bash
npm run start:dev
```

Com a configuração acima, a URL base é `http://localhost:8081/poke-api/v1`. Para build e execução compilada:

```bash
npm run build
npm run start:prod
```

O `prebuild` remove `dist/`; a compilação gera a saída usada por `node dist/main`. Encerre o processo com Ctrl+C. Para verificar o caminho HTTP sem depender da PokéAPI, envie um corpo inválido ao endpoint de cadastro com o header do exemplo abaixo; ele deve ser rejeitado pela validação, e nenhum registro é persistido.

<a id="docker"></a>

## 🐋 Getting started with Docker

`Dockerfile` e `.dockerignore` existem, mas estão **vazios**. Não há instruções de imagem, contexto adicional, portas ou serviços de Compose a documentar. Um `docker build` ainda não produz uma imagem executável a partir desses arquivos.

O Docker funcional permanece pendente do desafio. Essa constatação veio da inspeção; nenhum comando Docker foi executado nesta tarefa.

<a id="api-usage"></a>

## 🔌 API usage

| Método | Rota relativa ao prefixo | Comportamento |
| --- | --- | --- |
| GET | `/pokemon/:name` | Consulta e transforma dados da PokéAPI |
| POST | `/pokemon/create` | Valida o corpo e retorna 204 sem persistência |

O middleware exige um header `Authorization` que contenha o texto `Bearer`, mas **não valida assinatura, expiração ou identidade de um JWT**. O placeholder abaixo demonstra o comportamento do exercício; não representa autenticação segura.

```bash
curl http://localhost:8081/poke-api/v1/pokemon/pikachu   -H 'Authorization: Bearer TOKEN_FICTICIO'

# Verificação local da validação: corpo vazio deve gerar erro 400.
curl -i -X POST http://localhost:8081/poke-api/v1/pokemon/create   -H 'Content-Type: application/json'   -H 'Authorization: Bearer TOKEN_FICTICIO'   -d '{}'
```

O objeto retornado pelo GET contém `name`, `moves`, `type` e `stats`. Os nomes reais dos atributos compostos são camelCase (`specialAttack` e `specialDefense`), diferentes dos nomes snake_case descritos no enunciado original.

O POST exige `name` e `type` como strings, `moves` como array e `stats` como objeto. O middleware pode retornar 500 quando o header está ausente; sem a palavra `Bearer`, ele também captura o próprio erro e o converte em 500. O tratamento de erros externos usa `error.code`, que pode não corresponder a status HTTP.

<a id="project-structure"></a>

## 🗂️ Project structure

| Caminho | Responsabilidade |
| --- | --- |
| `src/main.ts` | Porta e prefixo HTTP |
| `src/v1/app.module.ts` | Configuração `.env` e módulos |
| `src/v1/pokemon/controller/` | Rotas GET e POST |
| `src/v1/pokemon/service/` | Coordenação da consulta e transformação |
| `src/v1/pokemon/repository/` | Requisição à PokéAPI |
| `src/v1/pokemon/builders/` | Normalização da resposta |
| `src/v1/pokemon/middleware/` | Verificação textual do header |
| `src/v1/pokemon/validators/` | Validação do corpo do POST |
| `src/v1/coach/` | Módulo de treinador ainda vazio |
| `test/unit/` | Um teste de utilitário e arquivos de teste vazios |

<a id="testing-and-quality"></a>

## ✅ Testing and quality

| Comando | Finalidade |
| --- | --- |
| `npm run build` | Compilação NestJS |
| `npm test -- --runInBand` | Jest com a configuração atual |
| `npm run test:watch` / `npm run test:cov` | Observação / cobertura |
| `npm run lint` | ESLint com correções automáticas |
| `npm run format` | Prettier com escrita |
| `npm run start:debug` / `npm run test:debug` | Depuração |

O Jest define `rootDir: src` e padrão `.spec.ts`; o teste implementado fica em `test/unit/utils/error.utils.spec.ts`, fora dessa raiz. Os demais arquivos de teste estão vazios e usam `.test.ts`. `test:e2e` referencia uma configuração ausente (`test/jest-e2e.json`). Esses scripts não comprovam cobertura.

Validação com **Node.js 16.18.0 e npm 8.19.2**: a instalação concluiu após uma falha transitória de rede e reinstalação limpa dos artefatos locais; `npm run build` passou. `npm test -- --runInBand` retornou “No tests found”, conforme a configuração de caminhos descrita acima. `npm run start:prod` iniciou a aplicação com `PORT=4101` temporário (o padrão continua 8081). Um POST com corpo vazio e header fictício retornou 400, confirmando a validação HTTP. O GET de `pikachu` retornou 500 após falha TLS `EPROTO / wrong version number` na chamada à PokéAPI pelo ambiente de rede da validação; a consulta externa funcional ficou sem comprovação. O processo foi encerrado ao concluir.

A captura real do VS Code ficou pendente pela indisponibilidade da instalação atual do usuário e da verificação dos temas.

<a id="troubleshooting"></a>

## 🔎 Troubleshooting

| Situação | Verificação |
| --- | --- |
| URL contém `undefined` ou retorna 404 | Defina `APPLICATION_PREFIX=poke-api/v1`. |
| 500 sem `Authorization` | O middleware acessa `.includes` no header; forneça o header fictício apenas para o exercício. |
| Consulta externa falha | Confira `POKEMON_API_URL`, acesso HTTPS e o timeout de 1000 ms. |
| POST retorna 204, mas não cria registro | Persistência não está implementada. |
| Jest não encontra testes | A configuração usa `src`, mas o teste implementado está em `test/`. |
| Docker não constrói | O Dockerfile está vazio. |

<a id="contributing"></a>

## 🤝 Contributing

Crie uma branch a partir de `main`, mantenha as instruções consistentes com o código e abra um pull request descrevendo a alteração e suas verificações. Não versione credenciais, arquivos de ambiente privados, dependências instaladas ou artefatos de execução. Separe a implementação das pendências do desafio (cache, persistência, autenticação e testes) de alterações puramente documentais.

<a id="license"></a>

## 📜 License

Este projeto utiliza a [licença MIT](LICENSE), atribuída a Paulo da Luz em 2022. O texto e os avisos existentes foram preservados.

---

<p align="center">Made with 💜 by <a href="https://github.com/paulodaluz">Paulo da Luz</a></p>
