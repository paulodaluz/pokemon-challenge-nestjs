import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PokemonBuilder } from './builders/pokemon.builder';
import { PokemonController } from './controller/pokemon.controller';
import { TokenValidation } from './middleware/jwt.middleware';
import { PokemonRepository } from './repository/pokemon.repository';
import { PokemonService } from './service/pokemon.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 1000,
      maxRedirects: 5,
    }),
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonBuilder, PokemonRepository],
})

export class PokemonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenValidation).forRoutes(PokemonController);
  }
}
