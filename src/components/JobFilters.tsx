
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, Search } from "lucide-react";
import { motion } from "framer-motion";

const JobFilters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  
  // For pill buttons
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
  const locations = ["Toronto", "Vancouver", "Mumbai", "Delhi", "Bangalore", "Remote"];
  const roles = ["Software Engineer", "Product Manager", "Data Scientist", "Designer", "Marketing"];
  const industries = ["Technology", "Healthcare", "Finance", "Education", "Retail"];
  
  const togglePill = (value: string, currentSelections: string[], setFunction: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentSelections.includes(value)) {
      setFunction(currentSelections.filter(item => item !== value));
    } else {
      setFunction([...currentSelections, value]);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedJobTypes([]);
    setSelectedLocations([]);
    setSelectedRoles([]);
    setSelectedIndustries([]);
  };
  
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
    <motion.div 
      className="glass-card rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Filter className="w-5 h-5 mr-2 text-neon-green" />
          Job Filters
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={clearFilters}
          className="text-sm text-white/80 border-dark-border hover:bg-dark-card/60 hover:text-white"
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white/50" />
          </div>
          <Input
            type="text"
            placeholder="Search job titles, companies, or keywords"
            className="pl-10 neo-input focus:border-neon-green/40 focus:shadow-neon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filter Options */}
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-dark-card/50 border border-dark-border rounded-lg">
            <TabsTrigger 
              value="basic"
              className="data-[state=active]:bg-dark-card data-[state=active]:shadow-neon data-[state=active]:text-neon-green rounded-lg"
            >
              Basic Filters
            </TabsTrigger>
            <TabsTrigger 
              value="advanced"
              className="data-[state=active]:bg-dark-card data-[state=active]:shadow-neon data-[state=active]:text-neon-green rounded-lg"
            >
              Advanced Filters
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="pt-4 space-y-4">
            <motion.div 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Label className="text-white/80 mb-2 block">Job Type</Label>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => togglePill(type, selectedJobTypes, setSelectedJobTypes)}
                      className={`glass-pill micro-hover ${selectedJobTypes.includes(type) ? 'active' : ''}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Label className="text-white/80 mb-2 block">Location</Label>
                <div className="flex flex-wrap gap-2">
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => togglePill(loc, selectedLocations, setSelectedLocations)}
                      className={`glass-pill micro-hover ${selectedLocations.includes(loc) ? 'active' : ''}`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="advanced" className="pt-4 space-y-4">
            <motion.div 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Label className="text-white/80 mb-2 block">Role</Label>
                <div className="flex flex-wrap gap-2">
                  {roles.map(r => (
                    <button
                      key={r}
                      onClick={() => togglePill(r, selectedRoles, setSelectedRoles)}
                      className={`glass-pill micro-hover ${selectedRoles.includes(r) ? 'active' : ''}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Label className="text-white/80 mb-2 block">Industry</Label>
                <div className="flex flex-wrap gap-2">
                  {industries.map(ind => (
                    <button
                      key={ind}
                      onClick={() => togglePill(ind, selectedIndustries, setSelectedIndustries)}
                      className={`glass-pill micro-hover ${selectedIndustries.includes(ind) ? 'active' : ''}`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default JobFilters;
