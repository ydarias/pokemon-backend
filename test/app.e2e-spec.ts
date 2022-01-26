import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MockedPokemons } from '../src/utils/tests/pokemons';
import { testDatasetSeed } from '../seeds/test-pokemons.seed';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  jest.setTimeout(15000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await testDatasetSeed();
  });

  it('should support requesting a pokemon by its ID', async () => {
    const response = await request(app.getHttpServer()).get('/pokemons/025').expect(200);

    expect(response.body).toStrictEqual(MockedPokemons.pikachuResponse());
  });

  it('should support requesting a pokemon by its name', async () => {
    const response = await request(app.getHttpServer()).get('/pokemons/name/charizard').expect(200);

    expect(response.body).toStrictEqual(MockedPokemons.charizardResponse());
  });

  it('should support requesting a page of pokemons (default order is by ID)', async () => {
    const response = await request(app.getHttpServer()).get('/pokemons?page=2&size=3').expect(200);

    // Used snapshot after checking the data is valid, because the order of some inner collections changes with the
    // DB query
    expect(response.body).toMatchSnapshot();
  });
});
