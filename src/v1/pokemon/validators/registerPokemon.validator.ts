import { IsString, IsArray, IsObject } from 'class-validator';
import { Pokemon, Stats } from '../interfaces/pokemon.interface';

export class RegisterPokemonValidator implements Pokemon {
  @IsString()
  name: string;

  @IsArray()
  moves: Array<string>;

  @IsString()
  type: string;

  @IsObject()
  stats: Stats;
}
