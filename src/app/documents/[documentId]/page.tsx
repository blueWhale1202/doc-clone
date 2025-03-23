import { Editor } from "@/modules/document/components/editor";
import { Toolbar } from "@/modules/document/components/toolbar";

type Props = {
    params: Promise<{ documentId: string }>;
};

export default async function DocumentIdPage({ params }: Props) {
    // const { documentId } = await params;
    return (
        <div className="min-h-screen bg-[#fafbfd]">
            <Toolbar />
            <Editor />
        </div>
    );
}
