type Task = {
    id: string;
    title: string;
    compleated: boolean;
}
let tasks: Task[] = []
export async function getTasks() {
    return tasks
}
export async function createTask() { }

export async function deleteCOmpleatedTasks() { }


