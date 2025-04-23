import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileSummaryProps {
  formData: {
    phoneNumber: string;
    location: string;
    linkedIn: string;
    portfolioLink: string;
    jobTitle: string;
    company: string;
    startDate: string;
    yearsOfExperience: string;
    visaStatus: string;
    noticePeriod: string;
    openToTravel: boolean;
    openToRelocation: boolean;
    remotePreference: string;
    currentSalary: string;
    expectedSalary: string;
    salaryCurrency: string;
    preferredJobTypes: string[];
    preferredRoles: string[];
    preferredIndustries: string[];
    preferredLocations: string[];
    education: string;
    gpa: string;
    dateOfBirth: string;
    languages: string[];
    nationality: string;
    militaryStatus: string;
    hasDisability: boolean;
    securityClearance: boolean;
    gender: string;
    experienceSummary: string;
    additionalNotes: string;
  };
  onClose: () => void;
}

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ formData, onClose }) => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Basic Information",
      fields: [
        { label: "Phone Number", value: formData.phoneNumber },
        { label: "Location", value: formData.location },
        { label: "LinkedIn Profile", value: formData.linkedIn },
        { label: "Portfolio/Website", value: formData.portfolioLink },
      ],
    },
    {
      title: "Career Details",
      fields: [
        { label: "Current Job Title", value: formData.jobTitle },
        { label: "Current Company", value: formData.company },
        { label: "Start Date", value: formData.startDate },
        { label: "Years of Experience", value: formData.yearsOfExperience },
        { label: "Visa Status", value: formData.visaStatus },
      ],
    },
    {
      title: "Availability",
      fields: [
        { label: "Notice Period", value: formData.noticePeriod },
        { label: "Open to Travel", value: formData.openToTravel ? "Yes" : "No" },
        { label: "Open to Relocation", value: formData.openToRelocation ? "Yes" : "No" },
        { label: "Remote Work Preference", value: formData.remotePreference },
      ],
    },
    {
      title: "Compensation",
      fields: [
        { label: "Current Salary", value: `${formData.currentSalary} ${formData.salaryCurrency}` },
        { label: "Expected Salary", value: `${formData.expectedSalary} ${formData.salaryCurrency}` },
      ],
    },
    {
      title: "Preferences",
      fields: [
        { label: "Preferred Job Types", value: formData.preferredJobTypes.join(", ") },
        { label: "Preferred Roles", value: formData.preferredRoles.join(", ") },
        { label: "Preferred Industries", value: formData.preferredIndustries.join(", ") },
        { label: "Preferred Locations", value: formData.preferredLocations.join(", ") },
      ],
    },
    {
      title: "Background",
      fields: [
        { label: "Education", value: formData.education },
        { label: "GPA", value: formData.gpa || "Not specified" },
        { label: "Date of Birth", value: formData.dateOfBirth },
        { label: "Languages", value: formData.languages.join(", ") },
        { label: "Nationality", value: formData.nationality },
        { label: "Security Clearance", value: formData.securityClearance ? "Yes" : "No" },
        { label: "Gender", value: formData.gender },
      ],
    },
    {
      title: "Experience Summary",
      fields: [
        { label: "Professional Summary", value: formData.experienceSummary },
        { label: "Additional Notes", value: formData.additionalNotes },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] m-4">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Profile Summary</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate('/onboarding')}
                variant="outline"
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                onClick={onClose}
                variant="ghost"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
        
        <ScrollArea className="p-6 max-h-[calc(90vh-100px)]">
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
  );
};

export default ProfileSummary; 