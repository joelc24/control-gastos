import { Title } from "@mantine/core";


const LayoutControlGastos = ({children}) => {
    return (
        <header>
            <Title
                align="center"
                sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                    color: 'white'
                })}
            >
                Planificador de gastos
            </Title>
            { children }
        </header>
    );
}

export default LayoutControlGastos;
