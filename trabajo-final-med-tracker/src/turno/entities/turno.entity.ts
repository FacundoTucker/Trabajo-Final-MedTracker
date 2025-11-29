import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Especialista } from '../../especialista/entities/especialista.entity';

@Entity('turnos')
export class Turno {
  @PrimaryGeneratedColumn()
  idTurno: number;

  @Column()
  idPaciente: number;

  @Column()
  idEspecialista: number;

  @Column({ type: 'timestamp' })
  fechaTurno: Date;

  @Column({ length: 45 })
  estado: string;

  @ManyToOne(() => Paciente, paciente => paciente.turnos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idPaciente' })
  paciente: Paciente;

  @ManyToOne(() => Especialista, especialista => especialista.turnos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idEspecialista' })
  especialista: Especialista;
}



