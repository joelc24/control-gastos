

export const filtroGastos = (filtro, gastos) =>{
    if((filtro == '') || filtro == 'Todas'){
        return gastos
    }

    return gastos.filter(f => f.categoria === filtro)
}