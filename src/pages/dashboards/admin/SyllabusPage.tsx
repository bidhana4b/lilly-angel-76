import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table/DataTable";
import { DataForm } from "@/components/ui/data-form/DataForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, Edit, Eye, Download, FileUp, Plus } from "lucide-react";

interface Syllabus {
  id: string;
  title: string;
  subject: string;
  grade: string;
  lastUpdated: string;
  uploadType: "file" | "link" | "editor";
  content?: string;
  fileUrl?: string;
  driveLink?: string;
  course: string;
}

const mockCourses = [
  { id: "1", name: "Mathematics Grade 10" },
  { id: "2", name: "English Literature Grade 11" },
  { id: "3", name: "Physics Grade 12" },
  { id: "4", name: "Chemistry Grade 10" },
  { id: "5", name: "Biology Grade 11" },
];

const mockSyllabus: Syllabus[] = [
  {
    id: "1",
    title: "Mathematics Grade 10",
    subject: "Mathematics",
    grade: "10",
    lastUpdated: "2024-04-15",
    uploadType: "file",
    fileUrl: "/sample-syllabus.pdf",
    course: "Mathematics Grade 10"
  },
  {
    id: "2",
    title: "English Literature Grade 11",
    subject: "English",
    grade: "11",
    lastUpdated: "2024-04-14",
    uploadType: "link",
    driveLink: "https://drive.google.com/file/example",
    course: "English Literature Grade 11"
  },
  {
    id: "3",
    title: "Physics Grade 12",
    subject: "Physics",
    grade: "12",
    lastUpdated: "2024-04-10",
    uploadType: "editor",
    content: "<h1>Physics Syllabus</h1><p>This is the content of the physics syllabus...</p>",
    course: "Physics Grade 12"
  },
];

const syllabusColumns: Column<Syllabus>[] = [
  { header: "Title", accessorKey: "title" },
  { header: "Course", accessorKey: "course" },
  { header: "Subject", accessorKey: "subject" },
  { header: "Grade", accessorKey: "grade" },
  { header: "Last Updated", accessorKey: "lastUpdated" },
  { 
    header: "Type", 
    accessorKey: "uploadType",
    cell: (row: Syllabus) => {
      const typeLabels = {
        file: "PDF File",
        link: "Drive Link",
        editor: "Rich Text"
      };
      return typeLabels[row.uploadType];
    }
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (row: Syllabus) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    )
  }
];

const syllabusFormFields = [
  { name: "title", label: "Title", type: "text" as const, validation: { required: true } },
  { name: "subject", label: "Subject", type: "text" as const, validation: { required: true } },
  { name: "grade", label: "Grade", type: "text" as const, validation: { required: true } },
  { name: "course", label: "Course", type: "text" as const, validation: { required: true } }
];

