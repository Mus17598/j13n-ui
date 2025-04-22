
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchableFilter from './SearchableFilter';
import { motion } from "framer-motion";

const JobFilters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
  const locations = ["Toronto", "Vancouver", "Mumbai", "Delhi", "Bangalore", "Remote"];
  const roles = ["Software Engineer", "Product Manager", "Data Scientist", "Designer", "Marketing"];
  const industries = ["Technology", "Healthcare", "Finance", "Education", "Retail"];
  
  const toggleFilter = (value: string, currentSelections: string[], setFunction: React.Dispatch<React.SetStateAction<string[]>>) => {
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

  return (
    <motion.div 
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Filter className="w-5 h-5 mr-2 text-primary-blue" />
          Job Filters
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={clearFilters}
          className="text-sm text-sleek-gray border-glass-border hover:bg-white/60 hover:text-foreground"
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search job titles, companies, or keywords"
            className="pl-10 neo-input focus:border-primary-blue/40 focus:shadow-glass"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/50 border border-glass-border rounded-lg">
            <TabsTrigger 
              value="basic"
              className="data-[state=active]:bg-white data-[state=active]:shadow-glass data-[state=active]:text-primary-blue rounded-lg"
            >
              Basic Filters
            </TabsTrigger>
            <TabsTrigger 
              value="advanced"
              className="data-[state=active]:bg-white data-[state=active]:shadow-glass data-[state=active]:text-primary-blue rounded-lg"
            >
              Advanced Filters
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="pt-4 space-y-4">
            <SearchableFilter
              title="Job Type"
              options={jobTypes}
              selectedOptions={selectedJobTypes}
              onToggle={(value) => toggleFilter(value, selectedJobTypes, setSelectedJobTypes)}
            />
            <SearchableFilter
              title="Location"
              options={locations}
              selectedOptions={selectedLocations}
              onToggle={(value) => toggleFilter(value, selectedLocations, setSelectedLocations)}
            />
          </TabsContent>
          
          <TabsContent value="advanced" className="pt-4 space-y-4">
            <SearchableFilter
              title="Role"
              options={roles}
              selectedOptions={selectedRoles}
              onToggle={(value) => toggleFilter(value, selectedRoles, setSelectedRoles)}
            />
            <SearchableFilter
              title="Industry"
              options={industries}
              selectedOptions={selectedIndustries}
              onToggle={(value) => toggleFilter(value, selectedIndustries, setSelectedIndustries)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default JobFilters;
