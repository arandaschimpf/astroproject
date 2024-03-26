type Task = {
    id: string,
    description: string,
    completed: boolean
}
let taskList: Task[] = []

export async function getTasks() {
    return taskList
}

export async function createTasks(description: string) {
    const id = Math.random().toString(36).substring(7);
    const task: Task = {
        id,
        description,
        completed: false
    }
    taskList.push(task)
    return task
}

export async function deleteCompletedTasks() {
    taskList = taskList.filter(element => !element.completed) //filter iterates over eache 'element' and returns a new array, it returs true, if element.completed == false. It takes out anything that isnt like that
    return taskList
}

export async function toggleTask(id: string) {
    const task = taskList.find(element => element.id === id)
    if(!task){
        return
    }
    task.completed = !task.completed
    return task
}
