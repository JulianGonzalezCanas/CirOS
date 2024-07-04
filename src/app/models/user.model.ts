export interface IUser {
    idUsuario: number;
    nombre: string;
    apellido: string;
    email: string;
    contraseña: string;
}

function newUser(
    idUsuario: number,
    nombre: string,
    apellido: string,
    email: string,
    contraseña: string
): IUser {
    return {
        idUsuario: (idUsuario ?? 0),
        nombre: (nombre ?? ''),
        apellido: (apellido ?? ''),
        email: (email ?? ''),
        contraseña: (contraseña ?? '')
    };
}


export default {
    newUser
} as const;