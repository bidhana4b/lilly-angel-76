
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  { id: "1", title: "Web Development Fundamentals" },
  { id: "2", title: "UI/UX Design Principles" },
  { id: "3", title: "Data Science Basics" },
  { id: "4", title: "JavaScript Masterclass" }
];

const SyllabusPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">View Syllabus</h2>
        <p className="text-muted-foreground">
          Select a course to view its syllabus and downloadable materials.
        </p>
      </div>
      
      <div className="w-full md:max-w-sm">
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger>
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedCourse && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              {courses.find(c => c.id === selectedCourse)?.title} - Syllabus
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-md p-4 min-h-[400px] bg-gray-50">
              {/* Placeholder for embedded PDF or document viewer */}
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <FileText size={64} className="text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Syllabus document preview would appear here</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex items-center">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Bookmark
                  </Button>
                  <Button className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Course Materials</h3>
              <div className="space-y-2">
                {[
                  { name: "Course Introduction.pdf", size: "1.2 MB" },
                  { name: "Week 1-3 Lecture Notes.pdf", size: "3.5 MB" },
                  { name: "Assignment Guidelines.docx", size: "580 KB" },
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-md p-3">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-primary mr-2" />
                      <span>{file.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SyllabusPage;
