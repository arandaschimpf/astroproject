export async function GET ({params, request}){
    return {
        body: {
            message: 'Tasks index'
        }
    }
}

export async function POST ({params, request}){
    return {
        body: {
            message: 'Tasks create'
        }
    }
}

export async function PUT ({params, request}){
    return {
        body: {
            message: 'Tasks update'
        }
    }
}

export async function DELETE ({params, request}){
    return {
        body: {
            message: 'Tasks delete'
        }
    }
}
