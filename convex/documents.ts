import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export type OrganizationId = string | null;
export enum Role {
    Admin = "org:admin",
    Member = "org:member",
}

export const list = query({
    args: {
        paginationOpts: paginationOptsValidator,
        search: v.optional(v.string()),
    },
    handler: async (ctx, { paginationOpts, search }) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = user.org_id as OrganizationId;

        if (search) {
            if (organizationId) {
                return await ctx.db
                    .query("documents")
                    .withSearchIndex("by_title", (q) =>
                        q
                            .search("title", search)
                            .eq("organizationId", organizationId),
                    )
                    .paginate(paginationOpts);
            }

            return await ctx.db
                .query("documents")
                .withSearchIndex("by_title", (q) =>
                    q.search("title", search).eq("ownerId", user.subject),
                )
                .paginate(paginationOpts);
        }

        if (organizationId) {
            return await ctx.db
                .query("documents")
                .withIndex("by_organization_id", (q) =>
                    q.eq("organizationId", organizationId),
                )
                .order("desc")
                .paginate(paginationOpts);
        }

        return await ctx.db
            .query("documents")
            .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
            .order("desc")
            .paginate(paginationOpts);
    },
});

export const create = mutation({
    args: {
        title: v.optional(v.string()),
        initialContent: v.optional(v.string()),
    },
    handler: async (
        ctx,
        { title = "Untitled document", initialContent = "" },
    ) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = user.org_id as OrganizationId;

        return await ctx.db.insert("documents", {
            title,
            initialContent,
            ownerId: user.subject,
            organizationId: organizationId ?? undefined,
        });
    },
});

export const remove = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, { id }) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const document = await ctx.db.get(id);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        if (user.subject !== document.ownerId && user.role !== Role.Admin) {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.delete(id);
    },
});

export const update = mutation({
    args: { id: v.id("documents"), title: v.optional(v.string()) },
    handler: async (ctx, { id, title }) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const document = await ctx.db.get(id);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        const { ownerId, organizationId } = document;

        if (ownerId !== user.subject && organizationId !== user.org_id) {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.patch(id, { title });
    },
});

export const get = query({
    args: { id: v.id("documents") },
    handler: async (ctx, { id }) => {
        const document = await ctx.db.get(id);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        return document;
    },
});

export const getByIds = query({
    args: { ids: v.array(v.id("documents")) },
    handler: async (ctx, { ids }) => {
        const documents = [];

        for (const id of ids) {
            const document = await ctx.db.get(id);
            if (document) {
                documents.push({ id: document._id, name: document.title });
            } else {
                documents.push({ id, name: "[Removed]" });
            }
        }
        return documents;
    },
});
