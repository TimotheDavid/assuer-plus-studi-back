import { Test, TestingModule } from '@nestjs/testing';
import { WitnessService } from './witness.service';

describe('WitnessService', () => {
  let service: WitnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WitnessService],
    }).compile();

    service = module.get<WitnessService>(WitnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
