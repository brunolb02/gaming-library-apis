import { Test, TestingModule } from '@nestjs/testing';
import { PlayingGamesService } from './playing-games.service';

describe('PlayingGamesService', () => {
  let service: PlayingGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayingGamesService],
    }).compile();

    service = module.get<PlayingGamesService>(PlayingGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
