
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, User, Lock, Mail, Phone, Save, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving profile
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };
  
  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving password
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your account information and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Profile Information</CardTitle>
              <CardDescription>
                Update your personal details and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.avatar || "https://ui-avatars.com/api/?name=John+Doe&background=191c44&color=fff"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "J"}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="w-full flex gap-2 items-center">
                      <Upload className="h-4 w-4" />
                      Change Picture
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={user?.name?.split(' ')[0] || "John"} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={user?.name?.split(' ')[1] || "Doe"} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email || "student@example.com"} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 flex justify-end gap-2">
                  <Button type="reset" variant="outline">Cancel</Button>
                  <Button type="submit" className="flex items-center gap-2">
                    {profileSaved ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Student Information</CardTitle>
              <CardDescription>
                View your program details and student status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Student ID</h4>
                    <p>STU-24-28563</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Program</h4>
                    <p>Web Development Bootcamp</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Enrollment Date</h4>
                    <p>January 15, 2025</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Status</h4>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Contact Administration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSave} className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
                
                <div className="border-t pt-4 flex justify-end gap-2">
                  <Button type="reset" variant="outline">Cancel</Button>
                  <Button type="submit" className="flex items-center gap-2">
                    {passwordSaved ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Notification Settings</CardTitle>
              <CardDescription>
                Choose which notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive email updates about your courses</p>
                  </div>
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      id="emailNotifications"
                      defaultChecked
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-t">
                  <div>
                    <h4 className="font-medium">Assignment Reminders</h4>
                    <p className="text-sm text-muted-foreground">Get notified about upcoming assignments</p>
                  </div>
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      id="assignmentReminders"
                      defaultChecked
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-t">
                  <div>
                    <h4 className="font-medium">Payment Reminders</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications about payment deadlines</p>
                  </div>
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      id="paymentReminders"
                      defaultChecked
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-t">
                  <div>
                    <h4 className="font-medium">Course Updates</h4>
                    <p className="text-sm text-muted-foreground">Get notified when new course content is available</p>
                  </div>
                  <div className="flex items-center h-6">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      id="courseUpdates"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
