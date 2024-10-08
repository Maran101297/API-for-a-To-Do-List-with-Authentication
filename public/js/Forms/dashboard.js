// Load user data function
async function loadUserData() {
    const token = localStorage.getItem('token');
    
    try {
        const data = await fetchRequest('/api/protected-route', 'GET', null, token);

        console.log(data);

        document.getElementById('userInfo').innerHTML = `
            <p>Hello ${data.username}, welcome back!</p>
            <p>Email: ${data.email}</p>
            <p>Phone: ${data.phoneNumber}</p>
        `;
    } catch (error) {
        console.error('Error loading user data:', error);
        window.location.href = '/api/signIn'; 
    }
}

// Logout button event
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem('token'); // Clear the token
    window.location.href = '/api/signIn'; // Redirect to login
});

// Call loadUserData on window load
window.onload = loadUserData;

// jQuery document ready function
$(document).ready(function () {
    const table = $('#taskTable').DataTable();
    let editingRowId = null; // Track the row being edited

    // Fetch tasks from the backend
    async function fetchTasks() {
        const token = localStorage.getItem('token');
        try {
            const tasks = await fetchRequest('/api/todos/showdata', 'GET', null, token);

            table.clear();
            tasks.forEach(task => {
                table.row.add([
                    `<span class="taskName">${task.title}</span><input type="text" class="taskInput" style="display:none;" value="${task.title}" />`,
                    `<span class="taskDescription">${task.description}</span><input type="text" class="descriptionInput" style="display:none;" value="${task.description}" />`,
                    `<span class="taskStatus">${task.status}</span><select class="statusInput" style="display:none;">
                        <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>`,
                    `<button class="editButton btn btn-primary" data-id="${task._id}">Edit</button>
                     <button class="saveButton btn btn-primary" data-id="${task._id}" style="display:none;">Save</button>
                     <button class="deleteButton btn btn-danger" data-id="${task._id}">Delete</button>`
                ]).draw();
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    // Fetch tasks when the page loads
    fetchTasks();
  // Create a new task
  $('#createTaskForm').on('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem('token');

    const taskData = {
        title: $('#taskName').val(),
        description: $('#taskDescription').val(),
    };

    try {
        // Use the fetchRequest function for the POST request
        await fetchRequest('/api/todos/createTask', 'POST', taskData, token);
        
        $('#createTaskForm')[0].reset(); // Clear the form
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error('Error creating task:', error);
    }
});


    // Handle edit button click
    $('#taskTable tbody').on('click', '.editButton', function () {
        const row = $(this).closest('tr');
        editingRowId = $(this).data('id'); // Store the task ID being edited
    
        // Show input fields for editing and hide static content
        row.find('.taskInput, .descriptionInput, .statusInput').show();
        row.find('.taskName, .taskDescription,  .taskStatus').hide();
    
        // Show Save button, hide Edit button
        row.find('.saveButton').show();
        row.find('.editButton').hide();
    });

    // Handle save button click
    $('#taskTable tbody').on('click', '.saveButton', async function () {
        const row = $(this).closest('tr');
        const taskId = $(this).data('id');
    
        const updatedTask = {
            task: row.find('.taskInput').val(),
            description: row.find('.descriptionInput').val(),
            priority: row.find('.priorityInput').val(),
            status: row.find('.statusInput').val(),
        };
    
        const token = localStorage.getItem('token');
        try {
            await fetchRequest(`/api/todos/${taskId}`, 'PUT', updatedTask, token);
    
            // Update the UI with the saved changes
            row.find('.taskName').text(updatedTask.task).show();
            row.find('.taskDescription').text(updatedTask.description).show();

            row.find('.taskStatus').text(updatedTask.status).show(); // Show the updated status
    
            // Hide input fields
            row.find('.taskInput, .descriptionInput, .priorityInput, .statusInput').hide();
    
            // Show Edit button, hide Save button
            row.find('.editButton').show();
            row.find('.saveButton').hide();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    });

    // Handle delete button click
    $('#taskTable tbody').on('click', '.deleteButton', async function () {
        const todoId = $(this).data('id');
        const token = localStorage.getItem('token');
        try {
            await fetchRequest(`/api/todos/${todoId}`, 'DELETE', null, token);
           await fetchTasks(); // Refresh the task list after deletion
           window.location.href = '/api/dashboard';
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    });
});