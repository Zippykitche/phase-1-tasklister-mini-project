document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const form = document.getElementById('create-task-form');
    const taskList = document.getElementById('tasks');
    let tasks = []; 
  
    let isEditing = false;
    let currentEditLi = null;
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const taskDescription = document.getElementById('new-task-description').value.trim();
      const taskPriority = document.getElementById('priority').value;
      const taskDateDue = document.getElementById('date-due').value;
      const taskUser = document.getElementById('user').value;
  
      if (taskDescription !== '' && taskDateDue !== '' && taskUser !== '') {
        if (isEditing) {
          updateTask(currentEditLi, taskDescription, taskPriority, taskDateDue, taskUser);
          isEditing = false;
          currentEditLi = null;
        } else {
          const newTask = { description: taskDescription, priority: taskPriority, dateDue: taskDateDue, user: taskUser };
          tasks.push(newTask); 
          addTask(newTask);
        }
        form.reset(); 
      } else {
        alert("Please enter a task description, date due, and user.");
      }
    });
  
    function addTask(task) {
      const li = document.createElement('li');
      li.innerHTML = `(Name: ${task.user}) <strong>${task.description}</strong> (Due: ${task.dateDue})`;
  
      
      if (task.priority === 'high') {
        li.style.color = 'red';
      } else if (task.priority === 'medium') {
        li.style.color = 'yellow';
      } else if (task.priority === 'low') {
        li.style.color = 'green';
      }
  
      
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'x';
      deleteBtn.style.marginLeft = '10px';
  
      deleteBtn.addEventListener('click', function() {
        li.remove();
        tasks = tasks.filter(t => t !== task); 
      });
  
     
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.style.marginLeft = '10px';
      editBtn.style.backgroundColor = 'green';
      editBtn.style.color = 'white';
      editBtn.style.border = 'none';
      editBtn.style.borderRadius = '5px';
      editBtn.style.padding = '5px 10px';
  
      editBtn.addEventListener('click', function() {
        document.getElementById('new-task-description').value = task.description;
        document.getElementById('priority').value = task.priority;
        document.getElementById('date-due').value = task.dateDue;
        document.getElementById('user').value = task.user;
  
        isEditing = true;
        currentEditLi = li;
      });
  
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
  
      taskList.appendChild(li);
    }
  
    
    function updateTask(li, description, priority, dateDue, user) {
      li.innerHTML = `(Name: ${user}) <strong>${description}</strong> (Due: ${dateDue})`;
  
      if (priority === 'high') {
        li.style.color = 'red';
      } else if (priority === 'medium') {
        li.style.color = 'yellow';
      } else if (priority === 'low') {
        li.style.color = 'green';
      }
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'x';
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.addEventListener('click', function() {
        li.remove();
        tasks = tasks.filter(t => t.description !== description); 
      });
  
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.style.marginLeft = '10px';
      editBtn.style.backgroundColor = 'green';
      editBtn.style.color = 'white';
      editBtn.style.border = 'none';
      editBtn.style.borderRadius = '5px';
      editBtn.style.padding = '5px 10px';
  
      editBtn.addEventListener('click', function() {
        document.getElementById('new-task-description').value = description;
        document.getElementById('priority').value = priority;
        document.getElementById('date-due').value = dateDue;
        document.getElementById('user').value = user;
  
        isEditing = true;
        currentEditLi = li;
      });
  
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
    }
  
    
    function sortTasks(order) {
      tasks.sort((a, b) => {
        const priorityMap = { high: 1, medium: 2, low: 3 };
        const priorityA = priorityMap[a.priority];
        const priorityB = priorityMap[b.priority];
        return order === 'asc' ? priorityA - priorityB : priorityB - priorityA;
      });
  
      taskList.innerHTML = ''; 
      tasks.forEach(addTask);  
    }
  
    
    document.getElementById('sort-asc').addEventListener('click', function() {
      sortTasks('asc');
    });
  
    document.getElementById('sort-desc').addEventListener('click', function() {
      sortTasks('desc');
    });
  });
  