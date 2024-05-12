document.addEventListener('DOMContentLoaded', function() {
    fetchStudentList()

    const table = document.querySelector('table tbody')
    table.addEventListener('click', handleTableClick)
})

function fetchStudentList() {
    fetch('/students/')
        .then(response => response.json())
        .then(data => {
            const studentList = data
            updateStudentList(studentList)
        })
        .catch(error => {
            console.error('Error:', error)
        })
}

function updateStudentList(studentList) {
    const tableBody = document.getElementById('student-table-body')
    tableBody.innerHTML = ''

    studentList.forEach(student => {
        const row = document.createElement('tr')

        const nameCell = document.createElement('td')
        nameCell.textContent = `${student.firstName} ${student.lastName}`
        row.appendChild(nameCell)

        const courseCell = document.createElement('td')
        courseCell.textContent = student.course
        row.appendChild(courseCell)

        const genderCell = document.createElement('td')
        genderCell.textContent = student.gender
        row.appendChild(genderCell)

        const ageCell = document.createElement('td')
        ageCell.textContent = student.age
        row.appendChild(ageCell)

        const actionsCell = document.createElement('td')
        
        const updateLink = document.createElement('a')
        updateLink.href = '#'
        updateLink.textContent = 'Update'
        updateLink.classList.add('text-blue-500', 'hover:text-blue-700')
        updateLink.dataset.studentId = student.id
        actionsCell.appendChild(updateLink)

        const deleteLink = document.createElement('a')
        deleteLink.href = '#'
        deleteLink.textContent = 'Delete'
        deleteLink.classList.add('text-red-500', 'hover:text-red-700', 'ml-2')
        deleteLink.dataset.studentId = student.id
        actionsCell.appendChild(deleteLink)

        row.appendChild(actionsCell)
        tableBody.appendChild(row)
    })
}

function handleTableClick(event) {
    if (event.target.textContent === 'Update') {
        const studentId = event.target.dataset.studentId
        window.location.href = `/edit/${studentId}/`
    } else if (event.target.textContent === 'Delete') {
        const confirmed = confirm('Are you sure you want to delete this student?')
        if (confirmed) {
            const studentId = event.target.dataset.studentId
            deleteStudent(studentId)
        }
    }
}

function deleteStudent(studentId) {
    fetch(`/delete/${studentId}/`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            fetchStudentList()
        } else {
            console.error('Failed to delete student')
        }
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
