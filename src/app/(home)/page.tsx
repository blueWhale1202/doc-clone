import { Navbar } from "@/modules/home/components/navbar";
import { TemplateGallery } from "@/modules/home/components/template-gallery";

export default async function HomePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <div className="fixed inset-x-0 top-0 z-10 h-16 bg-white">
                <Navbar />
            </div>
            <div className="mt-16">
                <TemplateGallery />
            </div>
        </div>
    );
}
