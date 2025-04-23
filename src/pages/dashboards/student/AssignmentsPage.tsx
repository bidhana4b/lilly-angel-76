
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, Download, FileText, Upload } from "lucide-react";

const newAssignments = [
  {
    id: "1",
    title: "JavaScript Functions",
    course: "Web Development Fundamentals",
    dueDate: "Today",
    instructions: "Create 5 different functions demonstrating various concepts like callbacks, promises, and closures.",
    urgent: true,
  },
  {
    id: "2",
    title: "User Personas",
    course: "UI/UX Design Principles",
    dueDate: "Tomorrow",
    instructions: "Develop 3 user personas for a mobile banking application targeting different demographics.",
    urgent: false,
  },
  {
    id: "3",
    title: "Data Visualization",
    course: "Data Science Basics",
    dueDate: "In 2 days",
    instructions: "Create meaningful visualizations from the provided dataset using any visualization library.",
    urgent: false,
  },
];

const submittedAssignments = [
  {
    id: "4",
    title: "HTML & CSS Basics",
    course: "Web Development Fundamentals",
    submittedDate: "Apr 15, 2025",
    grade: "A",
    feedback: "Excellent work! Your code was clean and well-structured.",
  },
  {
    id: "5",
    title: "Color Theory",
    course: "UI/UX Design Principles",
    submittedDate: "Apr 10, 2025",
    grade: "B+",
    feedback: "Good work, but there were some inconsistencies in the color palette.",
  },
  {
    id: "6",
    title: "Python Basics",
    course: "Data Science Basics",
    submittedDate: "Apr 5, 2025",
    grade: "Pending",
    feedback: "",
  },
];

const AssignmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedAssignment(expandedAssignment === id ? null : id);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
        <p className="text-muted-foreground">
          View and submit your course assignments.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="new" className="relative">
            New 
            <Badge variant="secondary" className="ml-2">{newAssignments.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="submitted">
            Submitted
            <Badge variant="secondary" className="ml-2">{submittedAssignments.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="mt-4 space-y-4">
          {newAssignments.map((assignment) => (
            <Card key={assignment.id} className={`transition-all duration-200 ${assignment.urgent ? 'border-red-300' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  {assignment.urgent && (
                    <Badge variant="destructive" className="flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> Urgent
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-center text-sm gap-x-4 gap-y-1 text-muted-foreground">
                  <span>{assignment.course}</span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Due: <span className={assignment.dueDate === "Today" ? "font-medium text-destructive" : ""}>{assignment.dueDate}</span>
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedAssignment === assignment.id ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="border-t pt-4 mb-4">
                    <h4 className="font-medium mb-2">Instructions:</h4>
                    <p className="text-sm mb-4">{assignment.instructions}</p>
                    
                    <div className="flex flex-col gap-4">
                      <div className="border border-dashed rounded-md p-6 bg-secondary/50 flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-1">Drop your file here or click to browse</p>
                        <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX up to 10MB</p>
                        <Button className="mt-4">Select File</Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Download Instructions
                        </Button>
                        <Button className="flex-1">
                          <Upload className="h-4 w-4 mr-2" />
                          Submit Assignment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  onClick={() => toggleExpand(assignment.id)}
                  className="w-full flex items-center justify-center border-t pt-2"
                >
                  {expandedAssignment === assignment.id ? 'Hide Details' : 'View Details'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="submitted" className="mt-4 space-y-4">
          {submittedAssignments.map((assignment) => (
            <Card key={assignment.id} className="transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  {assignment.grade !== "Pending" ? (
                    <Badge variant="outline" className="font-medium">
                      Grade: {assignment.grade}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Pending Review</Badge>
                  )}
                </div>
                <div className="flex flex-wrap items-center text-sm gap-x-4 gap-y-1 text-muted-foreground">
                  <span>{assignment.course}</span>
                  <span className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Submitted: {assignment.submittedDate}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedAssignment === assignment.id ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="border-t pt-4 mb-4">
                    {assignment.feedback ? (
                      <>
                        <h4 className="font-medium mb-2">Teacher Feedback:</h4>
                        <div className="bg-secondary/50 rounded-md p-3 text-sm">
                          {assignment.feedback}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-muted-foreground italic">
                        No feedback provided yet. Your submission is still being reviewed.
                      </div>
                    )}
                    
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        View Submission
                      </Button>
                      <Button variant="ghost" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  onClick={() => toggleExpand(assignment.id)}
                  className="w-full flex items-center justify-center border-t pt-2"
                >
                  {expandedAssignment === assignment.id ? 'Hide Details' : 'View Details & Feedback'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentsPage;
