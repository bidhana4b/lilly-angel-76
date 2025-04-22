
export const syllabusFormFields = [
  { name: "title", label: "Title", type: "text" as const, validation: { required: true } },
  { name: "subject", label: "Subject", type: "text" as const, validation: { required: true } },
  { name: "grade", label: "Grade", type: "text" as const, validation: { required: true } },
  { name: "course", label: "Course", type: "text" as const, validation: { required: true } }
];
