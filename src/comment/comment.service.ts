import {db} from "../drizzle/db"
import {eq} from "drizzle-orm"
import{TIcomment,TScomment,tableComment,}from "../drizzle/schema"
export const commentService = async (limit?: number): Promise<TScomment[] | null> => {
    if (limit) {
        return await db.query.tableComment.findMany({
            limit: limit
        });
    }
    return await db.query.tableComment.findMany();
}

export const getcommentService = async (id: number): Promise<TIcomment | undefined> => {
    return await db.query.tableComment.findFirst({
        where: eq(tableComment.id, id)
    })
}

export const postcommentService = async (city: TIcomment) => {
    await db.insert(tableComment).values(city)
    return "comment posted successfully";
}

export const updatecommentService = async (id: number, city: TIcomment) => {
    await db.update(tableComment).set(city).where(eq(tableComment.id, id))
    return "comment updated successfully";
}

export const deletecommentService = async (id: number) => {
    await db.delete(tableComment).where(eq(tableComment.id, id))
    return "comment deleted successfully";
}
