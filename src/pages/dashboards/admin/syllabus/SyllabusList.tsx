
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/ui/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Eye, Download } from "lucide-react";
import { Syllabus, mockSyllabus } from "./syllabusData";

const syllabusColumns: Column<Syllabus>[] = [
  { header: "Title", accessorKey: "title" },
  { header: "Course", accessorKey: "course" },
  { header: "Subject", accessorKey: "subject" },
  { header: "Grade", accessorKey: "grade" },
  { header: "Last Updated", accessorKey: "lastUpdated" },
  { 
    header: "Type", 
    accessorKey: "uploadType",
    cell: (row: Syllabus) => {
      const typeLabels = {
        file: "PDF File",
        link: "Drive Link",
        editor: "Rich Text"
      };
      return typeLabels[row.uploadType];
    }
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (row: Syllabus) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    )
  }
];

export default function SyllabusList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-semibold">All Syllabi</CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <DataTable
          data={mockSyllabus}
          columns={syllabusColumns}
          pageSize={5}
        />
      </CardContent>
    </Card>
  );
}
