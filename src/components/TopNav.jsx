import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import { Box, AppBar, Toolbar } from '@mui/material';
import theme from '../plugins/theme'; // Asegúrate de que la ruta sea correcta

function TemplateFrame({ children }) {
    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static">
                <Toolbar>
                    <h2 style={{ flexGrow: 1 }}>Gestión de Tareas</h2>
                </Toolbar>
                
            </AppBar>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {children}
            </Box>
        </Box>
    );
}

TemplateFrame.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TemplateFrame;