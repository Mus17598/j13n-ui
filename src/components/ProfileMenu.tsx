import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, LogOut, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PersonalizedAvatar from './PersonalizedAvatar';

interface ProfileMenuProps {
  userEmail: string;
  accountType: 'Free' | 'Premium';
  onLogout: () => void;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
}

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

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  userEmail,
  accountType,
  onLogout,
  gender = 'prefer_not_to_say', // Default to neutral avatar if no gender specified
}) => {
  const navigate = useNavigate();
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handlePhoneChange = (newPhone: string) => {
    // Handle phone number change
    console.log('Changing phone to:', newPhone);
    setIsPhoneDialogOpen(false);
  };

  const handleEmailChange = (newEmail: string) => {
    // Handle email change
    console.log('Changing email to:', newEmail);
    setIsEmailDialogOpen(false);
  };

  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    // Handle password change
    console.log('Changing password');
    setIsPasswordDialogOpen(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              <PersonalizedAvatar gender={gender} />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Profile Information</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-sm">
          <div className="text-muted-foreground">{userEmail}</div>
          <div className="font-medium">
            {accountType === 'Premium' ? '✨ Premium Account' : 'Free Account'}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <FileText className="mr-2 h-4 w-4" />
          View Full Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Change Phone Number
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Phone Number</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="phone">New Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary-green hover:bg-primary-green/90 text-white"
                onClick={() => handlePhoneChange('new-phone')}
              >
                Update Phone Number
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Change Email
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Email Address</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">New Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary-green hover:bg-primary-green/90 text-white"
                onClick={() => handleEmailChange('new-email')}
              >
                Update Email
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Change Password
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary-green hover:bg-primary-green/90 text-white"
                onClick={() => handlePasswordChange('old-pass', 'new-pass')}
              >
                Update Password
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu; 