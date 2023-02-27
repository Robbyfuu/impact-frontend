import { ICollaborator, IUsuario } from ".";

export interface IResponseCollaborator {
    ok: boolean;
    trabajador?: ICollaborator;
    trabajadores?: ICollaborator[];
}

export interface IResponseUser {
    ok: boolean;
    token: string;
    usuario?: IUsuario;
}