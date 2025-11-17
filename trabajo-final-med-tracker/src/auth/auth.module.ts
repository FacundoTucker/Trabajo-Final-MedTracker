import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Especialista } from "../especialista/entities/especialista.entity";
import { Paciente } from "../paciente/entities/paciente.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Especialista, Paciente]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
