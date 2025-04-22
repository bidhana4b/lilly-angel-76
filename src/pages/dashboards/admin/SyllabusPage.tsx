
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SyllabusList from "./syllabus/SyllabusList";
import SyllabusByCourseManager from "./syllabus/SyllabusByCourseManager";
import { SyllabusForm } from "./syllabus/SyllabusForm";

export default function SyllabusPage() {
  const [showForm, setShowForm] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("all-syllabi");
  const [selectedUploadType, setSelectedUploadType] = React.useState<"file" | "link" | "editor">("file");
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [fileSelected, setFileSelected] = React.useState(false);
  const [driveLink, setDriveLink] = React.useState("");
  const [syllabusContent, setSyllabusContent] = React.useState<string>("");

  // Simulate file upload progress
  React.useEffect(() => {
    if (fileSelected && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress(prev => Math.min(prev + 10, 100));
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
          <SyllabusList />
        </TabsContent>

        <TabsContent value="by-course" className="space-y-4">
          <SyllabusByCourseManager />
        </TabsContent>

        <TabsContent value="add-syllabus" className="space-y-4">
          <SyllabusForm
            onSubmit={handleSubmit}
            selectedUploadType={selectedUploadType}
            setSelectedUploadType={setSelectedUploadType}
            uploadProgress={uploadProgress}
            fileSelected={fileSelected}
            handleFileChange={handleFileChange}
            driveLink={driveLink}
            setDriveLink={setDriveLink}
            syllabusContent={syllabusContent}
            setSyllabusContent={setSyllabusContent}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
