
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp } from 'lucide-react';

interface QACardProps {
  questions: {
    id: string;
    question: string;
    answer: string;
    status: 'answered' | 'failed' | 'new';
  }[];
}

const QACard: React.FC<QACardProps> = ({ questions }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEditing = (question: { id: string; answer: string }) => {
    setEditingId(question.id);
    setEditValue(question.answer);
  };

  const saveAnswer = () => {
    // Here we would update the answer in the actual state
    // but we're just updating the UI for now
    setEditingId(null);
  };

  return (
    <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-xl rounded-2xl h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-yellow-300 via-purple-300 to-blue-300 bg-clip-text text-transparent flex items-center">
          <MessageSquare className="mr-2 h-5 w-5" />
          Interview Q&A
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {questions.slice(0, 3).map((q) => (
          <div key={q.id} className={`bg-white/70 rounded-xl p-4 transition-shadow hover:shadow-md ${q.status === 'failed' ? 'border-l-4 border-red-400' : ''}`}>
            <div className="font-medium text-gray-800 mb-2">{q.question}</div>
            {editingId === q.id ? (
              <div className="space-y-3">
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={4}
                  className="w-full bg-white/80"
                />
                <div className="flex space-x-2 justify-end">
                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={saveAnswer}
                    className="bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:opacity-90"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {q.status === 'answered' ? (
                  <div className="text-gray-600 relative">
                    {q.answer}
                    <div className="absolute -top-1 -right-1 bg-green-100 rounded-full p-1">
                      <ThumbsUp className="h-3 w-3 text-green-500" />
                    </div>
                  </div>
                ) : (
                  <div className="text-red-500 text-sm">This question needs an answer</div>
                )}
                <div className="mt-2 text-right">
                  <Button 
                    size="sm" 
                    variant={q.status === 'answered' ? "ghost" : "default"}
                    onClick={() => startEditing(q)}
                    className={q.status === 'answered' ? "" : "bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:opacity-90"}
                  >
                    {q.status === 'answered' ? 'Edit' : 'Add Answer'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QACard;
