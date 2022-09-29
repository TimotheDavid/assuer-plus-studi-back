import { Test, TestingModule } from '@nestjs/testing';
import { WitnessController } from './witness.controller';
import { WitnessService } from './witness.service';

describe('WitnessController', () => {
  let controller: WitnessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WitnessController],
      providers: [WitnessService],
    }).compile();

    controller = module.get<WitnessController>(WitnessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
