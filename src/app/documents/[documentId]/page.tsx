import { Editor } from "@/modules/document/components/editor";
import { Navbar } from "@/modules/document/components/navbar";
import { Toolbar } from "@/modules/document/components/toolbar";

type Props = {
    params: Promise<{ documentId: string }>;
};

export default async function DocumentIdPage({ params }: Props) {
    // const { documentId } = await params;
    return (
        <div className="min-h-screen bg-[#fafbfd]">
            <div className="fixed inset-x-0 top-0 z-50 flex flex-col gap-y-2 bg-[#fafbfd] px-4 pt-2 print:hidden">
                <Navbar />
                <Toolbar />
            </div>
            <div className="pt-[114px] print:pt-0">
                <Editor />
            </div>
        </div>
    );
}
