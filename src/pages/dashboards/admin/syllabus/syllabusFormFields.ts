
export const syllabusFormFields = [
  { 
    name: "title", 
    label: "Title", 
    type: "text" as const, 
    validation: { required: true },
    placeholder: "e.g. Advanced Physics - Spring 2025"
  },
  { 
    name: "subject", 
    label: "Subject", 
    type: "text" as const, 
    validation: { required: true },
    placeholder: "e.g. Physics, Mathematics, English"
  },
  { 
    name: "grade", 
    label: "Grade", 
    type: "text" as const, 
    validation: { required: true },
    placeholder: "e.g. 10, 11, 12"
  },
  { 
    name: "course", 
    label: "Course", 
    type: "text" as const, 
    validation: { required: true },
    placeholder: "Select the associated course"
  },
  {
    name: "description",
    label: "Description",
    type: "textarea" as const,
    validation: { required: false },
    placeholder: "Brief description of the syllabus content"
  }
];
