# Desafio PokeApi

Bem vindo ao desafio PokeApi.

# 💻 Projeto
Este desafio consiste na implementação de um Backend em **NodeJS com TypeScript e NestJS**. Você deverá consumir a api externa do PokéAPI e retornar alguns dados tratados do pokemon.

## 🚧 Requisitos
- [x] O backend deverá ter uma rota GET onde receberá por path parameter o nome do pokemon.
- [ ] O backend deverá consumir a api PokéAPI (exemplo de request da api abaixo).
- [x] O backend deverá trazer dados no formato correto (rota GET na sessão Resposta Esperada, um pouco mais a baixo na descrição do desafio).
- [ ] O backend deverá contar com a cobertura de testes unitários.
- [x] Deverá estar tipado corretamente.
- [ ] Deverá retornar erros tratados.
```
    Ex: Status 404, Nenhum pokemon encontrado.
```
- [ ] Implementar uma camada de cache com o redis para que não seja necessário realizar requests para a PokéAPI a todo momento. 
- [ ] Criar um docker file para rodar o projeto.


## 🎉 Bônus:
- [ ] Criar uma rota POST para criar um treinador, passando o nome de seus pokemons.
  - Rota POST deverá salvar no banco de dados MongoDB.
  - Criar uma rota GET para retornar um treinador do banco de dados com seus pokemons e algumas informações.

## 🖨️ Exemplo de request da api PokéAPI
`curl --location --request GET 'https://pokeapi.co/api/v2/pokemon/pikachu'`

**Cuidado que o types (tipo do pokemon) pode existir pokemons com mais de um tipo, como o "slowpoke". Neste caso concatene em uma string os tipos.**

## ✅ Resposta Esperada
GET http://localhost:8081/poke-api/v1/pokemon/:pokemonName

```javascript
{
	name: "Pikachu",
	moves: ["mega-punch", "toxic", ...],
	type: "electric",
	stats: {
		hp: 50,
		attack: 20,
		defense: 10,
		special_attack: 50,
		special_defense: 50,
		speed: 90
	}
} 
```


## 📖 Dicas
- Usem e abusem de pesquisa, utilizem o bom e velho Google.
- Procurem ajuda de professores, amigos, para tirar dúvidas, isso também é uma skill.

## ⏳ Você tem 48 horas
---

<p align="center">Boa Sorte!</p>

