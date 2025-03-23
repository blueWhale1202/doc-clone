"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Template = {
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

export const TemplateGallery = () => {
    const isCreating = false;

    return (
        <div className="bg-[#f1f3f4]">
            <div className="mx-auto flex max-w-6xl flex-col gap-y-4 px-16 py-6">
                <h3 className="font-medium">Start a new document</h3>
                <Carousel>
                    <CarouselContent className="-ml-4">
                        {TEMPLATES.map((template) => (
                            <CarouselItem
                                key={template.id}
                                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7"
                            >
                                <div
                                    className={cn(
                                        "flex aspect-[3/4] flex-col gap-y-2.5",
                                        isCreating &&
                                            "pointer-events-none opacity-50",
                                    )}
                                >
                                    <button
                                        style={{
                                            backgroundImage: `url(${template.imageUrl})`,
                                        }}
                                        className="flex size-full cursor-pointer flex-col items-center justify-center gap-y-4 rounded-sm border bg-white bg-cover bg-center bg-no-repeat transition hover:border-blue-500 hover:bg-blue-50"
                                        disabled={isCreating}
                                        onClick={() => {}}
                                    />
                                    <p className="truncate text-sm font-medium">
                                        {template.label}
                                    </p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};
