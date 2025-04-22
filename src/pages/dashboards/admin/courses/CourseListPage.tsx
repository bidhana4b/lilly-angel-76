
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table/DataTable";
import { Edit, Trash2, Users, Eye, Search, BookOpen, FilterX, ArrowDown, ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

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

interface CourseListPageProps {
  onEditCourse?: (course: Course) => void;
}

// Demo data for courses
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
  {
    id: "3",
    title: "Introduction to Physics",
    description: "Basic physics principles for beginners",
    duration: "3 months",
    category: "Science",
    thumbnail: "/course-3.jpg",
    teacher: "Robert Johnson",
    price: 249,
    enrolledStudents: 18,
    status: "active",
  },
  {
    id: "4",
    title: "Digital Marketing Basics",
    description: "Learn the fundamentals of digital marketing",
    duration: "2 months",
    category: "Marketing",
    thumbnail: "/course-4.jpg",
    teacher: "Sarah Parker",
    price: 179,
    enrolledStudents: 45,
    status: "active",
  },
  {
    id: "5",
    title: "Web Development Bootcamp",
    description: "Comprehensive web development course",
    duration: "5 months",
    category: "Technology",
    thumbnail: "/course-5.jpg",
    teacher: "Michael Brown",
    price: 399,
    enrolledStudents: 28,
    status: "inactive",
  },
];

// Filter and sort options
const categories = ["All", "Mathematics", "Language", "Science", "Marketing", "Technology"];
const sortOptions = [
  { label: "Title: A-Z", value: "title-asc" },
  { label: "Title: Z-A", value: "title-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Students: Most to Least", value: "students-desc" },
];

export default function CourseListPage({ onEditCourse }: CourseListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<string>("title-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewStudentsDialog, setViewStudentsDialog] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const { toast } = useToast();

  // Handle viewing students enrolled in a course
  const handleViewStudents = (courseId: string) => {
    setSelectedCourseId(courseId);
    setViewStudentsDialog(true);
  };

  // Handle deleting a course
  const handleDeleteCourse = (courseId: string) => {
    toast({
      title: "Course deleted",
      description: "The course has been deleted successfully",
    });
    console.log("Delete course:", courseId);
  };

  // Handle editing a course
  const handleEditCourse = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    if (course && onEditCourse) {
      onEditCourse(course);
    }
  };

  // Filter and sort courses based on current selections
  const filteredCourses = mockCourses
    .filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.teacher.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "students-desc":
          return b.enrolledStudents - a.enrolledStudents;
        default:
          return 0;
      }
    });

  const pageSize = 4;
  const totalPages = Math.ceil(filteredCourses.length / pageSize);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const selectedCourse = selectedCourseId 
    ? mockCourses.find(course => course.id === selectedCourseId)
    : null;

  // Define mock students for the selected course
  const mockEnrolledStudents = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", enrollmentDate: "2023-10-15" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", enrollmentDate: "2023-10-16" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", enrollmentDate: "2023-10-18" },
  ];

  // Column definitions for the course table
  const courseColumns: Column<Course>[] = [
    { 
      header: "Course", 
      accessorKey: "title",
      cell: (row) => (
        <div className="flex gap-3 items-center">
          <div className="h-10 w-16 rounded bg-muted overflow-hidden">
            <img 
              src={row.thumbnail || "https://via.placeholder.com/160x90"} 
              alt={row.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/160x90";
              }}
            />
          </div>
          <div>
            <div className="font-medium">{row.title}</div>
            <div className="text-xs text-muted-foreground truncate max-w-[200px]">{row.category}</div>
          </div>
        </div>
      )
    },
    { 
      header: "Duration", 
      accessorKey: "duration"
    },
    { 
      header: "Teacher", 
      accessorKey: "teacher"
    },
    { 
      header: "Price", 
      accessorKey: "price",
      cell: (row) => (
        <div>${row.price.toFixed(2)}</div>
      )
    },
    { 
      header: "Students", 
      accessorKey: "enrolledStudents",
      cell: (row) => (
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
          {row.enrolledStudents}
        </div>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => (
        <Badge variant={row.status === "active" ? "default" : "secondary"}>
          {row.status}
        </Badge>
      )
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            title="View Students"
            onClick={() => handleViewStudents(row.id)}
            className="hover:text-blue-500 transition-colors"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            title="Edit Course"
            onClick={() => handleEditCourse(row.id)}
            className="hover:text-amber-500 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            title="Delete Course"
            onClick={() => handleDeleteCourse(row.id)}
            className="hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortOrder("title-asc");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl font-semibold">All Courses</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="flex items-center gap-1"
            >
              <FilterX className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-between">
                    {selectedCategory}
                    <ArrowDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="cursor-pointer"
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-between">
                    Sort
                    {sortOrder.includes("asc") ? (
                      <ArrowUp className="h-4 w-4 ml-2" />
                    ) : (
                      <ArrowDown className="h-4 w-4 ml-2" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {sortOptions.map((option) => (
                    <DropdownMenuItem 
                      key={option.value}
                      onClick={() => setSortOrder(option.value)}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="rounded-md border shadow-sm overflow-hidden">
            <DataTable
              data={paginatedCourses}
              columns={courseColumns}
              pageSize={pageSize}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No courses match your filters</p>
              <Button onClick={resetFilters} variant="link" className="mt-2">
                Reset filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Students Dialog */}
      <Dialog open={viewStudentsDialog} onOpenChange={setViewStudentsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Students Enrolled in {selectedCourse?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockEnrolledStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.enrollmentDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
