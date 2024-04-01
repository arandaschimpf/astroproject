export type Task = {
    id:number,
    title:string,
    completed:boolean
}
const taskList: Task[] = []


export const getTaskList = async () => {
    return taskList
  }
  
  export const addTask = async (task: Task) => {
    taskList.push(task)
    return task
  }
  
  export const deleteTask = async (taskId: number) => {
    const index = taskList.findIndex((task) => task.id === taskId)
    if (index === -1) {
      throw new Error('task not found')
    }
    return taskList.splice(index, 1)[0]
}
