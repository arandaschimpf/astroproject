type Task = {
  id: string,
  title: string,
  completed: false
}

let tasks: Task[] = []

export async function getTasks(){

  return tasks;
}



export async function createTask(title : string){
  const task: Task = {
    id: Math.floor(Math.random() * 1000000).toString(),
    title,
    completed: false,
  }
  tasks.push(task)
  return task;
} 



export async function deletedCompletedtasks(){
  tasks = tasks.filter(task => !task.completed )
  return tasks;

}

export async function toggleTask(id: string){
  const task = tasks.find(task => task.id === id)
  if(!task){
    return task;
  }
  task.completed = false;
}