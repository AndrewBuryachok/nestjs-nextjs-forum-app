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

  describe('Cards', () => {
    it('GET /cards/my', () => {
      return request(app.getHttpServer())
        .get('/cards/my')
        .expect((res) => expect(res.body.data.length).toBeGreaterThan(0));
    });

    it('GET /cards/all', () => {
      return request(app.getHttpServer())
        .get('/cards/all')
        .expect((res) => expect(res.body.data.length).toBeGreaterThan(0));
    });
  });

  describe('Transactions', () => {
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
