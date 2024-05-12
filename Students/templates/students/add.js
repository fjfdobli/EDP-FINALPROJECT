document.addEventListener('DOMContentLoaded', function() {
    const addForm = document.querySelector('form')
    addForm.addEventListener('submit', function(event) {
        event.preventDefault()

        const formData = new FormData(addForm)

        fetch('/add/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(response => response.json())
        .then(data => {
            updateStudentList(data)
        })
        .catch(error => {
            console.error('Error:', error)
        })
    })
})

function getCookie(name) {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}