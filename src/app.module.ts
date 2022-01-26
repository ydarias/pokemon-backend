import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PokemonCatalog } from './modules/pokemon-catalog/domain/pokemon-catalog';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import {
  AttackEntity,
  EvolutionEntity,
  EvolutionRequirementsEntity,
  MeasurementEntity,
  PokemonEntity,
  TypeEntity,
} from './modules/pokemon-catalog/infra/pokemon.entity';
import { DbPokemonRepository } from './modules/pokemon-catalog/infra/db-pokemon-repository';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'default_database',
      // keepConnectionAlive: true,
      synchronize: true,
      dropSchema: true,
      entities: [
        MeasurementEntity,
        EvolutionRequirementsEntity,
        PokemonEntity,
        TypeEntity,
        AttackEntity,
        EvolutionEntity,
      ],
    }),
    TypeOrmModule.forFeature([PokemonEntity]),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'PokemonCatalog',
      useFactory: (repository: Repository<PokemonEntity>) => {
        const pokemonRepository = new DbPokemonRepository(repository);
        return new PokemonCatalog(pokemonRepository);
      },
      inject: [getRepositoryToken(PokemonEntity)],
    },
  ],
})
export class AppModule {}
