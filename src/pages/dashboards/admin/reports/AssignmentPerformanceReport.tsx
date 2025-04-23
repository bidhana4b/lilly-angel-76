
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { format } from "date-fns";
import { Download, Printer } from "lucide-react";
import { AssignmentPerformance } from "./types";
import { mockAssignmentPerformance } from "./mockData";

const COLORS = ['#4ade80', '#60a5fa', '#fcd34d', '#fb923c', '#f87171', '#e5e7eb'];

const AssignmentPerformanceReport: React.FC = () => {
  const [assignments, setAssignments] = useState<AssignmentPerformance[]>(mockAssignmentPerformance);
  const [selectedAssignment, setSelectedAssignment] = useState<string>("");
  
  const filteredAssignments = selectedAssignment 
    ? assignments.filter(a => a.assignmentId === selectedAssignment)
    : assignments;
  
  const currentAssignment = selectedAssignment 
    ? assignments.find(a => a.assignmentId === selectedAssignment)
    : null;
  
  // Prepare data for grade distribution pie chart
  const prepareGradeDistribution = (assignment: AssignmentPerformance | null) => {
    if (!assignment) return [];
    
    return [
      { name: 'A', value: assignment.gradeDistribution.A },
      { name: 'B', value: assignment.gradeDistribution.B },
      { name: 'C', value: assignment.gradeDistribution.C },
      { name: 'D', value: assignment.gradeDistribution.D },
      { name: 'F', value: assignment.gradeDistribution.F },
      { name: 'Not Graded', value: assignment.gradeDistribution['Not Graded'] }
    ];
  };
  
  // Prepare data for submission rate chart
  const submissionRateData = assignments.map(a => ({
    name: a.title.length > 20 ? a.title.substring(0, 20) + '...' : a.title,
    submissionRate: a.submissionRate,
    averageScore: a.averageScore
  }));
  
  const gradeDistributionData = prepareGradeDistribution(currentAssignment);
  
  const printReport = () => {
    window.print();
  };
  
  const exportReport = () => {
    // In a real app, this would generate a PDF or CSV
  };

  return (
    <div className="space-y-6 print:space-y-4 animate-fade-in">
      <div className="print:hidden flex flex-col lg:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle>Assignment Performance Report</CardTitle>
            <CardDescription>
              Analyze student performance across assignments
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Select Assignment</label>
                <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Assignments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Assignments</SelectItem>
                    {assignments.map(assignment => (
                      <SelectItem key={assignment.assignmentId} value={assignment.assignmentId}>
                        {assignment.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 md:justify-end md:self-end">
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
                  onClick={exportReport}
                >
                  <Download className="h-4 w-4" /> Export PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {!selectedAssignment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:hidden">
          <Card>
            <CardHeader>
              <CardTitle>Submission Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={submissionRateData} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Submission Rate (%)" dataKey="submissionRate" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Average Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={submissionRateData} barSize={20}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Average Score" dataKey="averageScore" fill="#7E69AB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {selectedAssignment && currentAssignment && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:hidden">
          <Card>
            <CardHeader>
              <CardTitle>Submission Overview</CardTitle>
              <CardDescription>{currentAssignment.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <div className="text-sm text-muted-foreground">Submission Rate</div>
                  <div className="text-3xl font-bold">{currentAssignment.submissionRate.toFixed(1)}%</div>
                  <div className="text-sm mt-1">
                    {currentAssignment.submissionCount} of {currentAssignment.totalStudents} students
                  </div>
                </div>
                
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <div className="text-sm text-muted-foreground">Average Score</div>
                  <div className="text-3xl font-bold">{currentAssignment.averageScore.toFixed(1)}</div>
                  <div className="text-sm mt-1">
                    Range: {currentAssignment.lowestScore} - {currentAssignment.highestScore}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center mt-6">
                <div className="text-sm font-medium mb-2">Course: {currentAssignment.course}</div>
                <div className="text-sm text-muted-foreground">
                  Due Date: {format(new Date(currentAssignment.dueDate), "MMMM dd, yyyy")}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => 
                        percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""}
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <Card>
        <CardHeader className="print:py-2">
          <CardTitle className="print:text-xl">
            {selectedAssignment ? "Detailed Assignment Performance" : "All Assignments Performance"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden print:border-none">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Grade Range</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment) => (
                    <TableRow key={assignment.assignmentId} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>{format(new Date(assignment.dueDate), "MMM dd, yyyy")}</TableCell>
                      <TableCell>
                        {assignment.submissionCount}/{assignment.totalStudents}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          assignment.submissionRate > 90 ? 'bg-green-100 text-green-800' : 
                          assignment.submissionRate > 75 ? 'bg-blue-100 text-blue-800' : 
                          assignment.submissionRate > 50 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {assignment.submissionRate.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">{assignment.averageScore.toFixed(1)}</TableCell>
                      <TableCell>{assignment.lowestScore} - {assignment.highestScore}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No assignments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {selectedAssignment && currentAssignment && (
        <Card className="print:block hidden">
          <CardHeader className="py-2">
            <CardTitle className="text-xl">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Grade</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(currentAssignment.gradeDistribution).map(([grade, count]) => (
                  <TableRow key={grade}>
                    <TableCell>{grade}</TableCell>
                    <TableCell>{count}</TableCell>
                    <TableCell>
                      {((count / currentAssignment.submissionCount) * 100).toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      
      <div className="print:block hidden text-xs text-gray-500 mt-4">
        Report generated on {new Date().toLocaleString()} by EduLearn Academy
      </div>
    </div>
  );
};

export default AssignmentPerformanceReport;
