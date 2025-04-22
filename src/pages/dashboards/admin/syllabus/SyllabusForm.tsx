
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { DataForm } from "@/components/ui/data-form/DataForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Edit } from "lucide-react";
import { syllabusFormFields } from "./syllabusFormFields";

interface SyllabusFormProps {
  onSubmit: (data: any) => void;
  selectedUploadType: "file" | "link" | "editor";
  setSelectedUploadType: (t: "file" | "link" | "editor") => void;
  uploadProgress: number;
  fileSelected: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  driveLink: string;
  setDriveLink: (v: string) => void;
  syllabusContent: string;
  setSyllabusContent: (v: string) => void;
}

export function SyllabusForm({
  onSubmit,
  selectedUploadType,
  setSelectedUploadType,
  uploadProgress,
  fileSelected,
  handleFileChange,
  driveLink,
  setDriveLink,
  syllabusContent,
  setSyllabusContent
}: SyllabusFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Syllabus</CardTitle>
        <CardDescription>Complete the form below to create a new syllabus</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <DataForm
            fields={syllabusFormFields}
            onSubmit={onSubmit}
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
                    onChange={e => setDriveLink(e.target.value)}
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
                    onChange={e => setSyllabusContent(e.target.value)}
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
                  selectedUploadType === 'editor' && !syllabusContent}
                onClick={() =>
                  onSubmit({
                    title: "Sample Title",
                    subject: "Sample Subject",
                    grade: "10",
                    course: "Sample Course"
                  })
                }
              >
                Create Syllabus
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

