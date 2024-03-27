import type { APIContext } from "astro"
import { createTasks, getTasks } from "../../../services/Task"

export async function GET() {
    const tasksList = await getTasks()
    return new Response(
        JSON.stringify({
            tasksList
        })
    )
}

export async function POST(context: APIContext) {
    const data = await context.request.json()
    const description = data.description
    const tasksList = await createTasks(description)
    return new Response(JSON.stringify({tasksList}))
  }