import { Test, TestingModule } from '@nestjs/testing';
import { PendingGamesController } from './pending-games.controller';
import { PendingGamesService } from './pending-games.service';

describe('PendingGamesController', () => {
  let controller: PendingGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendingGamesController],
      providers: [PendingGamesService],
    }).compile();

    controller = module.get<PendingGamesController>(PendingGamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
