import type { APIContext } from "astro"
import { toggleTask } from "../../services/Task"



export async function PUT(context: APIContext)  {
  const id = context.params.id
  const task = await toggleTask(id!)
  return new Response(
    JSON.stringify({
      task
    }))
  } 


  