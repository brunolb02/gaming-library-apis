import { Test, TestingModule } from '@nestjs/testing';
import { PendingGamesService } from './pending-games.service';

describe('PendingGamesService', () => {
  let service: PendingGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendingGamesService],
    }).compile();

    service = module.get<PendingGamesService>(PendingGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
