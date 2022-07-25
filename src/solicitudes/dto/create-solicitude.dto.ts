import { IsNotEmpty, IsString } from "class-validator";

export class CreateSolicitudDto {
  @IsNotEmpty()
  @IsString()
  readonly  descripcion: string;
  @IsNotEmpty()
  @IsString()
  readonly  departamento: string;
  @IsNotEmpty()
  @IsString()
  readonly  usuario: string;
  @IsNotEmpty()
  @IsString()
  readonly  equipo: string;
  readonly  estado: string;
  readonly  informe: string;   
  readonly  tecnico: string; 
}