
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const classes = [
  {
    id: "1",
    course: "Web Development Fundamentals",
    title: "Advanced JavaScript Concepts",
    instructor: "Jane Smith",
    time: "Today, 4:00 PM - 5:30 PM",
    platform: "Zoom",
    isNow: true,
  },
  {
    id: "2",
    course: "UI/UX Design Principles",
    title: "User Research Methods",
    instructor: "Michael Johnson",
    time: "Today, 6:00 PM - 7:30 PM",
    platform: "Google Meet",
    isNow: false,
  },
  {
    id: "3",
    course: "Data Science Basics",
    title: "Introduction to Pandas",
    instructor: "Sarah Williams",
    time: "Tomorrow, 3:00 PM - 4:30 PM",
    platform: "Zoom",
    isNow: false,
  }
];

const LiveClassPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Join Live Class</h2>
        <p className="text-muted-foreground">
          Attend your scheduled live classes and access past recordings.
        </p>
      </div>
      
      <div className="grid gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className={`transition-all duration-200 hover:shadow-md ${cls.isNow ? 'border-primary border-2' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <CardTitle>{cls.title}</CardTitle>
                  <CardDescription>{cls.course}</CardDescription>
                </div>
                {cls.isNow ? (
                  <Badge variant="default" className="bg-primary text-white">
                    Now Live
                  </Badge>
                ) : null}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{cls.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{cls.platform}</span>
                  </div>
                </div>
                
                <div className="text-sm">
                  <p className="font-medium">Instructor</p>
                  <p>{cls.instructor}</p>
                </div>
                
                <div className="flex justify-end">
                  <Button variant={cls.isNow ? "default" : "outline"}>
                    {cls.isNow ? "Join Now" : "View Details"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Past Class Recordings</h3>
        <div className="grid gap-4">
          {[
            { id: "r1", title: "Introduction to JavaScript", date: "Apr 10, 2025", duration: "1h 15m" },
            { id: "r2", title: "CSS Grid Systems", date: "Apr 8, 2025", duration: "45m" },
            { id: "r3", title: "UI Design Principles", date: "Apr 5, 2025", duration: "1h 30m" },
          ].map((recording) => (
            <Card key={recording.id} className="bg-secondary/50">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{recording.title}</h4>
                    <div className="flex text-sm text-muted-foreground mt-1 gap-3">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" /> {recording.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" /> {recording.duration}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Watch</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveClassPage;
