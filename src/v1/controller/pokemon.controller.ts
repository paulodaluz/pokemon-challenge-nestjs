import { Controller, Get, Param } from '@nestjs/common';
import { PokemonResponse } from '../interfaces/pokemon.interface';
import { PokemonService } from '../service/pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':name')
  async getPokemon(@Param('name') pokemonName: string): Promise<PokemonResponse> {

    return this.pokemonService.getPokemon(pokemonName);
  }
}
