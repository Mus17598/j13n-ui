import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, Search, X } from "lucide-react";

const JobFilters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [jobType, setJobType] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [industry, setIndustry] = useState<string>('');
  const [seniority, setSeniority] = useState<string>('');
  const [minSalary, setMinSalary] = useState<string>('');
  const [currency, setCurrency] = useState<string>('CAD');
  
  const clearFilters = () => {
    setSearchTerm('');
    setSearchTags([]);
    setJobType('');
    setLocation('');
    setRole('');
    setIndustry('');
    setSeniority('');
    setMinSalary('');
    setCurrency('CAD');
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      setSearchTags([...searchTags, searchTerm.trim()]);
      setSearchTerm('');
    }
  };

  const removeSearchTag = (tagToRemove: string) => {
    setSearchTags(searchTags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-primary-green" />
          Job Filters
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={clearFilters}
          className="text-sm"
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search job titles, companies, or keywords"
              className="pl-10 bg-white/60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          </div>
          
          {/* Search Tags */}
          {searchTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {searchTags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-primary-green/10 text-primary-green rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => removeSearchTag(tag)}
                    className="ml-1 hover:text-primary-green/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Filter Options */}
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary-gray/50">
            <TabsTrigger value="basic">Basic Filters</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Filters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Type */}
              <div className="space-y-2">
                <Label htmlFor="job-type">Job Type</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger id="job-type" className="bg-white/60">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location" className="bg-white/60">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toronto">Toronto, Canada</SelectItem>
                    <SelectItem value="vancouver">Vancouver, Canada</SelectItem>
                    <SelectItem value="mumbai">Mumbai, India</SelectItem>
                    <SelectItem value="delhi">Delhi, India</SelectItem>
                    <SelectItem value="bangalore">Bangalore, India</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role" className="bg-white/60">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="software-engineer">Software Engineer</SelectItem>
                    <SelectItem value="product-manager">Product Manager</SelectItem>
                    <SelectItem value="data-scientist">Data Scientist</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Industry */}
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry" className="bg-white/60">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Seniority Level - Moved to Advanced Filters */}
              <div className="space-y-2">
                <Label htmlFor="seniority">Seniority Level</Label>
                <Select value={seniority} onValueChange={setSeniority}>
                  <SelectTrigger id="seniority" className="bg-white/60">
                    <SelectValue placeholder="Select seniority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="associate">Associate Level</SelectItem>
                    <SelectItem value="mid-senior">Mid-to-Senior Level</SelectItem>
                    <SelectItem value="director">Director Level and above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Minimum Salary with Currency */}
              <div className="space-y-2">
                <Label htmlFor="min-salary">Minimum Salary</Label>
                <div className="flex gap-2">
                  <Input
                    id="min-salary"
                    type="number"
                    placeholder="Enter minimum salary"
                    className="bg-white/60 flex-grow"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                  />
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="bg-white/60 w-24">
                      <SelectValue placeholder="CAD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobFilters;
