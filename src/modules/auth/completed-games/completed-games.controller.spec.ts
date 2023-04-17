import { Test, TestingModule } from '@nestjs/testing';
import { CompletedGamesController } from './completed-games.controller';
import { CompletedGamesService } from './completed-games.service';

describe('CompletedGamesController', () => {
  let controller: CompletedGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompletedGamesController],
      providers: [CompletedGamesService],
    }).compile();

    controller = module.get<CompletedGamesController>(CompletedGamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
