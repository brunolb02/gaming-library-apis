import { Test, TestingModule } from '@nestjs/testing';
import { CompletedGamesService } from './completed-games.service';

describe('CompletedGamesService', () => {
  let service: CompletedGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedGamesService],
    }).compile();

    service = module.get<CompletedGamesService>(CompletedGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
