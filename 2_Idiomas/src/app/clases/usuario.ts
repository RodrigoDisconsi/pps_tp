
export class Usuario
{
    id: string;
    nombre: string;
    email: string;
    pass: string;
    rol: string;
    
    public Usuario()
    {
        this.rol = "Usuario";
    }


    public static CrearUsuario(id: string,nombre:string ,email: string,rol:string) : Usuario
    {
        let usuario = new Usuario();
        usuario.id = id;
        usuario.nombre = nombre;
        usuario.email = email;
        usuario.rol = rol;

        return usuario;
    }    
}