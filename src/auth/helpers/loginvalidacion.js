const validaciones = {
    email: (value) =>{
        const valor = (/^\S+@\S+$/.test(value))
        if(!valor){
            return 'correo invalido'
        }
        
        return null
    },
    password: (value) =>{
        const valor = (/^[A-Za-z0-9]{6,}$/.test(value))
        if (!valor) {
            return 'La contraseña debe contener al menos 6 caracteres o mas'
        }

        return null
    }

}

export default validaciones