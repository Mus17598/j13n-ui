import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Check, ChevronRight } from 'lucide-react';

interface FormData {
  // Basic Information
  phoneNumber: string;
  location: string;
  linkedIn: string;
  portfolioLink: string;

  // Career Details
  jobTitle: string;
  company: string;
  startDate: string;
  yearsOfExperience: string;
  visaStatus: string;

  // Availability
  noticePeriod: string;
  openToTravel: boolean;
  openToRelocation: boolean;
  remotePreference: string;

  // Compensation
  currentSalary: string;
  expectedSalary: string;
  salaryCurrency: string;

  // Preferences
  preferredJobTypes: string[];
  preferredRoles: string[];
  preferredIndustries: string[];
  preferredLocations: string[];

  // Background
  education: string;
  gpa: string;
  dateOfBirth: string;
  languages: string[];
  nationality: string;
  militaryStatus: string;
  hasDisability: boolean;
  securityClearance: boolean;
  gender: string;

  // Experience Summary
  experienceSummary: string;
  additionalNotes: string;
}

interface UserOnboardingFormProps {
  onComplete: () => void;
}

const UserOnboardingForm: React.FC<UserOnboardingFormProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Initialize with empty values
    phoneNumber: '', location: '', linkedIn: '', portfolioLink: '',
    jobTitle: '', company: '', startDate: '', yearsOfExperience: '', visaStatus: '',
    noticePeriod: '', openToTravel: false, openToRelocation: false, remotePreference: '',
    currentSalary: '', expectedSalary: '', salaryCurrency: 'CAD',
    preferredJobTypes: [], preferredRoles: [], preferredIndustries: [], preferredLocations: [],
    education: '', gpa: '', dateOfBirth: '', languages: [], nationality: '',
    militaryStatus: '', hasDisability: false, securityClearance: false, gender: '',
    experienceSummary: '', additionalNotes: ''
  });

  const totalSteps = 7;

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit form data
      console.log('Form submitted:', formData);
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i + 1}
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
              ${currentStep > i + 1 ? 'bg-primary-green border-primary-green text-white' : 
                currentStep === i + 1 ? 'border-primary-green text-primary-green' : 
                'border-gray-300 text-gray-300'}`}
          >
            {currentStep > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
          </div>
        ))}
      </div>
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-primary-green rounded-full transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="+1 (123) 456-7890"
                className="bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, Country"
                className="bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedIn">LinkedIn Profile</Label>
              <Input
                id="linkedIn"
                type="url"
                value={formData.linkedIn}
                onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolioLink">Portfolio/Website</Label>
              <Input
                id="portfolioLink"
                type="url"
                value={formData.portfolioLink}
                onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                placeholder="https://yourwebsite.com"
                className="bg-white/60"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Career Details</h2>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Current Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="Senior Software Engineer"
                className="bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Current Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Company Name"
                className="bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience">Years of Experience</Label>
              <Input
                id="yearsOfExperience"
                type="number"
                value={formData.yearsOfExperience}
                onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                placeholder="5"
                className="bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visaStatus">Visa Status</Label>
              <Select value={formData.visaStatus} onValueChange={(value) => handleInputChange('visaStatus', value)}>
                <SelectTrigger className="bg-white/60">
                  <SelectValue placeholder="Select visa status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">Citizen</SelectItem>
                  <SelectItem value="permanent_resident">Permanent Resident</SelectItem>
                  <SelectItem value="work_visa">Work Visa</SelectItem>
                  <SelectItem value="student_visa">Student Visa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <div className="space-y-2">
              <Label htmlFor="noticePeriod">Notice Period</Label>
              <Select value={formData.noticePeriod} onValueChange={(value) => handleInputChange('noticePeriod', value)}>
                <SelectTrigger className="bg-white/60">
                  <SelectValue placeholder="Select notice period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="2_weeks">2 Weeks</SelectItem>
                  <SelectItem value="1_month">1 Month</SelectItem>
                  <SelectItem value="2_months">2 Months</SelectItem>
                  <SelectItem value="3_months">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="openToTravel">Open to Travel</Label>
                <Switch
                  id="openToTravel"
                  checked={formData.openToTravel}
                  onCheckedChange={(checked) => handleInputChange('openToTravel', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="openToRelocation">Open to Relocation</Label>
                <Switch
                  id="openToRelocation"
                  checked={formData.openToRelocation}
                  onCheckedChange={(checked) => handleInputChange('openToRelocation', checked)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="remotePreference">Remote Work Preference</Label>
              <Select value={formData.remotePreference} onValueChange={(value) => handleInputChange('remotePreference', value)}>
                <SelectTrigger className="bg-white/60">
                  <SelectValue placeholder="Select remote preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Fully Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Compensation</h2>
            <div className="space-y-2">
              <Label htmlFor="currentSalary">Current Salary</Label>
              <div className="flex gap-2">
                <Input
                  id="currentSalary"
                  type="number"
                  value={formData.currentSalary}
                  onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                  placeholder="100000"
                  className="bg-white/60 flex-grow"
                />
                <Select value={formData.salaryCurrency} onValueChange={(value) => handleInputChange('salaryCurrency', value)}>
                  <SelectTrigger className="bg-white/60 w-24">
                    <SelectValue placeholder="CAD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedSalary">Expected Salary</Label>
              <div className="flex gap-2">
                <Input
                  id="expectedSalary"
                  type="number"
                  value={formData.expectedSalary}
                  onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                  placeholder="120000"
                  className="bg-white/60 flex-grow"
                />
                <Select value={formData.salaryCurrency} onValueChange={(value) => handleInputChange('salaryCurrency', value)}>
                  <SelectTrigger className="bg-white/60 w-24">
                    <SelectValue placeholder="CAD" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="space-y-2">
              <Label>Preferred Job Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                  <Button
                    key={type}
                    variant="outline"
                    className={`${
                      formData.preferredJobTypes.includes(type)
                        ? 'bg-primary-green/10 text-primary-green border-primary-green'
                        : ''
                    }`}
                    onClick={() => {
                      const updatedTypes = formData.preferredJobTypes.includes(type)
                        ? formData.preferredJobTypes.filter(t => t !== type)
                        : [...formData.preferredJobTypes, type];
                      handleInputChange('preferredJobTypes', updatedTypes);
                    }}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Preferred Roles</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Software Engineer',
                  'Product Manager',
                  'Data Scientist',
                  'Designer',
                  'Marketing',
                  'Sales',
                ].map((role) => (
                  <Button
                    key={role}
                    variant="outline"
                    className={`${
                      formData.preferredRoles.includes(role)
                        ? 'bg-primary-green/10 text-primary-green border-primary-green'
                        : ''
                    }`}
                    onClick={() => {
                      const updatedRoles = formData.preferredRoles.includes(role)
                        ? formData.preferredRoles.filter(r => r !== role)
                        : [...formData.preferredRoles, role];
                      handleInputChange('preferredRoles', updatedRoles);
                    }}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Preferred Industries</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Technology',
                  'Healthcare',
                  'Finance',
                  'Education',
                  'Retail',
                  'Manufacturing',
                ].map((industry) => (
                  <Button
                    key={industry}
                    variant="outline"
                    className={`${
                      formData.preferredIndustries.includes(industry)
                        ? 'bg-primary-green/10 text-primary-green border-primary-green'
                        : ''
                    }`}
                    onClick={() => {
                      const updatedIndustries = formData.preferredIndustries.includes(industry)
                        ? formData.preferredIndustries.filter(i => i !== industry)
                        : [...formData.preferredIndustries, industry];
                      handleInputChange('preferredIndustries', updatedIndustries);
                    }}
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Preferred Locations</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Toronto',
                  'Vancouver',
                  'Mumbai',
                  'Delhi',
                  'Bangalore',
                  'Remote',
                ].map((location) => (
                  <Button
                    key={location}
                    variant="outline"
                    className={`${
                      formData.preferredLocations.includes(location)
                        ? 'bg-primary-green/10 text-primary-green border-primary-green'
                        : ''
                    }`}
                    onClick={() => {
                      const updatedLocations = formData.preferredLocations.includes(location)
                        ? formData.preferredLocations.filter(l => l !== location)
                        : [...formData.preferredLocations, location];
                      handleInputChange('preferredLocations', updatedLocations);
                    }}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Background</h2>
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                <SelectTrigger className="bg-white/60">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high_school">High School</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">Ph.D.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA (Optional)</Label>
              <Input
                id="gpa"
                type="number"
                step="0.1"
                min="0"
                max="4"
                value={formData.gpa}
                onChange={(e) => handleInputChange('gpa', e.target.value)}
                placeholder="3.5"
                className="bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="bg-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label>Languages</Label>
              <div className="grid grid-cols-2 gap-2">
                {['English', 'French', 'Hindi', 'Mandarin', 'Spanish'].map((language) => (
                  <Button
                    key={language}
                    variant="outline"
                    className={`${
                      formData.languages.includes(language)
                        ? 'bg-primary-green/10 text-primary-green border-primary-green'
                        : ''
                    }`}
                    onClick={() => {
                      const updatedLanguages = formData.languages.includes(language)
                        ? formData.languages.filter(l => l !== language)
                        : [...formData.languages, language];
                      handleInputChange('languages', updatedLanguages);
                    }}
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                placeholder="Your nationality"
                className="bg-white/60"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="securityClearance">Security Clearance</Label>
                <Switch
                  id="securityClearance"
                  checked={formData.securityClearance}
                  onCheckedChange={(checked) => handleInputChange('securityClearance', checked)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer_not_to_say" id="prefer_not_to_say" />
                  <Label htmlFor="prefer_not_to_say">Prefer not to say</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Experience Summary</h2>
            <div className="space-y-2">
              <Label htmlFor="experienceSummary">Professional Summary</Label>
              <Textarea
                id="experienceSummary"
                value={formData.experienceSummary}
                onChange={(e) => handleInputChange('experienceSummary', e.target.value)}
                placeholder="Brief overview of your professional experience..."
                className="bg-white/60 min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                placeholder="Any additional information you'd like to share..."
                className="bg-white/60 min-h-[100px]"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Profile</h1>
            {renderProgressBar()}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {renderFormStep()}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-primary-green hover:bg-primary-green/90 text-white"
                >
                  {currentStep === totalSteps ? 'Submit' : 'Next'}
                  {currentStep !== totalSteps && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOnboardingForm; 