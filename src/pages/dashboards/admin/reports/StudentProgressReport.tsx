
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Printer } from "lucide-react";
import { StudentProgress } from "./types";
import { mockStudentProgress } from "./mockData";

const StudentProgressReport: React.FC = () => {
  const [studentProgress, setStudentProgress] = useState<StudentProgress[]>(mockStudentProgress);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  
  const { toast } = useToast();
  
  const filteredProgress = studentProgress.filter(item => {
    if (selectedCourse && selectedCourse !== "all" && item.course !== selectedCourse) return false;
    if (selectedStudent && selectedStudent !== "all" && item.studentId !== selectedStudent) return false;
    return true;
  });
  
  const courses = [...new Set(studentProgress.map(item => item.course))];
  const students = [...new Set(studentProgress.map(item => item.studentName))];
  
  const exportAsPDF = () => {
    // In a real app, this would generate a PDF
    toast({
      title: "Export Started",
      description: "Preparing PDF export of student progress report.",
      duration: 3000,
    });
  };
  
  const printReport = () => {
    window.print();
  };
  
  // Prepare data for chart
  const chartData = filteredProgress.map(student => ({
    name: student.studentName,
    attendance: student.attendance,
    assignments: (student.completedAssignments / student.totalAssignments) * 100,
    grade: student.averageGrade
  }));
  
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'needsImprovement': return 'bg-orange-100 text-orange-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string): string => {
    return status
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-6 print:space-y-4 animate-fade-in">
      <div className="print:hidden flex flex-col lg:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Student Progress Report</CardTitle>
            <CardDescription>
              Filter and view student academic performance metrics
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Filter by Course</label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map(course => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Filter by Student</label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Students" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    {students.map((student, index) => (
                      <SelectItem key={index} value={studentProgress.find(s => s.studentName === student)?.studentId || `student-${index}`}>
                        {student}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={printReport}
              >
                <Printer className="h-4 w-4" /> Print
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={exportAsPDF}
              >
                <Download className="h-4 w-4" /> Export as PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="print:hidden">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barGap={4} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tickSize={4} />
                  <YAxis tickSize={4} />
                  <Tooltip />
                  <Legend />
                  <Bar name="Attendance %" dataKey="attendance" fill="#9b87f5" />
                  <Bar name="Assignments %" dataKey="assignments" fill="#7E69AB" />
                  <Bar name="Average Grade" dataKey="grade" fill="#6E59A5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="print:py-2">
          <CardTitle className="print:text-xl">Detailed Progress Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden print:border-none">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Assignments</TableHead>
                  <TableHead>Avg. Grade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProgress.length > 0 ? (
                  filteredProgress.map((student) => (
                    <TableRow key={student.studentId} className="hover:bg-muted/50">
                      <TableCell>
                        <div>{student.studentName}</div>
                        <div className="text-xs text-muted-foreground">{student.studentId}</div>
                      </TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.attendance}%</TableCell>
                      <TableCell>
                        {student.completedAssignments}/{student.totalAssignments}
                        <div className="text-xs text-muted-foreground">
                          {Math.round((student.completedAssignments / student.totalAssignments) * 100)}%
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{student.averageGrade}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(student.status)}`}>
                          {getStatusLabel(student.status)}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(student.lastActivity).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No student progress data found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="print:hidden">
          <div className="text-sm text-muted-foreground">
            Showing {filteredProgress.length} of {studentProgress.length} students
          </div>
        </CardFooter>
      </Card>
      
      <div className="print:block hidden text-xs text-gray-500 mt-4">
        Report generated on {new Date().toLocaleString()} by EduLearn Academy
      </div>
    </div>
  );
};

export default StudentProgressReport;
