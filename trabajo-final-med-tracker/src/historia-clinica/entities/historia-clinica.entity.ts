import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, Column } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { IndicacionMedica } from '../../indicacion-medica/entities/indicacion-medica.entity';
import { Evolutivo } from '../../evolutivo/entities/evolutivo.entity';

@Entity('HistoriaClinica')
export class HistoriaClinica {
  @PrimaryGeneratedColumn()
  idHistoriaClinica: number;

  @OneToOne(() => Paciente, paciente => paciente.historiaClinica, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPaciente' })
  paciente: Paciente;

  @OneToMany(() => IndicacionMedica, indicacion => indicacion.historiaClinica, { cascade: true })
  indicaciones: IndicacionMedica[];

  @OneToMany(() => Evolutivo, (ev) => ev.historiaClinica)
  evolutivos: Evolutivo[];

}



