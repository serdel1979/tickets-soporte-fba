export interface ISolicitud extends Document{
    descripcion: string;
    departamento: string;
    usuario: string;
    equipo: string;
    estado: string;
    informe: string;    
    tecnico: string; 
}