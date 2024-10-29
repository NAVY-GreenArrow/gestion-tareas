import React from 'react';
import { List, ListItem, ListItemText, Checkbox, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
    const updateTask = async (taskId, completed) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { completed });
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };

    const handleDelete = (taskId) => {
        deleteTask(taskId); // Llama a la función deleteTask
        axios.delete(`http://localhost:5000/api/tasks/${taskId}`) // Consulta para eliminar la tarea
            .then(response => {
                console.log('Tarea eliminada:', response.data);
            })
            .catch(error => {
                console.error('Error al eliminar la tarea:', error);
            });
    };

    return (
        <Paper elevation={3} sx={{ borderRadius: 2, padding: 2 }}>
            <List>
                {tasks.map((task) => (
                    <ListItem 
                        key={task.id} 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            backgroundColor: 'background.default', 
                            borderRadius: 1,
                            marginBottom: 1,
                            padding: 1,
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: 'grey.200', // Color de fondo al pasar el mouse
                            },
                        }}
                    >
                        <Checkbox 
                            checked={task.completed} 
                            onChange={() => {
                                toggleTaskCompletion(task.id); // Asegúrate de tener un ID único aquí
                                updateTask(task.id, task.completed ? 0 : 1); // Cambiar a 0 o 1 según sea necesario
                            }} 
                        />
                        <ListItemText 
                            primary={task.title} 
                            sx={{ 
                                textDecoration: task.completed ? 'line-through' : 'none', 
                                color: task.completed ? 'text.disabled' : 'text.primary' 
                            }} 
                        />
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default TaskList;