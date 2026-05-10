import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mockTcpClient = {
  send: jest.fn().mockReturnValue({ pipe: () => ({}) }),
};

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: 'TCP_INVOICE_SERVICE', useValue: mockTcpClient }],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);
      const result = appController.getData();
      expect(result.data).toEqual({ message: 'Hello API' });
      expect(result.statusCode).toBe(200);
    });
  });
});
