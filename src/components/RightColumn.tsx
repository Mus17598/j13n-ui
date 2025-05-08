
import { ScrollArea } from "./ui/scroll-area";

interface RightColumnProps {
  children: React.ReactNode;
}

const RightColumn = ({ children }: RightColumnProps) => {
  return (
    <div className="h-screen overflow-hidden">
      <ScrollArea className="h-full">
        <div className="space-y-4 p-4">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RightColumn;
