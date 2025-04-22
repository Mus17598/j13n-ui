
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, CheckCircle2, XCircle } from 'lucide-react';

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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">Q&A Sets</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="answered" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-dark-card/50 border border-dark-border rounded-lg mb-4">
            <TabsTrigger 
              value="answered"
              className="data-[state=active]:bg-dark-card data-[state=active]:shadow-neon data-[state=active]:text-neon-green rounded-lg"
            >
              Answered ({answeredQuestions.length})
            </TabsTrigger>
            <TabsTrigger 
              value="failed"
              className="data-[state=active]:bg-dark-card data-[state=active]:shadow-neon data-[state=active]:text-neon-green rounded-lg"
            >
              Failed ({failedQuestions.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="answered" className="space-y-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {answeredQuestions.length === 0 ? (
                <div className="text-center py-6 text-white/50">No answered questions yet</div>
              ) : (
                answeredQuestions.map(q => (
                  <motion.div 
                    key={q.id} 
                    className="bg-dark-card/60 rounded-lg p-4 space-y-3 border border-dark-border/70 backdrop-blur-sm hover:bg-dark-card/70 transition-colors"
                    variants={itemVariants}
                  >
                    <div className="font-medium text-white flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                      <span>{q.question}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      {editingId === q.id ? (
                        <motion.div 
                          className="space-y-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            rows={4}
                            className="w-full neo-input text-white/90 border-dark-border focus:border-neon-green/40 focus:shadow-neon resize-none"
                          />
                          <div className="flex space-x-2 justify-end">
                            <Button size="sm" variant="outline" onClick={cancelEditing} className="border-dark-border text-white/70 hover:text-white hover:bg-dark-card/70">
                              Cancel
                            </Button>
                            <Button size="sm" onClick={saveAnswer} className="bg-neon-green/20 hover:bg-neon-green/30 text-neon-green border border-neon-green/30 shadow-neon">
                              Save
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="text-white/70 pl-7">{q.answer}</div>
                          <div className="mt-2 text-right">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => startEditing(q)}
                              className="text-white/50 hover:text-white hover:bg-dark-card/50"
                            >
                              <Edit2 className="h-4 w-4 mr-1" /> Edit
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </motion.div>
          </TabsContent>
          
          <TabsContent value="failed" className="space-y-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {failedQuestions.length === 0 ? (
                <div className="text-center py-6 text-white/50">No failed questions</div>
              ) : (
                failedQuestions.map(q => (
                  <motion.div 
                    key={q.id} 
                    className="bg-dark-card/60 rounded-lg p-4 space-y-3 border-l-4 border-red-400 border border-dark-border/70 backdrop-blur-sm hover:bg-dark-card/70 transition-colors"
                    variants={itemVariants}
                  >
                    <div className="font-medium text-white flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{q.question}</span>
                    </div>
                    <AnimatePresence mode="wait">
                      {editingId === q.id ? (
                        <motion.div 
                          className="space-y-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            rows={4}
                            className="w-full neo-input text-white/90 border-dark-border focus:border-neon-green/40 focus:shadow-neon resize-none"
                          />
                          <div className="flex space-x-2 justify-end">
                            <Button size="sm" variant="outline" onClick={cancelEditing} className="border-dark-border text-white/70 hover:text-white hover:bg-dark-card/70">
                              Cancel
                            </Button>
                            <Button size="sm" onClick={saveAnswer} className="bg-neon-green/20 hover:bg-neon-green/30 text-neon-green border border-neon-green/30 shadow-neon">
                              Save
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="text-red-400 text-sm pl-7">This question needs an answer</div>
                          <div className="mt-2 text-right">
                            <Button 
                              size="sm" 
                              onClick={() => startEditing(q)}
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
                            >
                              Add Answer
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QAEditor;
