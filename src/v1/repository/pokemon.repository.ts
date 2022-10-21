import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { PokemonApiResponse } from "../interfaces/pokemonApiResponse.interface";
import { ErrorUtils } from "../utils/error.utils";

@Injectable()
export class PokemonRepository {
  private className = 'PokemonRepository';

  constructor(private readonly httpService: HttpService) {}

  public async getPokemon(pokemon: string): Promise<PokemonApiResponse> {
    Logger.log(
      `pokemon = ${pokemon}`,
      `${this.className} - ${this.getPokemon.name}`,
    );

    const request = this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    const response = await lastValueFrom(request).catch((error: any) => {
      Logger.error(
        `pokemon = ${pokemon} - error = ${error}`,
        `${this.className} - ${this.getPokemon.name}`,
      );

      ErrorUtils.throwSpecificError(error.code);
    });

    return response.data;
  }
}
