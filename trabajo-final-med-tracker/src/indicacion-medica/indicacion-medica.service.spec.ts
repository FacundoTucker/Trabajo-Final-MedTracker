import { Test, TestingModule } from '@nestjs/testing';
import { IndicacionMedicaService } from './indicacion-medica.service';

describe('IndicacionMedicaService', () => {
  let service: IndicacionMedicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndicacionMedicaService],
    }).compile();

    service = module.get<IndicacionMedicaService>(IndicacionMedicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
