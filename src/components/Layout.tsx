
import { ScrollArea } from "./ui/scroll-area";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden bg-white">
      <div className="flex h-full bg-white">
        {/* Left Section */}
        <div className="w-[300px] bg-white h-full p-6">
          {/* This section will not scroll */}
          {children}
        </div>
        
        {/* Right Section */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4">
              {/* Content will be scrollable within the ScrollArea */}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Layout;
