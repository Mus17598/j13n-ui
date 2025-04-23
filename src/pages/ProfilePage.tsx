import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Using the same mock data structure as before
const mockProfileData = {
  phoneNumber: "+1 (555) 123-4567",
  location: "Toronto, Canada",
  linkedIn: "https://linkedin.com/in/username",
  portfolioLink: "https://portfolio.com",
  jobTitle: "Senior Software Engineer",
  company: "Tech Corp",
  startDate: "2022-01-01",
  yearsOfExperience: "5",
  visaStatus: "permanent_resident",
  noticePeriod: "2_months",
  openToTravel: true,
  openToRelocation: false,
  remotePreference: "hybrid",
  currentSalary: "120000",
  expectedSalary: "150000",
  salaryCurrency: "CAD",
  preferredJobTypes: ["Full-time", "Contract"],
  preferredRoles: ["Software Engineer", "Tech Lead"],
  preferredIndustries: ["Technology", "Finance"],
  preferredLocations: ["Toronto", "Vancouver", "Remote"],
  education: "masters",
  gpa: "3.8",
  dateOfBirth: "1990-01-01",
  languages: ["English", "French"],
  nationality: "Canadian",
  militaryStatus: "",
  hasDisability: false,
  securityClearance: true,
  gender: "prefer_not_to_say",
  experienceSummary: "Experienced software engineer with a focus on web technologies...",
  additionalNotes: "Open to international opportunities"
};

const sections = [
  {
    title: "Basic Information",
    fields: [
      { label: "Phone Number", value: mockProfileData.phoneNumber },
      { label: "Location", value: mockProfileData.location },
      { label: "LinkedIn Profile", value: mockProfileData.linkedIn },
      { label: "Portfolio/Website", value: mockProfileData.portfolioLink },
    ],
  },
  {
    title: "Career Details",
    fields: [
      { label: "Current Job Title", value: mockProfileData.jobTitle },
      { label: "Current Company", value: mockProfileData.company },
      { label: "Start Date", value: mockProfileData.startDate },
      { label: "Years of Experience", value: mockProfileData.yearsOfExperience },
      { label: "Visa Status", value: mockProfileData.visaStatus },
    ],
  },
  {
    title: "Availability",
    fields: [
      { label: "Notice Period", value: mockProfileData.noticePeriod },
      { label: "Open to Travel", value: mockProfileData.openToTravel ? "Yes" : "No" },
      { label: "Open to Relocation", value: mockProfileData.openToRelocation ? "Yes" : "No" },
      { label: "Remote Work Preference", value: mockProfileData.remotePreference },
    ],
  },
  {
    title: "Compensation",
    fields: [
      { label: "Current Salary", value: `${mockProfileData.currentSalary} ${mockProfileData.salaryCurrency}` },
      { label: "Expected Salary", value: `${mockProfileData.expectedSalary} ${mockProfileData.salaryCurrency}` },
    ],
  },
  {
    title: "Preferences",
    fields: [
      { label: "Preferred Job Types", value: mockProfileData.preferredJobTypes.join(", ") },
      { label: "Preferred Roles", value: mockProfileData.preferredRoles.join(", ") },
      { label: "Preferred Industries", value: mockProfileData.preferredIndustries.join(", ") },
      { label: "Preferred Locations", value: mockProfileData.preferredLocations.join(", ") },
    ],
  },
  {
    title: "Background",
    fields: [
      { label: "Education", value: mockProfileData.education },
      { label: "GPA", value: mockProfileData.gpa || "Not specified" },
      { label: "Date of Birth", value: mockProfileData.dateOfBirth },
      { label: "Languages", value: mockProfileData.languages.join(", ") },
      { label: "Nationality", value: mockProfileData.nationality },
      { label: "Security Clearance", value: mockProfileData.securityClearance ? "Yes" : "No" },
      { label: "Gender", value: mockProfileData.gender },
    ],
  },
  {
    title: "Experience Summary",
    fields: [
      { label: "Professional Summary", value: mockProfileData.experienceSummary },
      { label: "Additional Notes", value: mockProfileData.additionalNotes },
    ],
  },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold text-gray-800">Profile Summary</h1>
              </div>
              <Button
                onClick={() => navigate('/onboarding')}
                variant="outline"
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
            
            <ScrollArea className="pr-4">
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      {section.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="space-y-1">
                          <div className="text-sm font-medium text-gray-500">
                            {field.label}
                          </div>
                          <div className="text-gray-900">
                            {field.value || "Not specified"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 