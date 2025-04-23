
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ExternalLink } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company?: string;
  url: string;
}

interface JobReviewModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onConfirm: (jobs: Job[]) => void;
  initialJobs: Job[];
}

const JobReviewModal: React.FC<JobReviewModalProps> = ({
  isOpen = true,  // Default to true if not provided
  onClose,
  onConfirm,
  initialJobs,
}) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [removalReason, setRemovalReason] = useState('');
  const { toast } = useToast();

  const handleRemoveClick = (job: Job) => {
    setSelectedJob(job);
    setShowRemoveDialog(true);
  };

  const handleRemoveConfirm = () => {
    if (!selectedJob || !removalReason.trim()) {
      toast({
        title: "Please provide a reason",
        description: "A detailed reason helps us improve our job matching.",
        variant: "destructive",
      });
      return;
    }

    // Save the removal reason for AI training
    saveRemovalReason(selectedJob, removalReason);

    // Remove the job from the list
    setJobs(jobs.filter(j => j.id !== selectedJob.id));
    setShowRemoveDialog(false);
    setSelectedJob(null);
    setRemovalReason('');

    toast({
      title: "Job removed",
      description: "Thank you for your feedback. We'll use it to improve our recommendations.",
    });
  };

  const saveRemovalReason = (job: Job, reason: string) => {
    // TODO: Implement API call to save the removal reason
    console.log('Saving removal reason:', {
      jobId: job.id,
      jobUrl: job.url,
      reason: reason,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0">
          <div className="p-6 border-b">
            <DialogHeader>
              <DialogTitle>Review Jobs Before Auto-Applying</DialogTitle>
              <DialogDescription>
                Review and remove any jobs you don't want to apply to. This helps us improve our job matching.
              </DialogDescription>
            </DialogHeader>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4 pr-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium">{job.title}</h3>
                    {job.company && (
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    )}
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
                    >
                      View posting <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleRemoveClick(job)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-6 border-t mt-auto">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => onConfirm(jobs)}
                className="bg-primary-green hover:bg-primary-green/90 text-white"
              >
                Confirm and Start Applying ({jobs.length} jobs)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRemoveDialog} onOpenChange={() => setShowRemoveDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Why do you want to remove this job?</DialogTitle>
            <DialogDescription>
              Please be descriptive so our AI can improve job matching for you.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              placeholder="e.g., The role requires skills I don't have, The location doesn't match my preferences, etc."
              value={removalReason}
              onChange={(e) => setRemovalReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowRemoveDialog(false);
                setRemovalReason('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRemoveConfirm}
              className="bg-primary-green hover:bg-primary-green/90 text-white"
            >
              Confirm Removal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobReviewModal;
