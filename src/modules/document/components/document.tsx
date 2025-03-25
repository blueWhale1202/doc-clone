"use client";

import { Room } from "@/modules/room/components/room";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";

type Props = {
    preloadedDocument: Preloaded<typeof api.documents.get>;
};

export const Document = ({ preloadedDocument }: Props) => {
    const document = usePreloadedQuery(preloadedDocument);

    if (!document) {
        return null;
    }

    return (
        <Room documentId={document._id}>
            <div className="min-h-screen bg-[#fafbfd]">
                <div className="fixed inset-x-0 top-0 z-50 flex flex-col gap-y-2 bg-[#fafbfd] px-4 pt-2 print:hidden">
                    <Navbar id={document._id} title={document.title} />
                    <Toolbar />
                </div>
                <div className="pt-[120px] print:pt-0">
                    <Editor initialContent={document.initialContent} />
                </div>
            </div>
        </Room>
    );
};
