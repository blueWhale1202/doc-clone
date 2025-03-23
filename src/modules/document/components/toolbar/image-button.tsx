import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/providers/editor-store-provider";
import { ImageIcon, Search, UploadIcon } from "lucide-react";
import { useState } from "react";

export const ImageButton = () => {
    const { editor } = useEditorStore((state) => state);
    const [isOpen, setIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const onChange = (url: string) => {
        editor?.chain().focus().setImage({ src: url }).run();
    };

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                console.log("🚀 ~ onUpload ~ file:", file);
                // URL.revokeObjectURL(imageUrl);
                const url = URL.createObjectURL(file);
                console.log("🚀 ~ onUpload ~ url:", url);
                setImageUrl(url);
            }
        };

        input.click();
    };

    const onSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl);
            setImageUrl("");
            setIsOpen(false);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert image URL</DialogTitle>
                    </DialogHeader>

                    <Input
                        placeholder="Insert image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={onSubmit}>Insert</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80">
                        <ImageIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={onUpload}
                        // Disable until we can use vercel blob storage
                        disabled={true}
                    >
                        <UploadIcon className="mr-2 size-4" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsOpen(true)}>
                        <Search className="mr-2 size-4" />
                        Past image URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
