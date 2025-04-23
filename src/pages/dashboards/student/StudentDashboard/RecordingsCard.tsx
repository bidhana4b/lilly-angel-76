
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const recordings = [
  { title: "Introduction to JavaScript", duration: "1h 15m", date: "Apr 10, 2025", watched: true },
  { title: "CSS Grid Systems", duration: "45m", date: "Apr 8, 2025", watched: true },
  { title: "UI Design Principles", duration: "1h 30m", date: "Apr 5, 2025", watched: false },
];

const RecordingsCard: React.FC = () => (
  <Card className="md:col-span-2 lg:col-span-3 transition-all duration-200 hover:shadow-md student-recordings">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Class Recordings</span>
        <Video className="h-5 w-5 text-primary" />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recordings.map((recording, i) => (
          <Card key={i} className="bg-secondary/50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{recording.title}</h4>
                {recording.watched && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Watched</span>
                )}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{recording.duration}</span>
                <span>{recording.date}</span>
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                {recording.watched ? "Rewatch" : "Watch Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button variant="ghost" asChild>
          <Link to="/dashboard/student/live-class">
            View All Recordings <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default RecordingsCard;
