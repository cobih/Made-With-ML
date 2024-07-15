import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const TimelineCreation = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', startDate: '', endDate: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = () => {
    if (newTask.name && newTask.startDate && newTask.endDate) {
      setTasks(prev => [...prev, { ...newTask, id: Date.now() }]);
      setNewTask({ name: '', startDate: '', endDate: '' });
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline Creation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Add New Task</h3>
          <Input
            type="text"
            name="name"
            value={newTask.name}
            onChange={handleInputChange}
            placeholder="Task Name"
            className="mb-2"
          />
          <Input
            type="date"
            name="startDate"
            value={newTask.startDate}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Input
            type="date"
            name="endDate"
            value={newTask.endDate}
            onChange={handleInputChange}
            className="mb-2"
          />
          <Button onClick={handleAddTask}>Add Task</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Project Timeline</h3>
          {tasks.length === 0 ? (
            <p>No tasks added yet.</p>
          ) : (
            tasks.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).map(task => (
              <div key={task.id} className="mb-2 p-2 border rounded">
                <p><strong>{task.name}</strong></p>
                <p>Start: {new Date(task.startDate).toLocaleDateString()}</p>
                <p>End: {new Date(task.endDate).toLocaleDateString()}</p>
                <Button onClick={() => handleDeleteTask(task.id)} variant="destructive" size="sm" className="mt-2">
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineCreation;