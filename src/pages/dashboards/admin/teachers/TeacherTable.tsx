
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table/DataTable";
import { Badge } from "@/components/ui/badge";
import { Edit, UserCheck, UserX, Book, Search } from "lucide-react";
import { Teacher } from "./teachersData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface TeacherTableProps {
  teachers: Teacher[];
  searchQuery: string;
  subjectFilter: string | null;
  statusFilter: string | null;
  onSearchChange: (query: string) => void;
  onSubjectFilter: (subject: string | null) => void;
  onStatusFilter: (status: string | null) => void;
  onEdit: (teacher: Teacher) => void;
  onToggleStatus: (teacher: Teacher) => void;
  onAssignCourses: (teacher: Teacher) => void;
}

export function TeacherTable({
  teachers,
  searchQuery,
  subjectFilter,
  statusFilter,
  onSearchChange,
  onSubjectFilter,
  onStatusFilter,
  onEdit,
  onToggleStatus,
  onAssignCourses,
}: TeacherTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Apply filters
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      searchQuery === "" ||
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      !subjectFilter || teacher.subject === subjectFilter;
    const matchesStatus =
      !statusFilter || teacher.status === statusFilter;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  // Get paginated data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTeachers = filteredTeachers.slice(startIndex, endIndex);

  const teacherColumns: Column<Teacher>[] = [
    { 
      header: "Teacher", 
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img 
              src={row.original.profileImage} 
              alt={row.original.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      )
    },
    { header: "Phone", accessorKey: "phone" },
    { header: "Subject", accessorKey: "subject" },
    { 
      header: "Status", 
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge 
          variant={row.original.status === "active" ? "default" : "destructive"}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(row.original)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onToggleStatus(row.original)}
            className="h-8 w-8 p-0"
          >
            {row.original.status === "active" ? (
              <UserX className="h-4 w-4" />
            ) : (
              <UserCheck className="h-4 w-4" />
            )}
            <span className="sr-only">
              {row.original.status === "active" ? "Block" : "Unblock"}
            </span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onAssignCourses(row.original)}
            className="h-8 w-8 p-0"
          >
            <Book className="h-4 w-4" />
            <span className="sr-only">Assign Courses</span>
          </Button>
        </div>
      ),
    },
  ];

  // Get unique subjects for the filter dropdown
  const subjects = Array.from(new Set(teachers.map(teacher => teacher.subject)));

  return (
    <Card>
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-xl font-semibold">All Teachers</CardTitle>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-auto">
            <Select
              value={subjectFilter || ""}
              onValueChange={(value) => onSubjectFilter(value === "" ? null : value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-auto">
            <Select
              value={statusFilter || ""}
              onValueChange={(value) => onStatusFilter(value === "" ? null : value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <DataTable
          data={paginatedTeachers}
          columns={teacherColumns}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </CardContent>
    </Card>
  );
}
