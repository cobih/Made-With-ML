import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import NewTender from './components/NewTender';

const Dashboard = () => {
  const [activeTenders, setActiveTenders] = useState([
    { id: 1, title: 'Government Tender 1', status: 'In Progress' },
    { id: 2, title: 'Corporate Tender 1', status: 'Review' },
  ]);
  const [showNewTender, setShowNewTender] = useState(false);

  const toggleNewTender = () => {
    setShowNewTender(prev => !prev);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">RFD Automation Software</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            <Button className="mr-2 mb-2" onClick={toggleNewTender}>
              {showNewTender ? 'Close New Tender' : 'New Tender'}
            </Button>
            <Button className="mr-2 mb-2">Upload Documents</Button>
            <Button className="mr-2 mb-2">AI Review</Button>
          </CardContent>
        </Card>
      </div>
      
      {showNewTender && (
        <div className="mb-4">
          <NewTender />
        </div>
      )}
      
      {!showNewTender && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Features Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Standard Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Automate form filling with company information.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Experience Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Organize and present past project experiences.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Timeline Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Create and manage project timelines.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upload and manage tender-related documents.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get AI-powered suggestions for your tender.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;