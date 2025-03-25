import { convex } from "@/lib/convex";
import { liveblocks } from "@/lib/liveblocks";
import { auth, currentUser } from "@clerk/nextjs/server";
import stc from "string-to-color";
import { api } from "../../../../convex/_generated/api";

export async function POST(request: Request) {
    const { sessionClaims } = await auth();

    if (!sessionClaims) {
        return new Response("Unauthorized", { status: 401 });
    }

    const user = await currentUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { room } = await request.json();
    const document = await convex.query(api.documents.get, { id: room });

    if (!document) {
        return new Response("Not found", { status: 404 });
    }

    const isOwner = document.ownerId === user.id;
    const isMember = document.organizationId === String(sessionClaims.org_id);

    if (!isOwner && !isMember) {
        return new Response("Unauthorized", { status: 401 });
    }

    const name =
        user.fullName || user.emailAddresses[0].emailAddress || "Anonymous";
    const session = liveblocks.prepareSession(user.id, {
        userInfo: {
            name,
            avatar: user.imageUrl,
            color: stc(`${name} dark`),
        },
    });

    session.allow(room, session.FULL_ACCESS);
    const { status, body } = await session.authorize();

    return new Response(body, { status });
}
