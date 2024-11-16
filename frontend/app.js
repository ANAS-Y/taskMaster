document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert('Error during registration');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  });

  const token = localStorage.getItem('authToken');

// Load tasks
document.getElementById('load-tasks').addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:5000/api/tasks', {
      headers: { Authorization: token },
    });
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = tasks
      .map(task => `<li>${task.title} - ${task.priority} - ${task.deadline}</li>`)
      .join('');
  } catch (err) {
    console.error(err);
    alert('Error loading tasks');
  }
});

// Create task
document.getElementById('task-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  const priority = document.getElementById('task-priority').value;
  const deadline = document.getElementById('task-deadline').value;

  try {
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ title, description, priority, deadline }),
    });
    if (response.ok) {
      alert('Task created');
    } else {
      alert('Error creating task');
    }
  } catch (err) {
    console.error(err);
    alert('Server error');
  }
});

  