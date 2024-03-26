import { getTasks } from "../../../services/Task"

export async function GET() {
    const tasksList = await getTasks()
    return new Response(
        JSON.stringify({
            tasksList
        })
    )
}