
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Teacher, Course, mockTeachers, mockCourses } from "./teachers/teachersData";
import { TeacherTable } from "./teachers/TeacherTable";
import { TeacherForm } from "./teachers/TeacherForm";
import { AssignCourses } from "./teachers/AssignCourses";

// Teachers page manages tab state and all handlers
export default function TeachersPage() {
  const [activeTab, setActiveTab] = useState("all-teachers");
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const { toast } = useToast();

  // In a real app, this data would be from state/hooks.
  const [teachers] = useState<Teacher[]>(mockTeachers);
  const [courses] = useState<Course[]>(mockCourses);

  const handleAddTeacher = (data: Partial<Teacher>) => {
    console.log("New teacher data:", data);
    toast({
      title: selectedTeacher ? "Teacher Updated" : "Teacher Added",
      description: selectedTeacher
        ? "Teacher information updated successfully."
        : "New teacher has been added successfully and login credentials sent.",
    });
    setActiveTab("all-teachers");
    setSelectedTeacher(null);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setActiveTab("add-teacher");
  };

  const handleToggleStatus = (teacher: Teacher) => {
    const newStatus = teacher.status === "active" ? "blocked" : "active";
    console.log(`Toggling status for ${teacher.name} to ${newStatus}`);
    toast({
      title: "Status Updated",
      description: `${teacher.name} has been ${newStatus === "active" ? "unblocked" : "blocked"}.`,
    });
  };

  const handleSelectTeacherForCourse = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setSelectedCourses(teacher.assignedCourses);
    setActiveTab("assign-courses");
  };

  const handleAssignCourses = () => {
    if (!selectedTeacher) return;
    console.log(`Assigning courses for ${selectedTeacher.name}:`, selectedCourses);
    toast({
      title: "Courses Assigned",
      description: `Updated course assignments for ${selectedTeacher.name}`,
    });
    setActiveTab("all-teachers");
    setSelectedTeacher(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teachers</h2>
          <p className="text-muted-foreground">Manage your teaching staff and course assignments</p>
        </div>
        <Button onClick={() => {
          setSelectedTeacher(null);
          setActiveTab("add-teacher");
        }} className="gap-2 transition-all hover:scale-105">
          <Plus className="h-4 w-4" />
          Add Teacher
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-teachers">All Teachers</TabsTrigger>
          <TabsTrigger value="add-teacher">
            {selectedTeacher ? "Edit Teacher" : "Add Teacher"}
          </TabsTrigger>
          <TabsTrigger value="assign-courses">Assign Courses</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="all-teachers" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TeacherTable
                teachers={teachers}
                searchQuery={searchQuery}
                subjectFilter={subjectFilter}
                statusFilter={statusFilter}
                onSearchChange={setSearchQuery}
                onSubjectFilter={setSubjectFilter}
                onStatusFilter={setStatusFilter}
                onEdit={handleEditTeacher}
                onToggleStatus={handleToggleStatus}
                onAssignCourses={handleSelectTeacherForCourse}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="add-teacher" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TeacherForm
                teacher={selectedTeacher}
                onSubmit={handleAddTeacher}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="assign-courses" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AssignCourses
                teacher={selectedTeacher}
                courses={courses}
                selectedCourses={selectedCourses}
                setSelectedCourses={setSelectedCourses}
                onSubmit={handleAssignCourses}
              />
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
