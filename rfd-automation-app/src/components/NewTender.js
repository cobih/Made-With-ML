import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AnimatedCard, AnimatedButton, AnimatedInput } from './ui/animated';
import StandardForms from './StandardForms';
import ExperienceManagement from './ExperienceManagement';
import TimelineCreation from './TimelineCreation';
import DocumentUpload from './DocumentUpload';
import AIReview from './AIReview';

const steps = [
  { id: 'basic', title: 'Basic Information' },
  { id: 'experience', title: 'Experience' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'documents', title: 'Documents' },
  { id: 'review', title: 'AI Review' },
];

const NewTender = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tenderData, setTenderData] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenderData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch(steps[currentStep].id) {
      case 'basic':
        return (
          <div>
            <AnimatedInput
              name="title"
              value={tenderData.title}
              onChange={handleInputChange}
              placeholder="Tender Title"
              className="mb-2"
            />
            <AnimatedInput
              name="description"
              value={tenderData.description}
              onChange={handleInputChange}
              placeholder="Tender Description"
              className="mb-2"
            />
            <StandardForms />
          </div>
        );
      case 'experience':
        return <ExperienceManagement />;
      case 'timeline':
        return <TimelineCreation />;
      case 'documents':
        return <DocumentUpload />;
      case 'review':
        return <AIReview />;
      default:
        return null;
    }
  };

  return (
    <AnimatedCard className="w-full">
      <CardHeader>
        <CardTitle>Create New Tender</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <AnimatedButton
                key={step.id}
                variant={currentStep === index ? 'default' : 'outline'}
                onClick={() => setCurrentStep(index)}
              >
                {step.title}
              </AnimatedButton>
            ))}
          </div>
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-1 bg-blue-500 transition-all duration-300 ease-in-out rounded-full"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        {renderStep()}
        <div className="mt-4 flex justify-between">
          <AnimatedButton onClick={prevStep} disabled={currentStep === 0}>
            Previous
          </AnimatedButton>
          <AnimatedButton onClick={nextStep} disabled={currentStep === steps.length - 1}>
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </AnimatedButton>
        </div>
      </CardContent>
    </AnimatedCard>
  );
};

export default NewTender;