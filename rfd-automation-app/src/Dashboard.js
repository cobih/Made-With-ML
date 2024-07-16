import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from './components/ui/card';
import { AnimatedCard, AnimatedButton } from './components/ui/animated';
import NewTender from './components/NewTender';
import { motion } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';
import { useTenders } from './contexts/TenderContext';

const Dashboard = () => {
  const [showNewTender, setShowNewTender] = useState(false);
  const { user } = useAuth();
  const { tenders } = useTenders();

  const toggleNewTender = () => {
    setShowNewTender(prev => !prev);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome, {user.username}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AnimatedCard>
          <CardHeader>
            <CardTitle>Active Tenders</CardTitle>
          </CardHeader>
          <CardContent>
            {tenders.length === 0 ? (
              <p>No active tenders.</p>
            ) : (
              <ul>
                {tenders.map(tender => (
                  <li key={tender._id} className="mb-2 p-2 bg-gray-100 rounded">
                    <span className="font-semibold">{tender.title}</span>
                    <p className="text-sm text-gray-600">{tender.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </AnimatedCard>
        
        <AnimatedCard>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatedButton className="mr-2 mb-2" onClick={toggleNewTender}>
              {showNewTender ? 'Close New Tender' : 'New Tender'}
            </AnimatedButton>
            <AnimatedButton className="mr-2 mb-2">Upload Documents</AnimatedButton>
            <AnimatedButton className="mr-2 mb-2">AI Review</AnimatedButton>
          </CardContent>
        </AnimatedCard>
      </div>
      
      {showNewTender && (
        <div className="mb-6">
          <NewTender />
        </div>
      )}
      
      {!showNewTender && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Features Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Standard Forms', description: 'Automate form filling with company information.' },
              { title: 'Experience Management', description: 'Organize and present past project experiences.' },
              { title: 'Timeline Creation', description: 'Create and manage project timelines.' },
              { title: 'Document Management', description: 'Upload and manage tender-related documents.' },
              { title: 'AI Review', description: 'Get AI-powered suggestions for your tender.' }
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;