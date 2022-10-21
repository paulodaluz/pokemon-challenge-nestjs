import { Injectable } from "@nestjs/common";
import { Pokemon } from "../interfaces/pokemon.interface";
import { PokemonApiResponse, Stat } from "../interfaces/pokemonApiResponse.interface";

@Injectable()
export class PokemonBuilder {

  pokemonResponseBuilder(pokemonApiResponse: PokemonApiResponse): Pokemon {
    return {
      name: pokemonApiResponse.name,
      moves: pokemonApiResponse.moves.map((move) => move.move.name),
      type: this.getType(pokemonApiResponse),
      stats: {
        hp: this.getStats(pokemonApiResponse.stats, 'hp'),
        attack: this.getStats(pokemonApiResponse.stats, 'attack'),
        defense: this.getStats(pokemonApiResponse.stats, 'defense'),
        specialAttack: this.getStats(pokemonApiResponse.stats, 'special-attack'),
        specialDefense: this.getStats(pokemonApiResponse.stats, 'special-defense'),
        speed: this.getStats(pokemonApiResponse.stats, 'speed')
      }
    }
  }

  private getStats(pokemonStats: Stat[], statName: string): number {
    return pokemonStats.find((stat) => stat.stat.name === statName).base_stat;
  }

  private getType(pokemonApiResponse: PokemonApiResponse): string {
    if(pokemonApiResponse.types.length > 1) {
      return pokemonApiResponse.types[0].type.name + '/' + pokemonApiResponse.types[1].type.name;
    }

    return pokemonApiResponse.types[0].type.name;
  }
}
