import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const AIReview = () => {
  const [tenderContent, setTenderContent] = useState('');
  const [reviewResults, setReviewResults] = useState(null);

  const handleInputChange = (e) => {
    setTenderContent(e.target.value);
  };

  const performAIReview = () => {
    // Simulated AI review process
    const simulatedReview = () => {
      const issues = [];
      if (tenderContent.length < 100) {
        issues.push("The tender content seems too short. Consider adding more details.");
      }
      if (!tenderContent.toLowerCase().includes('experience')) {
        issues.push("You may want to highlight your relevant experience.");
      }
      if (!tenderContent.toLowerCase().includes('timeline')) {
        issues.push("Consider including a project timeline.");
      }
      if (!tenderContent.toLowerCase().includes('budget') && !tenderContent.toLowerCase().includes('cost')) {
        issues.push("You might want to mention budget or cost considerations.");
      }
      return issues;
    };

    const issues = simulatedReview();
    setReviewResults(issues);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Review</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={tenderContent}
          onChange={handleInputChange}
          placeholder="Paste your tender content here..."
          rows={10}
          className="mb-4"
        />
        <Button onClick={performAIReview} className="mb-4">Run AI Review</Button>
        {reviewResults && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Review Results:</h3>
            {reviewResults.length === 0 ? (
              <p>No issues found. Your tender looks good!</p>
            ) : (
              <ul className="list-disc pl-5">
                {reviewResults.map((issue, index) => (
                  <li key={index} className="mb-1">{issue}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIReview;