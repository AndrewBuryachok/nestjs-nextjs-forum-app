import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { Tokens } from '../src/common/interfaces';

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

  let admin: Tokens;
  let user: Tokens;
  let cards: number[];
  let transactions: number[];

  describe('Auth', () => {
    it('POST /auth/register', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({ nick: 'Admin', password: 'P@ssw0rd' })
        .expect(201)
        .then((res) => (admin = res.body));
    });

    it('POST /auth/register', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({ nick: 'User', password: 'P@ssw0rd' })
        .expect(201)
        .then((res) => (user = res.body));
    });

    it('POST /auth/logout', () => {
      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', `Bearer ${user.access}`)
        .expect(201);
    });

    it('POST /auth/login', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ nick: 'User', password: 'P@ssw0rd' })
        .expect(201)
        .then((res) => (user = res.body));
    });

    it('POST /auth/refresh', () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .set('Authorization', `Bearer ${user.refresh}`)
        .expect(201)
        .then((res) => (user = res.body));
    });
  });

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
        .set('Authorization', `Bearer ${user.access}`)
        .send({ name: 'Card' })
        .expect(201);
    });

    it('POST /cards/all', () => {
      return request(app.getHttpServer())
        .post('/cards/all')
        .set('Authorization', `Bearer ${user.access}`)
        .send({ userId: user.user.id, name: 'Card' })
        .expect(201);
    });

    it('GET /cards/my', () => {
      return request(app.getHttpServer())
        .get('/cards/my')
        .set('Authorization', `Bearer ${user.access}`)
        .expect((res) => expect(res.body.data.length).toBeGreaterThan(0))
        .then((res) => (cards = res.body.data.map((card) => card.id)));
    });

    it('GET /cards/all', () => {
      return request(app.getHttpServer())
        .get('/cards/all')
        .set('Authorization', `Bearer ${user.access}`)
        .expect((res) => expect(res.body.data.length).toBeGreaterThan(0));
    });

    it('GET /cards/my/select', () => {
      return request(app.getHttpServer())
        .get('/cards/my/select')
        .set('Authorization', `Bearer ${user.access}`)
        .expect((res) => expect(res.body.length).toBeGreaterThan(0));
    });

    it('GET /cards/:userId/select', () => {
      return request(app.getHttpServer())
        .get(`/cards/${user.user.id}/select`)
        .expect((res) => expect(res.body.length).toBeGreaterThan(0));
    });

    it('GET /cards/:userId/select-with-balance', () => {
      return request(app.getHttpServer())
        .get(`/cards/${user.user.id}/select-with-balance`)
        .set('Authorization', `Bearer ${user.access}`)
        .expect((res) => expect(res.body.length).toBeGreaterThan(0));
    });

    it('GET /cards/:cardId/users', () => {
      return request(app.getHttpServer())
        .get(`/cards/${cards[0]}/users`)
        .expect((res) => expect(res.body.length).toBeGreaterThan(0));
    });

    it('GET /cards/:cardId/not-users', () => {
      return request(app.getHttpServer())
        .get(`/cards/${cards[0]}/not-users`)
        .expect((res) => expect(res.body.length).toBeGreaterThan(0));
    });

    it('POST /cards/:cardId/users', () => {
      return request(app.getHttpServer())
        .post(`/cards/${cards[0]}/users`)
        .set('Authorization', `Bearer ${user.access}`)
        .send({ userId: admin.user.id })
        .expect(201);
    });

    it('DELETE /cards/:cardId/users', () => {
      return request(app.getHttpServer())
        .delete(`/cards/${cards[0]}/users`)
        .set('Authorization', `Bearer ${user.access}`)
        .send({ userId: admin.user.id })
        .expect(200);
    });

    it('POST /cards/all/:cardId/users', () => {
      return request(app.getHttpServer())
        .post(`/cards/all/${cards[0]}/users`)
        .set('Authorization', `Bearer ${user.access}`)
        .send({ userId: admin.user.id })
        .expect(201);
    });

    it('DELETE /cards/all/:cardId/users', () => {
      return request(app.getHttpServer())
        .delete(`/cards/all/${cards[0]}/users`)
        .set('Authorization', `Bearer ${user.access}`)
        .send({ userId: admin.user.id })
        .expect(200);
    });
  });

  describe('Transactions', () => {
    it('POST /transactions/deposit', () => {
      return request(app.getHttpServer())
        .post('/transactions/deposit')
        .set('Authorization', `Bearer ${user.access}`)
        .send({ cardId: cards[0], sum: 100 })
        .expect(201);
    });

    it('POST /transactions/withdraw', () => {
      return request(app.getHttpServer())
        .post('/transactions/withdraw')
        .set('Authorization', `Bearer ${user.access}`)
        .send({ cardId: cards[0], sum: 10 })
        .expect(201);
    });

    it('POST /transactions/transfer', () => {
      return request(app.getHttpServer())
        .post('/transactions/transfer')
        .set('Authorization', `Bearer ${user.access}`)
        .send({
          senderCardId: cards[0],
          receiverCardId: cards[0],
          sum: 10,
          description: '',
        })
        .expect(201);
    });

    it('POST /transactions/transfer/all', () => {
      return request(app.getHttpServer())
        .post('/transactions/transfer/all')
        .set('Authorization', `Bearer ${user.access}`)
        .send({
          senderCardId: cards[0],
          receiverCardId: cards[0],
          sum: 10,
          description: '',
        })
        .expect(201);
    });

    it('GET /transactions/my', () => {
      return request(app.getHttpServer())
        .get('/transactions/my')
        .set('Authorization', `Bearer ${user.access}`)
        .expect((res) => expect(res.body.data.length).toBeGreaterThan(0))
        .then(
          (res) =>
            (transactions = res.body.data.map((transaction) => transaction.id)),
        );
    });

    it('GET /transactions/all', () => {
      return request(app.getHttpServer())
        .get('/transactions/all')
        .set('Authorization', `Bearer ${user.access}`)
        .expect((res) => expect(res.body.data.length).toBeGreaterThan(0));
    });

    it('DELETE /transactions/:transactionId', () => {
      return request(app.getHttpServer())
        .delete(`/transactions/${transactions[0]}`)
        .set('Authorization', `Bearer ${user.access}`)
        .expect(200);
    });

    it('DELETE /transactions/:transactionId', () => {
      return request(app.getHttpServer())
        .delete(`/transactions/${transactions[1]}`)
        .set('Authorization', `Bearer ${user.access}`)
        .expect(200);
    });
  });

  describe('Cards', () => {
    it('PATCH /cards/:cardId', () => {
      return request(app.getHttpServer())
        .patch(`/cards/${cards[0]}`)
        .set('Authorization', `Bearer ${user.access}`)
        .send({ name: 'Card' })
        .expect(200);
    });

    it('PATCH /cards/all/:cardId', () => {
      return request(app.getHttpServer())
        .patch(`/cards/all/${cards[1]}`)
        .set('Authorization', `Bearer ${user.access}`)
        .send({ name: 'Card' })
        .expect(200);
    });

    it('DELETE /cards/:cardId', () => {
      return request(app.getHttpServer())
        .delete(`/cards/${cards[0]}`)
        .set('Authorization', `Bearer ${user.access}`)
        .expect(200);
    });

    it('DELETE /cards/all/:cardId', () => {
      return request(app.getHttpServer())
        .delete(`/cards/all/${cards[1]}`)
        .set('Authorization', `Bearer ${user.access}`)
        .expect(200);
    });
  });
});
