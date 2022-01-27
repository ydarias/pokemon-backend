import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MockedPokemons } from '../src/utils/tests/pokemons';
import { loadPokemonsData } from '../seeds/load-pokemons';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  jest.setTimeout(15000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await loadPokemonsData();
  });

  it('should support requesting a pokemon by its ID', async () => {
    const response = await request(app.getHttpServer()).get('/pokemons/025').expect(200);

    expect(response.body).toMatchObject(MockedPokemons.pikachuResponse());
  });

  it('should support requesting a pokemon by its name', async () => {
    const response = await request(app.getHttpServer()).get('/pokemons/name/charizard').expect(200);

    expect(response.body).toMatchObject(MockedPokemons.charizardResponse());
  });

  it('should support requesting a page of pokemons (default order is by ID)', async () => {
    const response = await request(app.getHttpServer()).get('/pokemons?limit=3&skip=3').expect(200);

    expect(response.body).toMatchSnapshot();
  });

  it('should support requesting a page of pokemons filtered by type (default order is by ID)', async () => {
    const response = await request(app.getHttpServer()).get('/pokemons?limit=3&type=Fire').expect(200);

    expect(response.body).toMatchSnapshot();
  });
});
