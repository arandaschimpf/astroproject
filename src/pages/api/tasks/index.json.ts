import type { APIRoute } from 'astro'   
import { getTasks } from '../../../services/Tasks'

export const GET: APIRoute = ({ params, request }) => {
    return new Response(JSON.stringify(getTasks()))
  }
  
  export const POST: APIRoute = ({ request }) => {
    return new Response(JSON.stringify({
        message: "¡Esto es un POST!"
      })
    )
  }
  
  export const DELETE: APIRoute = ({ request }) => {
    return new Response(JSON.stringify({
        message: "¡Esto es un DELETE!"
      })
    )
  }
  
  export const ALL: APIRoute = ({ request }) => {
    return new Response(JSON.stringify({
        message: `¡Esto fue un ${request.method}!`
      })
    )
  }