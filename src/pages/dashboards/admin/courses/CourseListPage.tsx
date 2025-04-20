
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { Edit, Trash2, Users, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnail: string;
  teacher: string;
  price: number;
  enrolledStudents: number;
  status: "active" | "inactive";
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced Mathematics",
    description: "Comprehensive advanced mathematics course",
    duration: "6 months",
    category: "Mathematics",
    thumbnail: "/course-1.jpg",
    teacher: "John Smith",
    price: 299,
    enrolledStudents: 25,
    status: "active",
  },
  {
    id: "2",
    title: "English Literature",
    description: "Classic literature analysis",
    duration: "4 months",
    category: "Language",
    thumbnail: "/course-2.jpg",
    teacher: "Emma Wilson",
    price: 199,
    enrolledStudents: 32,
    status: "active",
  },
];

const courseColumns = [
  { 
    header: "Title", 
    accessorKey: "title" as keyof Course,
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.title}</div>
        <div className="text-sm text-muted-foreground">{row.original.category}</div>
      </div>
    )
  },
  { 
    header: "Duration", 
    accessorKey: "duration" as keyof Course 
  },
  { 
    header: "Teacher", 
    accessorKey: "teacher" as keyof Course 
  },
  { 
    header: "Price", 
    accessorKey: "price" as keyof Course,
    cell: ({ row }) => (
      <div>${row.original.price}</div>
    )
  },
  { 
    header: "Students", 
    accessorKey: "enrolledStudents" as keyof Course,
    cell: ({ row }) => (
      <div className="flex items-center">
        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
        {row.original.enrolledStudents}
      </div>
    )
  },
  {
    header: "Status",
    accessorKey: "status" as keyof Course,
    cell: ({ row }) => (
      <Badge variant={row.original.status === "active" ? "success" : "secondary"}>
        {row.original.status}
      </Badge>
    )
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" title="View Students">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Edit Course">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Delete Course">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )
  }
];

export default function CourseListPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">All Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={mockCourses}
          columns={courseColumns}
          pageSize={10}
        />
      </CardContent>
    </Card>
  );
}
