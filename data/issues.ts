export interface Issue {
    id: string;
    title: string;
    issueNumber: number;
    date: string;
    pdfUrl: string;
    coverImage?: string; // New field for local cover images
}

// This list manages your issues.
// It is automatically updated by the 'npm run new-issue' command.
// You can also manually edit it if needed.
export const issues: Issue[] = [
  {
    id: "1768674372688xtqxf",
    title: "BacktoSchool copy",
    issueNumber: 999,
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    pdfUrl: "/lighthouse/issues/BacktoSchool copy.pdf",
    coverImage: "/lighthouse/covers/BacktoSchool copy.jpg",
  },
  {
    id: "17686743738551gc5b",
    title: "BacktoSchool",
    issueNumber: 999,
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    pdfUrl: "/lighthouse/issues/BacktoSchool.pdf",
    coverImage: "/lighthouse/covers/BacktoSchool.jpg",
  },
    {
        id: "1",
        title: "Spring 2024 - Fresh Perspectives",
        issueNumber: 1,
        date: "March 2024",
        pdfUrl: "https://drive.google.com/file/d/12345/preview", // Legacy link
        // No coverImage yet implies using the default fallback or existing logic
    },
    {
        id: "2",
        title: "Winter 2024 - Cozy Stories",
        issueNumber: 2,
        date: "December 2023",
        pdfUrl: "https://drive.google.com/file/d/12345/preview",
    },
    {
        id: "3",
        title: "Fall 2023 - New Beginnings",
        issueNumber: 3,
        date: "September 2023",
        pdfUrl: "https://drive.google.com/file/d/12345/preview",
    },
    {
        id: "4",
        title: "Summer 2023 - Adventure Time",
        issueNumber: 4,
        date: "June 2023",
        pdfUrl: "https://drive.google.com/file/d/12345/preview",
    },
    {
        id: "5",
        title: "Spring 2023 - Blooming Ideas",
        issueNumber: 5,
        date: "March 2023",
        pdfUrl: "https://drive.google.com/file/d/12345/preview",
    },
    {
        id: "6",
        title: "Winter 2023 - Holiday Special",
        issueNumber: 6,
        date: "December 2022",
        pdfUrl: "https://drive.google.com/file/d/12345/preview",
    },
];
