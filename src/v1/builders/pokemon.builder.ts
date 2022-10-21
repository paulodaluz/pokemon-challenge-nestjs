import { Injectable } from "@nestjs/common";
import { PokemonResponse } from "../interfaces/pokemon.interface";
import { PokemonApiResponse } from "../interfaces/pokemonApiResponse.interface";

@Injectable()
export class PokemonBuilder {

  pokemonResponseBuilder(pokemonApiResponse: PokemonApiResponse): PokemonResponse {
    const pokemon: any = {stats: {}};

    pokemon.name = pokemonApiResponse.name;
    pokemon.moves = pokemonApiResponse.moves.map((move) => move.move.name);
    pokemon.type = pokemonApiResponse.types.map((type) => type.type.name);

    pokemon.stats.hp = this.getStats(pokemonApiResponse.stats, 'hp');
    pokemon.stats.attack = this.getStats(pokemonApiResponse.stats, 'attack');
    pokemon.stats.defense = this.getStats(pokemonApiResponse.stats, 'defense');
    pokemon.stats.specialAttack = this.getStats(pokemonApiResponse.stats, 'special-attack');
    pokemon.stats.specialDefense = this.getStats(pokemonApiResponse.stats, 'special-defense');
    pokemon.stats.speed = this.getStats(pokemonApiResponse.stats, 'speed');

    return pokemon as PokemonResponse;
  }

  private getStats(pokemonStats: any, statName: string): number {
    return pokemonStats.find((stat: any) => stat.stat.name === statName).base_stat;
  }
}
