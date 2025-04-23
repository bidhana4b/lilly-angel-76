
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Routes, Route } from "react-router-dom";

const AssignmentList = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
        <p className="text-muted-foreground">
          Create and manage assignments for your courses
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
          <CardDescription>
            View and manage your assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No assignments created yet.</p>
        </CardContent>
      </Card>
    </div>
  );
};

const AssignmentForm = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Assignment</h2>
        <p className="text-muted-foreground">
          Create a new assignment for your students
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
          <CardDescription>
            Fill in the details for your new assignment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Assignment form will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

const AssignmentsPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<AssignmentList />} />
      <Route path="create" element={<AssignmentForm />} />
      <Route path="edit/:id" element={<AssignmentForm />} />
    </Routes>
  );
};

export default AssignmentsPage;
