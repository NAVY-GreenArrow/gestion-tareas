import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // Paleta de colores para el modo claro
                primary: { main: '#1976d2' },
                background: { default: '#f5f5f5', paper: '#ffffff' },
            }
            : {
                // Paleta de colores para el modo oscuro
                primary: { main: '#90caf9' },
                background: { default: '#121212', paper: '#424242' },
            }),
    },
});

export default getTheme;