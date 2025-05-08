
import { ScrollArea } from "./ui/scroll-area";

interface RightColumnProps {
  children: React.ReactNode;
}

const RightColumn = ({ children }: RightColumnProps) => {
  return (
    <div className="h-screen overflow-hidden">
      <ScrollArea className="h-full px-2">
        <div className="space-y-4 py-4 pr-2">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RightColumn;
