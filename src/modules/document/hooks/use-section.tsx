import { useEditorStore } from "@/providers/editor-store-provider";
import {
    Bold,
    Italic,
    ListTodo,
    LucideIcon,
    MessageSquarePlus,
    Printer,
    Redo2,
    RemoveFormatting,
    SpellCheck,
    Underline,
    Undo2,
} from "lucide-react";

export type Section = {
    label: string;
    icon: LucideIcon;
    isActive?: boolean;
    onClick: () => void;
};

export const useSections = () => {
    const { editor } = useEditorStore((state) => state);

    const sections: Section[][] = [
        [
            {
                label: "Undo",
                icon: Undo2,
                onClick: () => editor?.chain().focus().undo().run(),
            },
            {
                label: "Redo",
                icon: Redo2,
                onClick: () => editor?.chain().focus().redo().run(),
            },
            {
                label: "Print",
                icon: Printer,
                onClick: () => window.print(),
            },
            {
                label: "Spell Check",
                icon: SpellCheck,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck");

                    editor?.view.dom.setAttribute(
                        "spellcheck",
                        current === "true" ? "false" : "true",
                    );
                },
            },
        ],
        [
            {
                label: "Bold",
                icon: Bold,
                isActive: editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: Italic,
                isActive: editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: Underline,
                isActive: editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            },
        ],
        [
            {
                label: "Comment",
                icon: MessageSquarePlus,
                onClick: () => console.log("Comment"),
                isActive: false,
            },
            {
                label: "List Todo",
                icon: ListTodo,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive("taskList"),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormatting,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
            },
        ],
    ];

    return sections;
};
