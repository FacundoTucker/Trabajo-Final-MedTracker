import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, Column } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { IndicacionMedica } from '../../indicacion-medica/entities/indicacion-medica.entity';

@Entity('HistoriaClinica')
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  idHistoriaClinica: number;

  @Column()
  idPaciente: number;

  @OneToOne(() => Paciente, paciente => paciente.historiaClinica, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPaciente' })
  paciente: Paciente;

  @OneToMany(() => IndicacionMedica, indicacion => indicacion.historiaClinica, { cascade: true })
  indicaciones: IndicacionMedica[];
}



