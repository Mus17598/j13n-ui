
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  id: string;
  question: string;
  answer: string;
  status: 'answered' | 'failed' | 'new';
}

const QAEditor: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'What makes you a good fit for this position?',
      answer: 'My experience in building scalable web applications and my strong problem-solving skills make me well-suited for this role. I have a track record of delivering projects on time and collaborating effectively with cross-functional teams.',
      status: 'answered'
    },
    {
      id: '2',
      question: 'Describe a challenging project you worked on and how you overcame obstacles.',
      answer: 'In my previous role, I led the migration of a legacy system to a modern architecture. We faced numerous technical challenges, but by breaking the project into manageable phases and maintaining clear communication, we successfully completed the migration ahead of schedule.',
      status: 'answered'
    },
    {
      id: '3',
      question: 'How would you handle a situation where project requirements change mid-development?',
      answer: '',
      status: 'failed'
    },
    {
      id: '4',
      question: 'What are your salary expectations?',
      answer: '',
      status: 'failed'
    }
  ]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  
  const startEditing = (question: Question) => {
    setEditingId(question.id);
    setEditValue(question.answer);
  };
  
  const saveAnswer = () => {
    if (!editingId) return;
    
    setQuestions(questions.map(q => 
      q.id === editingId 
        ? { ...q, answer: editValue, status: 'answered' } 
        : q
    ));
    
    setEditingId(null);
  };
  
  const cancelEditing = () => {
    setEditingId(null);
  };
  
  const answeredQuestions = questions.filter(q => q.status === 'answered');
  const failedQuestions = questions.filter(q => q.status === 'failed');
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">Q&A Sets</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="answered" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary-gray/50">
            <TabsTrigger value="answered">
              Answered ({answeredQuestions.length})
            </TabsTrigger>
            <TabsTrigger value="failed">
              Failed ({failedQuestions.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="answered" className="space-y-4 mt-4">
            {answeredQuestions.length === 0 ? (
              <div className="text-center py-6 text-gray-500">No answered questions yet</div>
            ) : (
              answeredQuestions.map(q => (
                <div key={q.id} className="bg-white/70 rounded-lg p-4 space-y-3">
                  <div className="font-medium text-gray-800">{q.question}</div>
                  {editingId === q.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        rows={4}
                        className="w-full bg-white"
                      />
                      <div className="flex space-x-2 justify-end">
                        <Button size="sm" variant="outline" onClick={cancelEditing}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={saveAnswer}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-gray-600">{q.answer}</div>
                      <div className="mt-2 text-right">
                        <Button size="sm" variant="ghost" onClick={() => startEditing(q)}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="failed" className="space-y-4 mt-4">
            {failedQuestions.length === 0 ? (
              <div className="text-center py-6 text-gray-500">No failed questions</div>
            ) : (
              failedQuestions.map(q => (
                <div key={q.id} className="bg-white/70 rounded-lg p-4 space-y-3 border-l-4 border-red-400">
                  <div className="font-medium text-gray-800">{q.question}</div>
                  {editingId === q.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        rows={4}
                        className="w-full bg-white"
                      />
                      <div className="flex space-x-2 justify-end">
                        <Button size="sm" variant="outline" onClick={cancelEditing}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={saveAnswer}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-red-500 text-sm">This question needs an answer</div>
                      <div className="mt-2 text-right">
                        <Button size="sm" onClick={() => startEditing(q)}>
                          Add Answer
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QAEditor;
