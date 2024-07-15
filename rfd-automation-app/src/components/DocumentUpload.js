import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const DocumentUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // In a real application, you would handle the file upload to a server here
      // For this example, we'll just add the file info to our list
      setDocuments(prev => [...prev, {
        id: Date.now(),
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      }]);
      setSelectedFile(null);
    }
  };

  const handleDelete = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="file"
            onChange={handleFileChange}
            className="mb-2"
          />
          <Button onClick={handleUpload} disabled={!selectedFile}>
            Upload Document
          </Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Uploaded Documents</h3>
          {documents.length === 0 ? (
            <p>No documents uploaded yet.</p>
          ) : (
            <ul>
              {documents.map(doc => (
                <li key={doc.id} className="mb-2 p-2 border rounded flex justify-between items-center">
                  <div>
                    <p><strong>{doc.name}</strong></p>
                    <p className="text-sm text-gray-500">
                      {(doc.size / 1024).toFixed(2)} KB | {doc.type}
                    </p>
                  </div>
                  <Button onClick={() => handleDelete(doc.id)} variant="destructive" size="sm">
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;