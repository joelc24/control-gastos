import {
    Anchor,
    Paper,
    Title,
    Text,
    Container
} from "@mantine/core";
import BackGroundAuth from "./BackGroundAuth";

const LayoutAuth = ({children, title, titleLink, navegar, status}) => {
    return (
        <BackGroundAuth>
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({
                        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                        fontWeight: 900
                    })}
                >
                    Bienvenido devuelta!
                </Title>
                
                {
                    (status == 'checking')
                        ?
                        (
                            <Title
                                align="center"
                                sx={(theme) => ({
                                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                                    fontWeight: 900
                                })}
                            >
                                Cargando..!
                            </Title>
                        )
                        : 
                        (
                            <Text color="white" size="sm" align="center" mt={5}>
                                {title}{" "}
                                <Anchor
                                    sx={{ color: "#523DB7" }}
                                    size="sm"
                                    onClick={() => navegar()}
                                >
                                    {titleLink}
                                </Anchor>
                            </Text>
                        )
                }

                
                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    { children }
                </Paper>
            </Container>
        </BackGroundAuth>
    );
}

export default LayoutAuth;
