import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField 
                label="Nueva Tarea"
                variant="outlined"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                required
                fullWidth
                sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={addTask}
                sx={{ height: '100%' }}
            >
                Agregar
            </Button>
        </Box>
    );
};

export default AddTaskForm;