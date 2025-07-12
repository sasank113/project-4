const taskInput = document.getElementById('newTask');
const taskList = document.getElementById('taskList');
const addbtn = document.getElementById('add');

const tasks=[]
 

function addTask(taskText,completed) {
   

                const listItem = document.createElement('li');

                listItem.innerHTML = `
                    <span class="task-text">${taskText}</span>
                    <button class="done-button" onclick="markAsDone(this)">Done</button>
                    <button class="delete-button" onclick="deleteTask(this)">Delete</button>
                `;
                
                if(completed===1)
                {
                listItem.classList.toggle('completed'); 
                completed=1
                    }  
                taskList.appendChild(listItem);
                taskInput.value = "";   
                tasks.push({text:taskText,completed:completed})
                   
 }


function markAsDone(button) {
    const listItem = button.parentNode;
    const taskTextSpan = listItem.querySelector('.task-text');
    taskTextSpan.classList.toggle('completed'); 
    tasks.forEach(task=>{
        if(task.text===taskTextSpan.textContent)
    {
        task.completed=1;
    }
    })
}
    
function deleteTask(button) {
     const listItem = button.parentNode;
    taskList.removeChild(listItem);
    const taskTextSpan = listItem.querySelector('.task-text');
    let index=tasks.indexOf(taskTextSpan)
    tasks.splice(index,1)  
}

addbtn.addEventListener('click',()=>{
const taskText = taskInput.value.trim();
console.log(taskText)
if(taskText!==" ")
         addTask(taskText,0);
})


taskInput.addEventListener('keypress', function(event) {
   if(event === 'enter')
   {
    addbtn.click();
   }
});


window.addEventListener('beforeunload',()=>{
  localStorage.setItem('tasks',JSON.stringify(tasks))
});

const taskm=JSON.parse(localStorage.getItem('tasks'))||[];
taskm.forEach(task => {console.log(task.text + task.completed);
    
});

 function loadtasks()
 {
    const taskm=JSON.parse(localStorage.getItem('tasks'))||[];
    taskm.forEach(task=>{
    addTask(task.text,task.completed);
     }
    )
 }

 loadtasks();

