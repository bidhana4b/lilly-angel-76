
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Link, FileText, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const mockCourses = [
  { id: "c1", title: "Web Development Fundamentals" },
  { id: "c2", title: "React Framework Mastery" },
  { id: "c3", title: "Advanced JavaScript Patterns" },
  { id: "c4", title: "UI/UX Design Principles" }
];

const SyllabusPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [uploadMethod, setUploadMethod] = useState<"file" | "link" | "editor">("file");
  const [fileUploaded, setFileUploaded] = useState<File | null>(null);
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const { toast } = useToast();
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploaded(e.target.files[0]);
    }
  };
  
  const handleSubmit = () => {
    if (!selectedCourse) {
      toast({
        title: "Error",
        description: "Please select a course first",
        variant: "destructive"
      });
      return;
    }
    
    if (uploadMethod === "file" && !fileUploaded) {
      toast({
        title: "Error",
        description: "Please upload a file",
        variant: "destructive"
      });
      return;
    }
    
    if (uploadMethod === "link" && !linkUrl) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
      return;
    }
    
    if (uploadMethod === "editor" && !editorContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter content in the editor",
        variant: "destructive"
      });
      return;
    }
    
    // Success scenario
    const courseName = mockCourses.find(c => c.id === selectedCourse)?.title || "Selected course";
    toast({
      title: "Syllabus Uploaded Successfully",
      description: `Syllabus for ${courseName} has been uploaded.`,
      variant: "default"
    });
    
    // Reset the form
    setFileUploaded(null);
    setLinkUrl("");
    setEditorContent("");
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Upload Syllabus</h2>
        <p className="text-muted-foreground">
          Create or update course syllabus for your assigned courses
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Syllabus Management</CardTitle>
          <CardDescription>
            Select a course and provide syllabus content using your preferred method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="course">Select Course</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger id="course">
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent>
                {mockCourses.map(course => (
                  <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="file" className="w-full" value={uploadMethod} onValueChange={(value) => setUploadMethod(value as "file" | "link" | "editor")}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="file" className="flex gap-1 items-center">
                <Upload className="h-4 w-4" /> PDF Upload
              </TabsTrigger>
              <TabsTrigger value="link" className="flex gap-1 items-center">
                <Link className="h-4 w-4" /> External Link
              </TabsTrigger>
              <TabsTrigger value="editor" className="flex gap-1 items-center">
                <FileText className="h-4 w-4" /> Rich Text Editor
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="space-y-4">
              <div className="border-2 border-dashed rounded-md p-8 text-center">
                {fileUploaded ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="font-medium">{fileUploaded.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(fileUploaded.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setFileUploaded(null)}>
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="font-medium">Drag and drop your syllabus PDF</p>
                    <p className="text-sm text-muted-foreground">
                      Supported format: PDF up to 10MB
                    </p>
                    <div className="flex justify-center mt-4">
                      <Label 
                        htmlFor="file-upload"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-sm cursor-pointer"
                      >
                        Browse Files
                      </Label>
                      <Input 
                        id="file-upload" 
                        type="file" 
                        accept=".pdf" 
                        className="hidden" 
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="link" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="syllabus-link">Syllabus URL</Label>
                <Input 
                  id="syllabus-link" 
                  placeholder="https://example.com/syllabus.pdf"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Enter the URL where your syllabus is hosted
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="editor" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="syllabus-editor">Create Syllabus Content</Label>
                <Textarea 
                  id="syllabus-editor" 
                  placeholder="Enter your syllabus content here..."
                  className="min-h-[300px] font-mono"
                  value={editorContent}
                  onChange={(e) => setEditorContent(e.target.value)} 
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>Preview</Button>
            <Button onClick={handleSubmit}>Upload Syllabus</Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Syllabus Preview</DialogTitle>
          </DialogHeader>
          <div className="p-4 border rounded-md bg-muted/20">
            {uploadMethod === "file" && fileUploaded && (
              <div className="text-center p-8">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-2 font-medium">{fileUploaded.name}</p>
                <p className="text-sm text-muted-foreground">PDF Preview not available</p>
              </div>
            )}
            
            {uploadMethod === "link" && linkUrl && (
              <div className="text-center p-8">
                <Link className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-2 font-medium">External Link</p>
                <p className="text-sm text-muted-foreground">{linkUrl}</p>
                <Button variant="link" className="mt-2" onClick={() => window.open(linkUrl, '_blank')}>
                  Open Link
                </Button>
              </div>
            )}
            
            {uploadMethod === "editor" && editorContent && (
              <div className="p-4">
                <pre className="whitespace-pre-wrap">{editorContent}</pre>
              </div>
            )}
            
            {((uploadMethod === "file" && !fileUploaded) || 
              (uploadMethod === "link" && !linkUrl) || 
              (uploadMethod === "editor" && !editorContent)) && (
              <div className="text-center p-8 flex flex-col items-center">
                <AlertCircle className="h-12 w-12 text-amber-500" />
                <p className="mt-2 text-muted-foreground">No content to preview</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SyllabusPage;
