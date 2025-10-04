import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HistoriaClinica } from '../../historia-clinica/entities/historia-clinica.entity';

@Entity('IndicacionMedica')
export class IndicacionMedica {
  @PrimaryGeneratedColumn()
  idIndicacionMedica: number;

  @Column()
  idHistoriaClinica: number;

  @Column({ length: 255 })
  descripcion: string;

  @Column({ type: 'date' })
  fecha: Date;

  @ManyToOne(() => HistoriaClinica, hc => hc.indicaciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idHistoriaClinica' })
  historiaClinica: HistoriaClinica;
}




