document.addEventListener('DOMContentLoaded', () => {
    const taskId = window.location.pathname.split('/').pop(); // Extract task ID from URL
    const editForm = document.getElementById('edit-task-form');
    const deleteButton = document.getElementById('delete-task-button');
    const successMessageElement = document.getElementById('success-message');
    const errorMessageElement = document.getElementById('error-message');

    // Handle task update
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const description = event.target.description.value;

        if (title.length > 70 || description.length > 250) {
            errorMessageElement.style.display = 'block';
            errorMessageElement.textContent = 'Invalid input length!';
            setTimeout(() => {
                errorMessageElement.style.display = 'none';
            }, 2000);
            return;
        }

        const response = await fetch(`/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            successMessageElement.style.display = 'block';
            successMessageElement.textContent = 'Task updated successfully!';
            setTimeout(() => {
                successMessageElement.style.display = 'none';
            }, 2000);
        } else {
            errorMessageElement.style.display = 'block';
            errorMessageElement.textContent = 'Failed to update task!';
            setTimeout(() => {
                errorMessageElement.style.display = 'none';
            }, 2000);
        }
    });

    // Handle task deletion
    deleteButton.addEventListener('click', async () => {
        const confirmDelete = confirm('Are you sure you want to delete this task?');
        if (!confirmDelete) return;

        const response = await fetch(`/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            alert('Task deleted successfully!');
            window.location.href = '/tasks'; // Redirect to tasks list
        } else {
            alert('Failed to delete task. Please try again.');
        }
    });
});
