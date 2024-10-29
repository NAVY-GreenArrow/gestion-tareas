const express = require('express');
const router = express.Router();
const db = require('../plugins/db');

router.get('/', async (req, res) => {
    const { owner_uuid } = req.query;
    try 
    {
        console.log('solicitud del uuid', owner_uuid)
        const [rows] = await db.query('SELECT * FROM tasks WHERE owner_uuid = ?', [owner_uuid]);
        console.log('solicitud del uuid', rows)
        const responseData = {
            tasks: rows.map(row => ({
                id: row.id,
                title: row.title,
                completed: row.completed,
            })),
            total: rows.length,
            message: 'Tareas obtenidas exitosamente'
        };

        res.status(200).json(responseData);
    } 
    catch (error) 
    {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

router.post('/', async (req, res) => {
    const { title, owner_uuid } = req.body;
    if (!title || !owner_uuid) 
    {
        return res.status(400).json({ error: 'El título y el UUID del propietario son obligatorios' });
    }
    
    try {
        const [result] = await db.query('INSERT INTO tasks (title, owner_uuid) VALUES (?, ?)', [title, owner_uuid]);
        const newTask = { id: result.insertId, title, completed: false, owner_uuid };
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {

        const updates = [];
        const values = [];

        if (title !== undefined) {
            updates.push('title = ?');
            values.push(title);
        }
        if (completed !== undefined) {
            updates.push('completed = ?');
            values.push(completed);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
        }

        values.push(id);
        const [result] = await db.query(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`, values);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        const updatedTask = { id, title: title !== undefined ? title : undefined, completed: completed !== undefined ? completed : undefined };
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

module.exports = router;