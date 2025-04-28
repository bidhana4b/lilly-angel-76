
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, Clock, FileText, Plus, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import CourseFormWizard from "@/components/course/CourseFormWizard";

interface Course {
  id: string;
  title: string;
  description: string;
  students: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  materials: { name: string; type: string }[];
  assignments: { title: string; dueDate: string }[];
}

const mockCourses: Course[] = [
  {
    id: "c1",
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build responsive websites.",
    students: 45,
    duration: "12 weeks",
    level: "Beginner",
    materials: [
      { name: "HTML Basics.pdf", type: "pdf" },
      { name: "CSS Introduction", type: "video" },
      { name: "JavaScript Fundamentals", type: "document" }
    ],
    assignments: [
      { title: "Create a Personal Portfolio", dueDate: "May 15, 2025" },
      { title: "Build a Responsive Landing Page", dueDate: "June 1, 2025" }
    ]
  },
  {
    id: "c2",
    title: "React Framework Mastery",
    description: "Master React.js framework for building dynamic single-page applications.",
    students: 32,
    duration: "8 weeks",
    level: "Intermediate",
    materials: [
      { name: "React Components.pdf", type: "pdf" },
      { name: "State Management", type: "video" },
      { name: "Hooks Deep Dive", type: "document" }
    ],
    assignments: [
      { title: "Create a Task Management App", dueDate: "May 10, 2025" },
      { title: "Build a Weather Dashboard", dueDate: "May 25, 2025" }
    ]
  },
  {
    id: "c3",
    title: "Advanced JavaScript Patterns",
    description: "Explore advanced JavaScript concepts and design patterns for complex applications.",
    students: 28,
    duration: "6 weeks",
    level: "Advanced",
    materials: [
      { name: "Design Patterns.pdf", type: "pdf" },
      { name: "Async Programming", type: "video" },
      { name: "Performance Optimization", type: "document" }
    ],
    assignments: [
      { title: "Implement a Virtual DOM", dueDate: "May 20, 2025" },
      { title: "Create a State Management Library", dueDate: "June 5, 2025" }
    ]
  },
  {
    id: "c4",
    title: "UI/UX Design Principles",
    description: "Learn fundamental principles of user interface and user experience design.",
    students: 38,
    duration: "10 weeks",
    level: "Beginner",
    materials: [
      { name: "Design Fundamentals.pdf", type: "pdf" },
      { name: "Wireframing Basics", type: "video" },
      { name: "User Research Methods", type: "document" }
    ],
    assignments: [
      { title: "Create a Mobile App Prototype", dueDate: "May 12, 2025" },
      { title: "Conduct Usability Testing", dueDate: "May 29, 2025" }
    ]
  }
];

const CourseCard: React.FC<{ course: Course; onClick: () => void; onEdit: () => void }> = ({ course, onClick, onEdit }) => (
  <Card 
    className="transition-all duration-300 hover:shadow-md cursor-pointer hover:-translate-y-1"
  >
    <CardContent className="p-6">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between">
            <h3 className="text-xl font-bold">{course.title}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground mt-1">{course.description}</p>
          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
            course.level === "Beginner" ? "bg-green-100 text-green-800" : 
            course.level === "Intermediate" ? "bg-blue-100 text-blue-800" : 
            "bg-purple-100 text-purple-800"
          }`}>
            {course.level}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm border-t border-b py-2">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.students} Students</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>{course.materials.length} Materials</span>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<string | null>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const filteredCourses = mockCourses.filter(
    course => course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const handleCreateCourse = (courseData: any) => {
    console.log("New course created:", courseData);
    toast({
      title: "Course Created",
      description: `${courseData.title} has been created and sent for review.`,
    });
    setShowAddCourse(false);
  };

  const handleEditCourse = (course: Course) => {
    setCourseToEdit(course.id);
    setShowEditCourse(true);
  };

  const handleUpdateCourse = (courseData: any) => {
    console.log("Course updated:", courseData);
    toast({
      title: "Course Updated",
      description: `${courseData.title} has been updated successfully.`,
    });
    setShowEditCourse(false);
    setCourseToEdit(null);
  };
  
  // If we're showing the add course form, render that instead
  if (showAddCourse) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setShowAddCourse(false)}
            className="hover:bg-transparent hover:text-blue-600 p-0"
          >
            ← Back to Courses
          </Button>
        </div>
        <CourseFormWizard 
          onSubmit={handleCreateCourse}
          mode="teacher"
        />
      </div>
    );
  }

  // If we're showing the edit course form, render that instead
  if (showEditCourse && courseToEdit) {
    const course = mockCourses.find(c => c.id === courseToEdit);
    
    if (!course) return null;
    
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => {
              setShowEditCourse(false);
              setCourseToEdit(null);
            }}
            className="hover:bg-transparent hover:text-blue-600 p-0"
          >
            ← Back to Courses
          </Button>
        </div>
        <CourseFormWizard
          onSubmit={handleUpdateCourse}
          initialData={{
            id: course.id,
            title: course.title,
            description: course.description,
            shortDescription: course.description.substring(0, 100),
            level: course.level.toLowerCase(),
            duration: course.duration.split(" ")[0],
            durationUnit: course.duration.split(" ")[1],
            modules: [
              {
                id: "module-1",
                title: "Introduction",
                description: "Get started with the basics",
                expanded: true,
                lessons: [
                  { id: "lesson-1", title: "Welcome to the course", duration: "00:10", type: "video" },
                  { id: "lesson-2", title: "Course overview", duration: "00:15", type: "video" }
                ]
              }
            ],
            objectives: [
              { id: "obj-1", text: "Learn the fundamentals" },
              { id: "obj-2", text: "Build real-world projects" }
            ],
            requirements: [
              { id: "req-1", text: "Basic programming knowledge" }
            ]
          }}
          mode="teacher"
        />
      </div>
    );
  }
  
  // Default view showing the course list
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
          <p className="text-muted-foreground">
            View and manage all courses you are teaching
          </p>
        </div>
        <Button onClick={() => setShowAddCourse(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>
      
      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course}
            onClick={() => handleCourseClick(course)}
            onEdit={() => handleEditCourse(course)}
          />
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No courses found matching your search criteria.</p>
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedCourse && (
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedCourse.title}</DialogTitle>
              <DialogDescription>{selectedCourse.description}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {selectedCourse.students} Students
                </div>
                <div className="bg-green-50 px-3 py-1 rounded-full text-green-700 text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedCourse.duration}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  selectedCourse.level === "Beginner" ? "bg-green-100 text-green-800" : 
                  selectedCourse.level === "Intermediate" ? "bg-blue-100 text-blue-800" : 
                  "bg-purple-100 text-purple-800"
                }`}>
                  {selectedCourse.level} Level
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Course Materials</h3>
                <div className="space-y-2">
                  {selectedCourse.materials.map((material, i) => (
                    <div key={i} className="flex items-center justify-between border p-2 rounded-md">
                      <span>{material.name}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{material.type}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Assignments</h3>
                <div className="space-y-2">
                  {selectedCourse.assignments.map((assignment, i) => (
                    <div key={i} className="flex items-center justify-between border p-2 rounded-md">
                      <span>{assignment.title}</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">Due: {assignment.dueDate}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline">Syllabus</Button>
                <Button variant="outline">Assignments</Button>
                <Button>Student List</Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default CoursesPage;
