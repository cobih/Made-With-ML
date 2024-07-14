import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import StandardForms from './components/StandardForms';

const Dashboard = () => {
  const [activeTenders, setActiveTenders] = useState([
    { id: 1, title: 'Government Tender 1', status: 'In Progress' },
    { id: 2, title: 'Corporate Tender 1', status: 'Review' },
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">RFD Automation Software</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Active Tenders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {activeTenders.map(tender => (
                <li key={tender.id} className="mb-2">
                  {tender.title} - {tender.status}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="mr-2 mb-2">New Tender</Button>
            <Button className="mr-2 mb-2">Upload Documents</Button>
            <Button className="mr-2 mb-2">AI Review</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StandardForms />
          
          <Card>
            <CardHeader>
              <CardTitle>Experience Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Manage Experience</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Timeline Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Create Timeline</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;