export interface IUser {
    idUsuario: number;
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    direccion: string;
}

function newUser(
    idUsuario: number,
    nombre: string,
    apellido: string,
    email: string,
    contrasenia: string,
    direccion: string
): IUser {
    return {
        idUsuario: (idUsuario ?? 0),
        nombre: (nombre ?? ''),
        apellido: (apellido ?? ''),
        email: (email ?? ''),
        contrasenia: (contrasenia ?? ''),
        direccion: (direccion ?? '')
    };
}


export default {
    newUser
} as const;