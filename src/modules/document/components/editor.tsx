"use client";

import { useEditorStore } from "@/providers/editor-store-provider";

import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";

import { FontSize } from "./extensions/font-size";
import { LineHeight } from "./extensions/line-height";

import FileHandler from "@tiptap-pro/extension-file-handler";
import { Ruler } from "./ruler";

import { Threads } from "@/modules/room/components/threads";
import {
    FloatingToolbar,
    useLiveblocksExtension,
} from "@liveblocks/react-tiptap";
import { useRuler } from "../hooks/use-ruler";

type Props = {
    initialContent?: string;
};

export const Editor = ({ initialContent }: Props) => {
    const { setEditor } = useEditorStore((state) => state);

    const liveblocks = useLiveblocksExtension({
        initialContent,
        offlineSupport_experimental: true,
    });

    const [leftPadding] = useRuler("leftPadding");
    const [rightPadding] = useRuler("rightPadding");

    const editor = useEditor({
        immediatelyRender: false,
        autofocus: true,

        onCreate({ editor }) {
            setEditor(editor);
        },

        onDestroy() {
            setEditor(null);
        },

        onUpdate({ editor }) {
            setEditor(editor);
        },

        onSelectionUpdate({ editor }) {
            setEditor(editor);
        },

        onTransaction({ editor }) {
            setEditor(editor);
        },

        onFocus({ editor }) {
            setEditor(editor);
        },

        onBlur({ editor }) {
            setEditor(editor);
        },

        onContentError({ editor }) {
            setEditor(editor);
        },

        editorProps: {
            attributes: {
                style: `padding-left: ${leftPadding}px; padding-right: ${rightPadding}px;`,
                class: "flex min-h-[1054px] w-[816px] cursor-text flex-col border border-[#c7c7c7] bg-white py-10 pr-14 focus:outline-none print:border-0",
            },
        },
        extensions: [
            liveblocks,

            StarterKit.configure({
                history: false,
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            ImageResize,
            Underline,
            TextStyle,
            FontFamily,
            Color,
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
                protocols: ["http", "https"],
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
                defaultAlignment: "left",
            }),
            FontSize,
            LineHeight.configure({
                types: ["heading", "paragraph"],
                defaultLineHeight: "normal",
            }),
            FileHandler.configure({
                allowedMimeTypes: [
                    "image/png",
                    "image/jpeg",
                    "image/gif",
                    "image/webp",
                ],
                onDrop(editor, files, pos) {
                    files.forEach((file) => {
                        const reader = new FileReader();

                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            editor
                                .chain()
                                .insertContentAt(pos, {
                                    type: "image",
                                    attrs: {
                                        src: reader.result,
                                    },
                                })
                                .focus()
                                .run();
                        };
                    });
                },
                onPaste(editor, files, pasteContent) {
                    files.forEach((file) => {
                        if (pasteContent) {
                            console.log(
                                "🚀 ~ onPaste ~ pasteContent:",
                                pasteContent,
                            );
                        }

                        const reader = new FileReader();

                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            editor
                                .chain()
                                .insertContent({
                                    type: "image",
                                    attrs: {
                                        src: reader.result,
                                    },
                                })
                                .focus()
                                .run();
                        };
                    });
                },
            }),
        ],
    });

    return (
        <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:overflow-visible print:bg-white print:p-0">
            <Ruler />
            <div className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
                <EditorContent editor={editor} />
                <Threads editor={editor} />
                <FloatingToolbar editor={editor} />
            </div>
        </div>
    );
};
