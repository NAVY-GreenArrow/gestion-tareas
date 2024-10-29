import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import getTheme from './plugins/theme'; // Asegúrate de que la ruta sea correcta
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import TemplateFrame from './components/TopNav'; // Asegúrate de que la ruta sea correcta
import { Switch } from '@mui/material';
import Cookies from 'js-cookie'; // Importar js-cookie
import { v4 as uuidv4 } from 'uuid'; // Importar uuid
import axios from 'axios'; // Asegúrate de importar axios

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [mode, setMode] = useState('light'); // Estado para el modo
    const [uuid, setUuid] = useState(''); // Estado para almacenar el UUID

    useEffect(() => {
        const existingUuid = Cookies.get('uuid');
        
        if (existingUuid) {
            setUuid(existingUuid); // Si existe, establecer en el estado
        } else {
            const newUuid = uuidv4(); // Generar un nuevo UUID
            Cookies.set('uuid', newUuid); // Crear la cookie
            setUuid(newUuid); // Establecer en el estado
        }
    }, []);

    useEffect(() => {
        if (uuid && uuid.trim()) { // Verificar que el UUID no esté vacío
            axios.get(`http://localhost:5000/api/tasks?owner_uuid=${uuid}`)
                .then(response => {
                    const tasksData = response.data.tasks.map(task => ({
                        title: task.title,
                        completed: task.completed === 1, // Convertir a booleano si es necesario
                        id: task.id // Suponiendo que tienes un ID en tu base de datos
                    }));
                    setTasks(tasksData); // Establecer las tareas en el estado
                })
                .catch(error => console.error('Error al obtener las tareas:', error));
        }
    }, [uuid]); // Dependencia del uuid

    const addTask = () => {
        if (newTask.trim() && uuid) { // Verificar que haya un UUID antes de agregar la tarea
            const task = { title: newTask, completed: false, owner_uuid: uuid }; // Incluir el UUID en la tarea
            axios.post(`http://localhost:5000/api/tasks`, task)
                .then(response => {
                    setTasks([...tasks, response.data]); // Agregar la nueva tarea a la lista
                    setNewTask(''); // Limpiar el campo de entrada
                })
                .catch(error => console.error('Error al agregar la tarea:', error));
        }
    };

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={getTheme(mode)}>
            <CssBaseline /> {/* Esto ayuda a aplicar estilos globales */}
            <TemplateFrame>
                <div style={{ padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1>Gestión de Tareas</h1>
                        <Switch checked={mode === 'dark'} onChange={toggleColorMode} />
                    </div>
                    <AddTaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
                    <TaskList tasks={tasks} toggleTaskCompletion={(id) => {
                        setTasks(tasks.map(task =>
                            task.id === id ? { ...task, completed: !task.completed } : task
                        ));
                    }} deleteTask={(id) => {
                        setTasks(tasks.filter(task => task.id !== id));
                    }} />
                </div>
            </TemplateFrame>
        </ThemeProvider>
    );
}

export default App;