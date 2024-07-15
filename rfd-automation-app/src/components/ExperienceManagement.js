import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ExperienceManagement = () => {
  const [experiences, setExperiences] = useState([
    { id: 1, projectName: 'City Infrastructure Upgrade', client: 'Metropolis City Council', year: 2022 },
    { id: 2, projectName: 'National Park Restoration', client: 'National Parks Service', year: 2021 },
  ]);

  const [newExperience, setNewExperience] = useState({ projectName: '', client: '', year: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExperience = () => {
    if (newExperience.projectName && newExperience.client && newExperience.year) {
      setExperiences(prev => [...prev, { ...newExperience, id: Date.now() }]);
      setNewExperience({ projectName: '', client: '', year: '' });
    }
  };

  const handleDeleteExperience = (id) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Add New Experience</h3>
          <Input
            type="text"
            name="projectName"
            value={newExperience.projectName}
            onChange={handleInputChange}
            placeholder="Project Name"
            className="mb-2"
          />
          <Input
            type="text"
            name="client"
            value={newExperience.client}
            onChange={handleInputChange}
            placeholder="Client"
            className="mb-2"
          />
          <Input
            type="number"
            name="year"
            value={newExperience.year}
            onChange={handleInputChange}
            placeholder="Year"
            className="mb-2"
          />
          <Button onClick={handleAddExperience}>Add Experience</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Past Experiences</h3>
          {experiences.map(exp => (
            <div key={exp.id} className="mb-2 p-2 border rounded">
              <p><strong>Project:</strong> {exp.projectName}</p>
              <p><strong>Client:</strong> {exp.client}</p>
              <p><strong>Year:</strong> {exp.year}</p>
              <Button onClick={() => handleDeleteExperience(exp.id)} variant="destructive" size="sm" className="mt-2">
                Delete
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceManagement;