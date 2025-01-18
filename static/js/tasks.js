document.addEventListener('DOMContentLoaded', () => {
    // Fetch all task checkboxes
    const checkboxes = document.querySelectorAll('.task-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', async (event) => {
            const taskId = event.target.dataset.taskId;
            const isCompleted = event.target.checked;

            // Update the task in the database
            const response = await fetch(`/tasks/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: isCompleted }),
            });

            if (response.ok) {
                // Move task to the appropriate category
                const taskItem = event.target.parentElement;
                const targetList = isCompleted
                    ? document.getElementById('completed-tasks')
                    : document.getElementById('incomplete-tasks');

                targetList.appendChild(taskItem);
            } else {
                alert('Failed to update task. Please try again.');
                event.target.checked = !isCompleted; // Revert checkbox state
            }
        });
    });
});
