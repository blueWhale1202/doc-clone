import { FileCheck } from "lucide-react";

export const DocumentInput = () => {
    return (
        <div className="flex items-center gap-1">
            <span className="cursor-pointer truncate px-1.5 text-lg">
                Untitled Document
            </span>
            <FileCheck className="text-foreground size-4" />
        </div>
    );
};
