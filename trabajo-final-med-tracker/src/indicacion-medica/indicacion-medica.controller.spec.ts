import { Test, TestingModule } from '@nestjs/testing';
import { IndicacionMedicaController } from './indicacion-medica.controller';
import { IndicacionMedicaService } from './indicacion-medica.service';

describe('IndicacionMedicaController', () => {
  let controller: IndicacionMedicaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndicacionMedicaController],
      providers: [IndicacionMedicaService],
    }).compile();

    controller = module.get<IndicacionMedicaController>(IndicacionMedicaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
