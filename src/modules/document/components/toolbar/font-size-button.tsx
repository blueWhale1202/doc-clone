import { useEditorStore } from "@/providers/editor-store-provider";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export const FontSizeButton = () => {
    const { editor } = useEditorStore((state) => state);

    const currentFontSize = editor?.getAttributes("textStyle").fontSize
        ? editor.getAttributes("textStyle").fontSize.replace("px", "")
        : "16";

    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false);

    const updateFontSize = (value: string) => {
        const size = parseInt(value);

        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setFontSize(value);
            setInputValue(value);
            setIsEditing(false);
        }
    };

    const increment = () => {
        const size = parseInt(fontSize) + 1;
        updateFontSize(size.toString());
    };

    const decrement = () => {
        const size = parseInt(fontSize) - 1;

        if (size > 0) {
            updateFontSize(size.toString());
        }
    };

    return (
        <div className="flex items-center gap-x-0.5">
            <button
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/80"
                onClick={decrement}
            >
                <Minus className="size-4" />
            </button>
            {isEditing ? (
                <input
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    autoFocus
                    onBlur={() => {
                        updateFontSize(inputValue);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            updateFontSize(inputValue);
                            editor?.commands.focus();
                        }
                    }}
                    className="h-7 w-10 rounded-sm border border-neutral-400 bg-transparent text-center text-sm focus:ring-0 focus:outline-none"
                />
            ) : (
                <button
                    className="h-7 w-10 cursor-text rounded-sm border border-neutral-400 bg-transparent text-center text-sm"
                    onClick={() => {
                        setIsEditing(true);
                        setFontSize(currentFontSize);
                    }}
                >
                    {currentFontSize}
                </button>
            )}
            <button
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/80"
                onClick={increment}
            >
                <Plus className="size-4" />
            </button>
        </div>
    );
};
