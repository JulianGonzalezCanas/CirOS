export interface IUser {
    idUsuario: number;
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    direccion: string;
    isSuperUser: boolean;
}

function newUser(
    idUsuario: number,
    nombre: string,
    apellido: string,
    email: string,
    contrasenia: string,
    direccion: string,
    isSuperUser: boolean
): IUser {
    return {
        idUsuario: (idUsuario ?? 0),
        nombre: (nombre ?? ''),
        apellido: (apellido ?? ''),
        email: (email ?? ''),
        contrasenia: (contrasenia ?? ''),
        direccion: (direccion ?? ''),
        isSuperUser: (isSuperUser ?? false)
    };
}


export default {
    newUser
} as const;