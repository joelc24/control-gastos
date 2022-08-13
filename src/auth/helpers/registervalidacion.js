const validaciones = {
    name: (value)=>{
        const valor = (/^[A-Za-z]{4,}$/.test(value))
        if(!valor){
            return 'El nombre debe contener al menos 4 caracteres o mas'
        }

        return null
    },
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
    },
    termsOfService:(value)=>{
        if(!value){
            return 'Debe aceptar los terminos y condiciones'
        }

        return null
    }

}

export default validaciones