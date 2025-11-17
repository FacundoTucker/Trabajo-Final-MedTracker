import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Turno } from '../../turno/entities/turno.entity';
import { HistoriaClinica } from '../../historia-clinica/entities/historia-clinica.entity';
import { IsEmail } from 'class-validator';

@Entity('Paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
  idPaciente: number;

  @Column({ length: 45 })
  nombre: string;

  @Column({ length: 45 })
  apellido: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ unique: true })
  DNI: number;

  @Column({ length: 45 })
  domicilio: string;

  @Column({ length: 60, unique: true })
  correoElectronico: string;

  @Column({ type: 'bigint' })
  nroTelefono: number;

  @Column({ length: 255 })
  contraseña: string;

  @OneToMany(() => Turno, turno => turno.paciente, { cascade: true })
  turnos: Turno[];

  @OneToOne(() => HistoriaClinica, hc => hc.paciente, { cascade: true })
  historiaClinica: HistoriaClinica;
}



