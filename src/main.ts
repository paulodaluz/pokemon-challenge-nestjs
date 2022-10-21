import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PokemonModule } from './v1/pokemon.module';

async function bootstrap() {
  const port = process.env.PORT || 8081;
  const host = process.env.HOST || '0.0.0.0';

  const app = await NestFactory.create(PokemonModule);
  app.setGlobalPrefix(String(process.env.APPLICATION_PREFIX));

  await app.listen(port, host, () => Logger.log(`Server running on port ${port}`));
}
bootstrap();
