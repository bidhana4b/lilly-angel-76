
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileUp, FileText, Edit, Eye, Download } from "lucide-react";
import { Syllabus, mockCourses, mockSyllabus } from "./syllabusData";

export default function SyllabusByCourseManager() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  const courseObj = mockCourses.find(c => c.id === selectedCourse);
  const currentSyllabus = courseObj ? mockSyllabus.find(s => s.course === courseObj.name) : undefined;

  return (
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
                {mockCourses.map(course => (
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
                  {currentSyllabus ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Title</p>
                          <p className="text-muted-foreground">{currentSyllabus.title}</p>
                        </div>
                        <div>
                          <p className="font-medium">Last Updated</p>
                          <p className="text-muted-foreground">{currentSyllabus.lastUpdated}</p>
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
  );
}
