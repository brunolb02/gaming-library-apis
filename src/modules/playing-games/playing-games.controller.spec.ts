import { Test, TestingModule } from '@nestjs/testing';
import { PlayingGamesController } from './playing-games.controller';
import { PlayingGamesService } from './playing-games.service';

describe('PlayingGamesController', () => {
  let controller: PlayingGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayingGamesController],
      providers: [PlayingGamesService],
    }).compile();

    controller = module.get<PlayingGamesController>(PlayingGamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