export default function SyllabusPage() {
  const [showForm, setShowForm] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("all-syllabi");
  const [selectedUploadType, setSelectedUploadType] = React.useState<"file" | "link" | "editor">("file");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [selectedCourse, setSelectedCourse] = React.useState<string>("");
  const [syllabusContent, setSyllabusContent] = React.useState<string>("");
  const [fileSelected, setFileSelected] = React.useState(false);
  const [driveLink, setDriveLink] = React.useState("");
  const [viewingSyllabus, setViewingSyllabus] = React.useState<Syllabus | null>(null);

  // Simulate file upload progress
  React.useEffect(() => {
    if (fileSelected && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [fileSelected, uploadProgress]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileSelected(true);
      setUploadProgress(10);
    }
  };

  const handleSubmit = (data: any) => {
    console.log("New syllabus data:", data, {
      uploadType: selectedUploadType,
      fileSelected,
      driveLink,
      syllabusContent
    });
    setShowForm(false);
    setActiveTab("all-syllabi");
    setUploadProgress(0);
    setFileSelected(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setShowForm(value === "add-syllabus");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Syllabus Manager</h2>
          <p className="text-muted-foreground">Create and manage course syllabi</p>
        </div>
        <Button onClick={() => handleTabChange("add-syllabus")} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Syllabus
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3 mb-4">
          <TabsTrigger value="all-syllabi">All Syllabi</TabsTrigger>
          <TabsTrigger value="by-course">Manage by Course</TabsTrigger>
          <TabsTrigger value="add-syllabus">Add New Syllabus</TabsTrigger>
        </TabsList>

        <TabsContent value="all-syllabi" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">All Syllabi</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <DataTable
                data={mockSyllabus}
                columns={syllabusColumns}
                pageSize={5}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-course" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Syllabi by Course</CardTitle>
              <CardDescription>Select a course to view or edit its syllabus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="course">Course</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCourse && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <FileUp className="h-8 w-8 mb-2 text-primary" />
                          <p className="font-medium">Upload PDF</p>
                        </CardContent>
                      </Card>
                      <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <FileText className="h-8 w-8 mb-2 text-primary" />
                          <p className="font-medium">Add Google Drive Link</p>
                        </CardContent>
                      </Card>
                      <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <Edit className="h-8 w-8 mb-2 text-primary" />
                          <p className="font-medium">Create in Editor</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle>Current Syllabus</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {mockSyllabus.find(s => s.course === mockCourses.find(c => c.id === selectedCourse)?.name) ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium">Title</p>
                                <p className="text-muted-foreground">{
                                  mockSyllabus.find(s => s.course === mockCourses.find(c => c.id === selectedCourse)?.name)?.title
                                }</p>
                              </div>
                              <div>
                                <p className="font-medium">Last Updated</p>
                                <p className="text-muted-foreground">{
                                  mockSyllabus.find(s => s.course === mockCourses.find(c => c.id === selectedCourse)?.name)?.lastUpdated
                                }</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-muted-foreground">No syllabus found for this course</p>
                            <Button variant="outline" className="mt-2">Create Syllabus</Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-syllabus" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Syllabus</CardTitle>
              <CardDescription>Complete the form below to create a new syllabus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <DataForm
                  fields={syllabusFormFields}
                  onSubmit={handleSubmit}
                  submitLabel="Continue"
                  defaultValues={{
                    title: "",
                    subject: "",
                    grade: "",
                    course: ""
                  }}
                />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Syllabus Content</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col space-y-2">
                      <Label>Upload Method</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant={selectedUploadType === 'file' ? 'default' : 'outline'}
                          onClick={() => setSelectedUploadType('file')}
                          className="flex gap-2"
                        >
                          <Upload className="h-4 w-4" /> Upload PDF
                        </Button>
                        <Button 
                          variant={selectedUploadType === 'link' ? 'default' : 'outline'}
                          onClick={() => setSelectedUploadType('link')}
                          className="flex gap-2"
                        >
                          <FileText className="h-4 w-4" /> Google Drive Link
                        </Button>
                        <Button 
                          variant={selectedUploadType === 'editor' ? 'default' : 'outline'}
                          onClick={() => setSelectedUploadType('editor')}
                          className="flex gap-2"
                        >
                          <Edit className="h-4 w-4" /> Rich Text Editor
                        </Button>
                      </div>
                    </div>

                    {selectedUploadType === 'file' && (
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="file">Upload Syllabus PDF</Label>
                        <Input id="file" type="file" accept=".pdf" onChange={handleFileChange} />
                        {fileSelected && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} className="h-1" />
                          </div>
                        )}
                      </div>
                    )}

                    {selectedUploadType === 'link' && (
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="driveLink">Google Drive Link</Label>
                        <Input 
                          id="driveLink" 
                          placeholder="https://drive.google.com/file/..." 
                          value={driveLink}
                          onChange={(e) => setDriveLink(e.target.value)}
                        />
                      </div>
                    )}

                    {selectedUploadType === 'editor' && (
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <textarea 
                          id="content"
                          rows={10}
                          className="border border-input rounded-md p-2 resize-none"
                          placeholder="Enter your syllabus content here..."
                          value={syllabusContent}
                          onChange={(e) => setSyllabusContent(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Simple text area for demo purposes. A real implementation would use a rich text editor.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      disabled={selectedUploadType === 'file' && !fileSelected && uploadProgress !== 100 || 
                              selectedUploadType === 'link' && !driveLink || 
                              selectedUploadType === 'editor' && !syllabusContent
                      }
                      onClick={() => handleSubmit({
                        title: "Sample Title",
                        subject: "Sample Subject",
                        grade: "10",
                        course: "Sample Course"
                      })}
                    >
                      Create Syllabus
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
