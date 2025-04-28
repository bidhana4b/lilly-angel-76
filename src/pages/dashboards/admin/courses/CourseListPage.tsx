
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { Plus, BookOpen, Search, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Course } from "./CoursesPage";

// Sample course data
const mockCourses = [
  {
    id: "course-1",
    title: "Advanced JavaScript Programming",
    description: "Master modern JavaScript concepts and techniques",
    shortDescription: "Master modern JavaScript concepts and techniques",
    category: "Technology",
    level: "intermediate",
    thumbnail: "/lovable-uploads/1a43599f-f4e1-4ada-9439-efad90c5a949.png",
    price: "199.99",
    duration: "8 weeks",
    teachers: ["Robert Johnson", "Michael Brown"],
    studentCount: 185,
    rating: 4.8,
    reviewCount: 56,
    isFeatured: true
  },
  {
    id: "course-2",
    title: "Web Design Fundamentals",
    description: "Learn the principles of modern web design",
    shortDescription: "Learn the principles of modern web design",
    category: "Design",
    level: "beginner",
    thumbnail: "/lovable-uploads/6ec0235d-fd2f-4929-9c0b-149301b598ae.png",
    price: "149.99",
    duration: "6 weeks",
    teachers: ["Emma Wilson"],
    studentCount: 243,
    rating: 4.7,
    reviewCount: 82,
    isFeatured: false
  },
  {
    id: "course-3",
    title: "Data Science Essentials",
    description: "Introduction to data analysis and visualization",
    shortDescription: "Introduction to data analysis and visualization",
    category: "Science",
    level: "intermediate",
    thumbnail: "/lovable-uploads/d9ee0f94-2914-4175-abb5-3a8887aae076.png",
    price: "249.99",
    duration: "10 weeks",
    teachers: ["John Smith"],
    studentCount: 154,
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true
  },
];

export default function CourseListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCourses = mockCourses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Custom columns definition for the data table
  const columns = [
    {
      header: "Course",
      accessorKey: "title",
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded overflow-hidden">
            <img 
              src={row.original.thumbnail} 
              alt={row.original.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{row.original.title}</div>
            <div className="text-xs text-muted-foreground">{row.original.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Level",
      accessorKey: "level",
      cell: ({ row }: { row: any }) => (
        <Badge variant="outline" className={`
          ${row.original.level === 'beginner' ? 'bg-green-50 text-green-700' : 
            row.original.level === 'intermediate' ? 'bg-blue-50 text-blue-700' : 
            'bg-purple-50 text-purple-700'}
        `}>
          {row.original.level.charAt(0).toUpperCase() + row.original.level.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }: { row: any }) => (
        <div className="font-medium">${row.original.price}</div>
      ),
    },
    {
      header: "Duration",
      accessorKey: "duration",
    },
    {
      header: "Students",
      accessorKey: "studentCount",
    },
    {
      header: "Featured",
      accessorKey: "isFeatured",
      cell: ({ row }: { row: any }) => (
        row.original.isFeatured ? (
          <Badge className="bg-gradient-to-r from-orange-400 to-orange-600">
            Featured
          </Badge>
        ) : (
          <span className="text-gray-400 text-xs">Not Featured</span>
        )
      ),
    },
    {
      header: "Actions",
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/admin/courses/edit/${row.original.id}`}>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <Trash className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">Manage course offerings and assignments</p>
        </div>
        <Link to="/dashboard/admin/courses/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">All Courses</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredCourses}
            columns={columns}
            pageSize={10}
          />
        </CardContent>
      </Card>
    </div>
  );
}
