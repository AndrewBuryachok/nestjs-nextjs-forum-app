import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('App', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let cards: number[];

  describe('Users', () => {
    it('GET /users/all/select', () => {
      return request(app.getHttpServer())
        .get('/users/all/select')
        .expect((res) => expect(res.body.length).toBeGreaterThan(0));
    });
  });

  describe('Cards', () => {
    it('POST /cards', () => {
      return request(app.getHttpServer())
        .post('/cards')
        .send({ name: 'Card' })
        .expect(201);
    });

    it('POST /cards/all', () => {
      return request(app.getHttpServer())
        .post('/cards/all')
        .send({ userId: 1, name: 'Card' })
        .expect(201);
    });

    it('GET /cards/my', () => {
      return request(app.getHttpServer())
        .get('/cards/my')
        .expect((res) => expect(res.body.data.length).toBeGreaterThan(0))
        .then((res) => (cards = res.body.data.map((card) => card.id)));
    });

    it('GET /cards/all', () => {
      return request(app.getHttpServer())
        .get('/cards/all')
        .expect((res) => expect(res.body.data.length).toBeGreaterThan(0));
    });

    it('GET /cards/my/select', () => {
      return request(app.getHttpServer())
        .get('/cards/my/select')
        .expect((res) => expect(res.body.length).toBeGreaterThan(0));
    });

    it('GET /cards/:userId/select', () => {
      return request(app.getHttpServer())
        .get('/cards/1/select')
        .expect((res) => expect(res.body.length).toBeGreaterThan(0));
    });

    it('GET /cards/:userId/select-with-balance', () => {
      return request(app.getHttpServer())
        .get('/cards/1/select-with-balance')
        .expect((res) => expect(res.body.length).toBeGreaterThan(0));
    });
  });

  describe('Transactions', () => {
    it('POST /transactions/deposit', () => {
      return request(app.getHttpServer())
        .post('/transactions/deposit')
        .send({ cardId: cards[0], sum: 100 })
        .expect(201);
    });

    it('POST /transactions/withdraw', () => {
      return request(app.getHttpServer())
        .post('/transactions/withdraw')
        .send({ cardId: cards[0], sum: 10 })
        .expect(201);
    });

    it('GET /transactions/my', () => {
      return request(app.getHttpServer())
        .get('/transactions/my')
        .expect((res) => expect(res.body.data.length).toBeGreaterThan(0));
    });

    it('GET /transactions/all', () => {
      return request(app.getHttpServer())
        .get('/transactions/all')
        .expect((res) => expect(res.body.data.length).toBeGreaterThan(0));
    });
  });
});
