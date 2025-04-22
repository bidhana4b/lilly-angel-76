
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table/DataTable";
import { Badge } from "@/components/ui/badge";
import { Edit, UserCheck, UserX, Book } from "lucide-react";
import { Teacher } from "./teachersData";

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

  const teacherColumns: Column<Teacher>[] = [
    { 
      header: "Teacher", 
      accessorKey: "name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img 
              src={row.profileImage} 
              alt={row.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      )
    },
    { header: "Phone", accessorKey: "phone" },
    { header: "Subject", accessorKey: "subject" },
    { 
      header: "Status", 
      accessorKey: "status",
      cell: (row) => (
        <Badge 
          variant={row.status === "active" ? "default" : "destructive"}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(row)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onToggleStatus(row)}
            className="h-8 w-8 p-0"
          >
            {row.status === "active" ? (
              <UserX className="h-4 w-4" />
            ) : (
              <UserCheck className="h-4 w-4" />
            )}
            <span className="sr-only">
              {row.status === "active" ? "Block" : "Unblock"}
            </span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onAssignCourses(row)}
            className="h-8 w-8 p-0"
          >
            <Book className="h-4 w-4" />
            <span className="sr-only">Assign Courses</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="text-xl font-semibold">All Teachers</CardTitle>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search teachers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="px-3 py-1 text-sm border rounded-md w-full sm:w-auto"
          />
          <select
            value={subjectFilter || ""}
            onChange={(e) => onSubjectFilter(e.target.value || null)}
            className="px-3 py-1 text-sm border rounded-md"
          >
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English Literature">English Literature</option>
            <option value="Physics">Physics</option>
          </select>
          <select
            value={statusFilter || ""}
            onChange={(e) => onStatusFilter(e.target.value || null)}
            className="px-3 py-1 text-sm border rounded-md"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={filteredTeachers}
          columns={teacherColumns}
          pageSize={5}
        />
      </CardContent>
    </Card>
  );
}
