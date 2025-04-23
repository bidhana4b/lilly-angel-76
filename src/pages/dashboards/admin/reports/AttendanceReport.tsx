
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { format } from "date-fns";
import { CalendarIcon, Download, Printer, Users } from "lucide-react";
import { AttendanceRecord } from "./types";
import { mockAttendanceRecords } from "./mockData";

const COLORS = ['#9b87f5', '#e5e7eb'];

const AttendanceReport: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);
  
  // Filter records by date range
  const filteredRecords = attendanceRecords.filter(record => {
    const recordDate = new Date(record.date);
    if (dateRange.from && recordDate < dateRange.from) return false;
    if (dateRange.to && recordDate > dateRange.to) return false;
    return true;
  });
  
  // Calculate total attendance stats
  const totalStudents = filteredRecords.reduce((sum, record) => sum + record.totalStudents, 0);
  const totalPresent = filteredRecords.reduce((sum, record) => sum + record.presentCount, 0);
  const totalAbsent = filteredRecords.reduce((sum, record) => sum + record.absentCount, 0);
  const attendanceRate = totalStudents > 0 ? (totalPresent / totalStudents) * 100 : 0;
  
  // Prepare data for chart
  const chartData = [
    { name: 'Present', value: totalPresent },
    { name: 'Absent', value: totalAbsent },
  ];
  
  const printReport = () => {
    window.print();
  };
  
  const exportReport = () => {
    // In a real app, this would generate a PDF or CSV
  };
  
  const viewAbsentees = (record: AttendanceRecord) => {
    setSelectedRecord(record);
  };

  return (
    <div className="space-y-6 print:space-y-4 animate-fade-in">
      <div className="print:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Attendance Report</CardTitle>
            <CardDescription>
              View attendance statistics across all courses
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full sm:w-auto">
                <label className="text-sm font-medium mb-1 block">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex gap-2 sm:self-end">
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
                  <Download className="h-4 w-4" /> Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full mt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{totalPresent}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-red-600">{totalAbsent}</p>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">Average Attendance Rate</p>
              <p className="text-2xl font-bold">{attendanceRate.toFixed(1)}%</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="print:py-2">
          <CardTitle className="print:text-xl">Daily Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden print:border-none">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Total Students</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Absent</TableHead>
                  <TableHead>Attendance Rate</TableHead>
                  <TableHead className="print:hidden">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={`${record.date}-${record.courseId}`} className="hover:bg-muted/50">
                      <TableCell>{format(new Date(record.date), "MMM dd, yyyy")}</TableCell>
                      <TableCell>{record.courseName}</TableCell>
                      <TableCell>{record.totalStudents}</TableCell>
                      <TableCell className="text-green-600">{record.presentCount}</TableCell>
                      <TableCell className="text-red-600">{record.absentCount}</TableCell>
                      <TableCell>
                        {((record.presentCount / record.totalStudents) * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell className="print:hidden">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewAbsentees(record)}
                          className="flex items-center gap-1"
                        >
                          <Users className="h-4 w-4" /> Absentees
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No attendance records found for the selected date range.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {selectedRecord && (
        <Card>
          <CardHeader>
            <CardTitle>
              Absentees for {format(new Date(selectedRecord.date), "MMMM dd, yyyy")} - {selectedRecord.courseName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedRecord.absentees.map((student) => (
                    <TableRow key={student.studentId}>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.studentName}</TableCell>
                      <TableCell>{student.reason || "Not provided"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="print:block hidden text-xs text-gray-500 mt-4">
        Report generated on {new Date().toLocaleString()} by EduLearn Academy
      </div>
    </div>
  );
};

export default AttendanceReport;
