import { TableCell, TableRow } from "@/components/ui/table";
import { useAuth } from "@clerk/nextjs";
import { format } from "date-fns";
import { Building2, CircleUser, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Role } from "../../../../convex/documents";
import { DocumentMenu } from "./document-menu";

type Props = {
    document: Doc<"documents">;
};

export const DocumentRow = ({ document }: Props) => {
    const router = useRouter();
    const { userId, orgRole } = useAuth();

    const onClick = () => {
        router.push(`/documents/${document._id}`);
    };

    const canRemove = userId === document.ownerId || orgRole === Role.Admin;

    return (
        <TableRow className="cursor-pointer" onClick={onClick}>
            <TableCell className="w-[50px]">
                <FileText className="text-muted-foreground size-6" />
            </TableCell>
            <TableCell className="font-medium md:w-[45%]">
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground [&_svg]:text-muted-foreground hidden items-center gap-2 md:flex [&_svg]:size-4">
                {document.organizationId ? <Building2 /> : <CircleUser />}
                {document.organizationId ? "Organization" : "Personal"}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell">
                {format(document._creationTime, "MMM d, yyyy")}
            </TableCell>
            <TableCell
                className="flex justify-end"
                onClick={(e) => e.stopPropagation()}
            >
                <DocumentMenu
                    id={document._id}
                    title={document.title}
                    canRemove={canRemove}
                />
            </TableCell>
        </TableRow>
    );
};
