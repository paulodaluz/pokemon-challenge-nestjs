import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokemonBuilder } from './builders/pokemon.builder';
import { PokemonController } from './controller/pokemon.controller';
import { PokemonRepository } from './repository/pokemon.repository';
import { PokemonService } from './service/pokemon.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    HttpModule.register({
      timeout: 1000,
      maxRedirects: 5,
    }),
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonBuilder, PokemonRepository],
})
export class PokemonModule {}
