import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    HttpModule.register({
      timeout: 1000,
      maxRedirects: 5,
    }),
    PokemonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
