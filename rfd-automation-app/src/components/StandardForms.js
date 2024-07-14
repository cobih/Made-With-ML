import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const StandardForms = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAutoFill = () => {
    // In a real application, this data would come from an API or database
    const autoFilledData = {
      companyName: 'Acme Corporation',
      contactPerson: 'John Doe',
      email: 'john.doe@acme.com',
      phone: '(555) 123-4567'
    };
    setFormData(autoFilledData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Standard Forms</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <Input 
              type="text" 
              id="companyName" 
              name="companyName" 
              value={formData.companyName} 
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact Person</label>
            <Input 
              type="text" 
              id="contactPerson" 
              name="contactPerson" 
              value={formData.contactPerson} 
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <Input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange}
            />
          </div>
          <Button onClick={handleAutoFill} type="button">Auto-fill Form</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StandardForms;