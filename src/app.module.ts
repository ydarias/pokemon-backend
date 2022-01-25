import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InMemoryPokemonRepository } from './modules/pokemon-catalog/infra/in-memory-pokemon-repository';
import { PokemonCatalog } from './modules/pokemon-catalog/domain/pokemon-catalog';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'PokemonCatalog',
      useFactory: () => {
        const pokemonRepository = new InMemoryPokemonRepository();
        return new PokemonCatalog(pokemonRepository);
      },
    },
  ],
})
export class AppModule {}
