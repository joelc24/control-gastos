const validaciones = {
    nombre: (value)=>{
        if(value.length < 4 ){
            return 'El nombre debe contener al menos 4 caracteres'
        }

        if(typeof value === 'number'){
            return 'Por favor digite un nombre valido'
        }

        return null
    },
    cantidad: (value)=>{
        if(value < 50){
            return 'El valor minimo es de 50 pesos'
        }

        return null
    },
    fecha: (value)=>{
        if (value === null) {
            return 'por favor seleccione una fecha'
        }

        return null
    },
    categoria: (value)=>{
        if (Array.isArray(value)) {
            return 'por favor seleccione una categoria'
        }

        return null
    }
}

export default validaciones