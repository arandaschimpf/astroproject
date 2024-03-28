
// index.ts


/*
// Define the task title
const taskTitle = 'Example Task';

// Define the request body as JSON
const requestBody = JSON.stringify({ title: taskTitle });

// Send a POST request to create a new task
fetch('/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: requestBody
})
.then(response => response.json())
.then(data => {
  console.log('New task created:', data.task);
})
.catch(error => {
  console.error('Error creating task:', error);
});
*/



import { getTasks, deletedCompletedtasks, createTask, toggleTask } from '../../services/Task';
import type { APIContext } from 'astro';



const PORT = process.env.PORT || 4321;



export async function GET()  {
  const taskList = await getTasks()
  return new Response(
    JSON.stringify({
      taskList
    }))
  } 



export async function POST(context: APIContext)  {
  const data: { title: string } = await context.request.json()
    const task = await createTask(data.title)
    return new Response(
      JSON.stringify({
        task
      }))
    } 



export async function PATCH()  {
    const task = await deletedCompletedtasks()
    return new Response(
      JSON.stringify({
        task
      }))
    } 




//sw wapli
  















//-------------------------------------------------------------------


/*
// Define the task title
const taskTitle = 'Example Task';

// Define the request body as JSON
const requestBody = JSON.stringify({ title: taskTitle });

// Send a POST request to create a new task
fetch('http://localhost:4321/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: requestBody
})
.then(response => response.json())
.then(data => {
  console.log('New task created:', data.task);
})
.catch(error => {
  console.error('Error creating task:', error);
});





app.use(express.json());


// Define routes

// GET tasks
app.get('/api', async (req, res) => {
    try {
        const tasks = await getTasks();
        res.json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST task
app.post('/api', async (req, res) => {
    try {
        const { title } = req.body;
        const task = await createTask(title);
        res.json(201).json({ task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT toggle task completion
app.put('/api/:id/toggle', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await toggleTask(id);
        res.json({ task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE completed tasks
app.delete('/api/completed', async (req, res) => {
    try {
        const tasks = await deletedCompletestasks();
        res.json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/
