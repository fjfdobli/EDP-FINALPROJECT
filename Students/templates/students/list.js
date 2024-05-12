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
    const table = document.querySelector('table tbody')
    table.innerHTML = ''

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
        actionsCell.appendChild(updateLink)

        const deleteLink = document.createElement('a')
        deleteLink.href = '#'
        deleteLink.textContent = 'Delete'
        deleteLink.classList.add('text-red-500', 'hover:text-red-700')
        actionsCell.appendChild(deleteLink)

        row.appendChild(actionsCell)

        table.appendChild(row)
    })
}

function handleTableClick(event) {
    if (event.target.textContent === 'Update') {
        const row = event.target.closest('tr')
        editStudent(row)
    } else if (event.target.textContent === 'Delete') {
        const row = event.target.closest('tr')
        deleteStudent(row)
    }
}

function editStudent(row) {
    const cells = row.querySelectorAll('td')
    cells.forEach((cell, index) => {
        if (index !== cells.length - 1) {
            const input = document.createElement('input')
            input.value = cell.textContent
            cell.textContent = ''
            cell.appendChild(input)
        }
    })

    const actionsCell = cells[cells.length - 1]
    const updateLink = actionsCell.querySelector('a:first-child')
    updateLink.textContent = 'Save'
    updateLink.onclick = saveStudent.bind(null, row)
}

function saveStudent(row) {
    const cells = row.querySelectorAll('td')
    const student = {
        firstName: cells[0].querySelector('input').value,
        lastName: cells[1].querySelector('input').value,
        course: cells[2].querySelector('input').value,
        gender: cells[3].querySelector('input').value,
        age: parseInt(cells[4].querySelector('input').value)
    }

    cells[0].textContent = `${student.firstName} ${student.lastName}`
    cells[1].textContent = student.course
    cells[2].textContent = student.gender
    cells[3].textContent = student.age

    const actionsCell = cells[cells.length - 1]
    const saveLink = actionsCell.querySelector('a:first-child')
    saveLink.textContent = 'Update'
    saveLink.onclick = null
}

function deleteStudent(row) {
    row.remove()
}