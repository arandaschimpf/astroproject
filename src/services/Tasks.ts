const tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
    ];

export function getTasks() {
    return tasks;
}

export function getTask(id: number) {
    return tasks.find(task => task.id === id);
}

export function createTask(title: string) {
    const id = tasks.length + 1;
    const newTask = { id, title, completed: false };
    tasks.push(newTask);
    return newTask;
}

export function updateTask(id: number, title: string, completed: boolean) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.title = title;
        task.completed = completed;
    }
    return task;
}

export function deleteTask(id: number) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        return tasks.splice(index, 1)[0];
    }
}

export function deleteAllTasks() {
    tasks.length = 0;
}



