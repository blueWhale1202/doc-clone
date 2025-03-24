export type Template = {
    id: string;
    label: string;
    imageUrl: string;
};

export const TEMPLATES: Template[] = [
    {
        id: "blank",
        label: "Blank document",
        imageUrl: "galleries/blank-document.png",
    },
    {
        id: "software-proposal",
        label: "Software development proposal",
        imageUrl: "galleries/software-proposal.png",
    },
    {
        id: "project-proposal",
        label: "Project proposal",
        imageUrl: "galleries/project-proposal.png",
    },
    {
        id: "business-letter",
        label: "Business letter",
        imageUrl: "galleries/business-letter.png",
    },
    {
        id: "resume",
        label: "Resume",
        imageUrl: "galleries/resume.png",
    },
    {
        id: "cover-letter",
        label: "Cover letter",
        imageUrl: "galleries/cover-letter.png",
    },
    {
        id: "report",
        label: "Report",
        imageUrl: "galleries/report.png",
    },
];
