import type {APIRoute} from 'astro';

const usernames = ['alice', 'bob', 'charlie'];

export const GET: APIRoute = ({params, request}) => {
    const id = params.id;
    return new Response(
        JSON.stringify({
            message: `Task ${id}`,
            name: usernames[id]
        })
    )
}

export const POST: APIRoute = ({request}) => {
    return new Response(JSON.stringify({
        message: '¡Esto es un POST!'
    }))
}

export const DELETE: APIRoute = ({request}) => {
    return new Response(JSON.stringify({
        message: '¡Esto es un DELETE!'
    }))
}

export const ALL: APIRoute = ({request}) => {
    return new Response(JSON.stringify({
        message: `¡Esto fue un ${request.method}!`
    }))
}




