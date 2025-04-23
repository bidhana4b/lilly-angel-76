
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, User, Save, Eye, EyeOff, Bell, Upload } from "lucide-react";

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Profile settings
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("555-123-4567");
  const [bio, setBio] = useState("Passionate educator with 10+ years of experience teaching web development and programming.");
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatar || "");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Password settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [assignmentSubmissions, setAssignmentSubmissions] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  
  const handleProfileUpdate = () => {
    if (!name || !email) {
      toast({
        title: "Missing Information",
        description: "Name and email are required fields.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };
  
  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "New password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully."
    });
    
    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  const handleNotificationUpdate = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved."
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const confirmImageUpload = () => {
    if (previewImage) {
      setAvatarUrl(previewImage);
      setIsUploadDialogOpen(false);
      setPreviewImage(null);
      
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been updated successfully."
      });
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex gap-1 items-center">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex gap-1 items-center">
            <Eye className="h-4 w-4" />
            <span>Password</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-1 items-center">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-24 w-24 border">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="text-xl">
                      {name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex gap-2 items-center"
                    onClick={() => setIsUploadDialogOpen(true)}
                  >
                    <Camera className="h-4 w-4" />
                    <span>Change Picture</span>
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role" 
                        value="Teacher" 
                        disabled 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input 
                      id="bio" 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleProfileUpdate} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input 
                      id="current-password" 
                      type={showCurrentPassword ? "text" : "password"} 
                      value={currentPassword} 
                      onChange={(e) => setCurrentPassword(e.target.value)} 
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 -translate-y-1/2" 
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input 
                      id="new-password" 
                      type={showNewPassword ? "text" : "password"} 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-1/2 -translate-y-1/2" 
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handlePasswordUpdate} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Update Password</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Customize how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={emailNotifications} 
                    onCheckedChange={setEmailNotifications} 
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Notification Types</h4>
                  
                  <div className="ml-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="assignment-submissions" className="flex-1">
                        Assignment Submissions
                        <span className="block text-sm text-muted-foreground">
                          Notify when students submit assignments
                        </span>
                      </Label>
                      <Switch 
                        id="assignment-submissions" 
                        checked={assignmentSubmissions} 
                        onCheckedChange={setAssignmentSubmissions} 
                        disabled={!emailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="course-updates" className="flex-1">
                        Course Updates
                        <span className="block text-sm text-muted-foreground">
                          Notify about course schedule or content changes
                        </span>
                      </Label>
                      <Switch 
                        id="course-updates" 
                        checked={courseUpdates} 
                        onCheckedChange={setCourseUpdates} 
                        disabled={!emailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="daily-digest" className="flex-1">
                        Daily Digest
                        <span className="block text-sm text-muted-foreground">
                          Receive a daily summary of all activities
                        </span>
                      </Label>
                      <Switch 
                        id="daily-digest" 
                        checked={dailyDigest} 
                        onCheckedChange={setDailyDigest} 
                        disabled={!emailNotifications}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleNotificationUpdate} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Preferences</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Profile Picture Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Profile Picture</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              {previewImage ? (
                <div className="relative h-40 w-40 rounded-full overflow-hidden border">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="h-full w-full object-cover" 
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-full h-40 w-40 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-10 w-10 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">No image selected</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-center">
              <Label 
                htmlFor="picture-upload"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-sm cursor-pointer flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Image</span>
              </Label>
              <Input 
                id="picture-upload" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsUploadDialogOpen(false);
              setPreviewImage(null);
            }}>
              Cancel
            </Button>
            <Button onClick={confirmImageUpload} disabled={!previewImage}>
              Save Picture
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
