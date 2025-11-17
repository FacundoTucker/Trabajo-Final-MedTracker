import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Turno } from '../../turno/entities/turno.entity';

@Entity('Especialista')
export class Especialista {
  @PrimaryGeneratedColumn()
  idEspecialista: number;

  @Column({ length: 60 })
  nombre: string;

  @Column({ length: 60 })
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

  @Column({ length: 45 })
  especialidad: string;

  @Column({ length: 45, unique: true })
  nroMatricula: string;

  @Column({ length: 255 })
  contraseña: string;

  @OneToMany(() => Turno, turno => turno.especialista, { cascade: true })
  turnos: Turno[];
}



