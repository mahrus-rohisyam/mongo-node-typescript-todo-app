import request from 'supertest';
import app from '../../src/app';
import httpStatus from 'http-status';

describe('Auth routes', () => {
  describe('POST /v1/auth/register', () => {
    it('should return 201 and successfully register if request data is ok', async () => {
      await request(app).post('/v1/auth/register').send({});
    });
  });

  describe('POST /v1/auth/login', () => {
    it('should return 201 and successfully register if request data is ok', async () => {
      await request(app).post('/v1/auth/login').send({});
    });
  });
});
