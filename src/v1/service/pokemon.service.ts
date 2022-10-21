import { Injectable, Logger } from '@nestjs/common';
import { PokemonBuilder } from '../builders/pokemon.builder';
import { PokemonResponse } from '../interfaces/pokemon.interface';
import { PokemonRepository } from '../repository/pokemon.repository';

@Injectable()
export class PokemonService {
  private className = 'PokemonService';

  constructor(
    private readonly pokemonRepository: PokemonRepository,
    private readonly pokemonBuilder: PokemonBuilder
    ) {}

  async getPokemon(pokemon: string): Promise<PokemonResponse> {
    Logger.log(
      `pokemon = ${pokemon}`,
      `${this.className} - ${this.getPokemon.name}`,
    );

    const pokemonApiResponse = await this.pokemonRepository.getPokemon(pokemon);

    return this.pokemonBuilder.pokemonResponseBuilder(pokemonApiResponse);
  }
}
