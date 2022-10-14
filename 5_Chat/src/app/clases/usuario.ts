export class Usuario
{
    id: string;
    alias: string;
    division: string;
    email: string;
    pass: string;
    rol: string;

    public Usuario()
    {
        this.rol = "Usuario";
    }


    public static CrearUsuario(id: string, alias: string, division: string,
                                email: string, rol:string) : Usuario
    {
        let usuario = new Usuario();
        usuario.id = id;
        usuario.alias = alias;
        usuario.division = division;
        usuario.email = email;
        usuario.rol = rol;

        return usuario;
    }  
}
