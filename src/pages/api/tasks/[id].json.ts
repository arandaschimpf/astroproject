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

export function getStaticPaths(){
    return [
        {params: {id: '0'}},
        {params: {id: '1'}},
        {params: {id: '2'}}
    ]
}


