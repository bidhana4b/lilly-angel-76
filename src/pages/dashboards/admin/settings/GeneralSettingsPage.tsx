
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Save } from "lucide-react";
import { GeneralSettings } from "./types";
import { mockGeneralSettings } from "./mockData";

const GeneralSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<GeneralSettings>(mockGeneralSettings);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  
  const handleChange = (field: keyof GeneralSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSettings(prev => ({
        ...prev,
        lastUpdated: new Date().toISOString()
      }));
      
      setIsLoading(false);
      
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
        duration: 3000,
      });
    }, 1000);
  };
  
  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Anchorage", label: "Alaska Time (AKT)" },
    { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" }
  ];
  
  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "JPY", label: "Japanese Yen (¥)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
    { value: "AUD", label: "Australian Dollar (A$)" },
    { value: "INR", label: "Indian Rupee (₹)" },
    { value: "CNY", label: "Chinese Yuan (¥)" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Configure your system's basic settings
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Institution Information</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website-name">Website Name</Label>
                <Input
                  id="website-name"
                  value={settings.websiteName}
                  onChange={(e) => handleChange("websiteName", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo-url">Logo URL</Label>
                <Input
                  id="logo-url"
                  value={settings.logoUrl}
                  onChange={(e) => handleChange("logoUrl", e.target.value)}
                />
                {settings.logoUrl && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Current logo:</span>
                    <img 
                      src={settings.logoUrl} 
                      alt="Logo" 
                      className="h-8 w-auto"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        toast({
                          title: "Error Loading Logo",
                          description: "Could not load the logo image. Please verify the URL.",
                          variant: "destructive",
                        });
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input
                  id="contact-phone"
                  value={settings.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Regional Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={settings.timezone} 
                  onValueChange={(value) => handleChange("timezone", value)}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((timezone) => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  value={settings.currency} 
                  onValueChange={(value) => handleChange("currency", value)}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Theme Colors</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary-color"
                    value={settings.primaryColor}
                    onChange={(e) => handleChange("primaryColor", e.target.value)}
                    className="flex-1"
                  />
                  <div 
                    className="h-10 w-10 rounded-md border"
                    style={{ backgroundColor: settings.primaryColor }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="secondary-color"
                    value={settings.secondaryColor}
                    onChange={(e) => handleChange("secondaryColor", e.target.value)}
                    className="flex-1"
                  />
                  <div 
                    className="h-10 w-10 rounded-md border"
                    style={{ backgroundColor: settings.secondaryColor }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tertiary-color">Tertiary Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="tertiary-color"
                    value={settings.tertiaryColor}
                    onChange={(e) => handleChange("tertiaryColor", e.target.value)}
                    className="flex-1"
                  />
                  <div 
                    className="h-10 w-10 rounded-md border"
                    style={{ backgroundColor: settings.tertiaryColor }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {settings.lastUpdated && (
            <p className="text-sm text-muted-foreground">
              Last updated: {format(new Date(settings.lastUpdated), "MMMM dd, yyyy, h:mm a")}
            </p>
          )}
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            {isLoading ? (
              <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground">
        Note: Some settings may require a system restart to take effect.
      </div>
    </div>
  );
};

export default GeneralSettingsPage;
