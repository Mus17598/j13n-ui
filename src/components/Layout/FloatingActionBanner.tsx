
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";

interface FloatingActionBannerProps {
  onAutoApplyClick: () => void;
  onResumeUpload: () => void;
  onCoverLetterUpload: () => void;
}

const FloatingActionBanner = ({
  onAutoApplyClick,
  onResumeUpload,
  onCoverLetterUpload,
}: FloatingActionBannerProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-full bg-white/80 backdrop-blur-md px-4 py-2 shadow-lg flex items-center gap-3">
      <Button 
        onClick={onAutoApplyClick}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:opacity-90 text-white rounded-full"
      >
        Auto Apply
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onResumeUpload}
        className="rounded-full"
        title="Upload Resume"
      >
        <FileUp className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onCoverLetterUpload}
        className="rounded-full"
        title="Upload Cover Letter"
      >
        <FileUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default FloatingActionBanner;
