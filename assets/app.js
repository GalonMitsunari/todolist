/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

console.log("test")

//JS

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.task-item').forEach(item => {
        const taskId = item.dataset.id;
        const checkbox = item.querySelector('.task-checkbox');
        
        checkbox.addEventListener('change', function() {
            const newStatus = checkbox.checked ? 'done' : 'todo';
            
            fetch(`/update-task/${taskId}/${newStatus}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({})
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            }).then(data => {
                // Mettez à jour l'affichage en fonction de la réponse si nécessaire
                console.log(data);
            }).catch(error => {
                console.error('Erreur lors de la mise à jour de la tâche:', error);
            });
        });
    });
});