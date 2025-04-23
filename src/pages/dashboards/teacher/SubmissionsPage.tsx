
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SubmissionsPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Student Submissions</h2>
        <p className="text-muted-foreground">
          Review and grade your students' assignment submissions
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>
            View and manage all student submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No submissions found.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionsPage;
