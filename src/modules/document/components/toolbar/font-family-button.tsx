import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/providers/editor-store-provider";
import { ChevronDown } from "lucide-react";

type FontFamily = {
    label: string;
    value: string;
};

export const FONT_FAMILIES: FontFamily[] = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
];

export const FontFamilyButton = () => {
    const { editor } = useEditorStore((state) => state);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="xs"
                    variant="toolbar"
                    className="w-[120px] justify-between"
                >
                    <span className="truncate font-normal">
                        {editor?.getAttributes("textStyle").fontFamily ||
                            "Arial"}
                    </span>
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-1" align="start">
                {FONT_FAMILIES.map(({ label, value }) => (
                    <DropdownMenuItem
                        key={value}
                        className={cn(
                            editor?.getAttributes("textStyle").fontFamily ===
                                value && "bg-accent text-accent-foreground",
                        )}
                        style={{ fontFamily: value }}
                        onClick={() =>
                            editor?.chain().focus().setFontFamily(value).run()
                        }
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
