import { Body, Controller, Get, HttpCode, Param, Post, ValidationPipe } from '@nestjs/common';
import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonService } from "../service/pokemon.service";
import { RegisterPokemonValidator } from '../validators/registerPokemon.validator';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':name')
  async getPokemon(@Param('name') pokemonName: string): Promise<Pokemon> {

    return this.pokemonService.getPokemon(pokemonName);
  }

  @HttpCode(204)
  @Post('create')
  async createPokemon(@Body(new ValidationPipe()) body: RegisterPokemonValidator): Promise<void> {

    return;
  }
}
