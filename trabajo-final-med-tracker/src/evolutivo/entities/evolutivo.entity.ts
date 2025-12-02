import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HistoriaClinica } from '../../historia-clinica/entities/historia-clinica.entity';

@Entity('Evolutivo')
export class Evolutivo {
  @PrimaryGeneratedColumn()
  idEvolutivo: number;

  @Column()
  idHistoriaClinica: number;

  @Column({ length: 500 })
  descripcion: string;

  @Column({ type: 'datetime' })
  fecha: Date;

  @ManyToOne(() => HistoriaClinica, hc => hc.evolutivos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idHistoriaClinica' })
  historiaClinica: HistoriaClinica;
}
