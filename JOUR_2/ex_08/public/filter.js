let currentSortField = 'id';
let currentSortOrder = 'asc';

async function fetchStudents() {
    const response = await fetch(`/api/students?sort=${currentSortField}&order=${currentSortOrder}`);
    const students = await response.json();
    renderStudents(students);
}

async function searchStudents() {
    const query = document.getElementById('searchInput').value;
    const response = await fetch(`/api/students/search?q=${query}`);
    const students = await response.json();
    renderStudents(students);
}

async function filterById() {
    const id = document.getElementById('filterId').value;
    if (id === "") {
        fetchStudents();
    } else {
        const response = await fetch(`/api/students/${id}`);
        const student = await response.json();
        if (student) {
            renderStudents([student]);
        } else {
            document.getElementById('studentsTable').innerHTML = '<tr><td colspan="8">No student found</td></tr>';
        }
    }
}

async function filterByCriteria() {
    const firstname = document.getElementById('filterFirstname').value;
    const lastname = document.getElementById('filterLastname').value;
    const phone = document.getElementById('filterPhone').value;
    let queryString = '';

    if (firstname) {
        queryString += `firstname=${firstname}`;
    }
    if (lastname) {
        queryString += (queryString ? '&' : '') + `lastname=${lastname}`;
    }
    if (phone) {
        queryString += (queryString ? '&' : '') + `phone=${phone}`;
    }

    const response = await fetch(`/api/students/searchByCriteria?${queryString}`);
    const students = await response.json();
    renderStudents(students);
}

async function advancedFilter() {
    const idCondition = document.getElementById('filterIdCondition').value;
    const idValue = document.getElementById('filterIdValue').value;
    const validated = document.getElementById('filterValidated').value;
    const admin = document.getElementById('filterAdmin').value;

    let queryString = '';

    if (idValue) {
        queryString += `idCondition=${idCondition}&idValue=${idValue}`;
    }
    if (validated) {
        queryString += (queryString ? '&' : '') + `validated=${validated}`;
    }
    if (admin) {
        queryString += (queryString ? '&' : '') + `admin=${admin}`;
    }

    const response = await fetch(`/api/students/advancedFilter?${queryString}`);
    const students = await response.json();
    renderStudents(students);
}

function renderStudents(students) {
    const tableBody = document.getElementById('studentsTable');
    tableBody.innerHTML = ''; // Clear existing table data
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.lastname}</td>
                    <td>${student.firstname}</td>
                    <td>${student.email}</td>
                    <td>${student.phone}</td>
                    <td>${student.validated}</td>
                    <td>${student.admin ? 'Yes' : 'No'}</td>
                    <td>
                        <button onclick="editStudent(${student.id})">Edit</button>
                        <button onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                `;
        tableBody.appendChild(row);
    });
}

function sortStudents(field) {
    if (currentSortField === field) {
        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        currentSortField = field;
        currentSortOrder = 'asc';
    }
    fetchStudents();
}

function showAddForm() {
    document.getElementById('studentForm').classList.remove('hidden');
    document.getElementById('form').reset();
    document.getElementById('studentId').value = '';
}

function hideForm() {
    document.getElementById('studentForm').classList.add('hidden');
}

async function saveStudent(event) {
    event.preventDefault();
    const studentId = document.getElementById('studentId').value;
    const url = studentId ? `/api/students/${studentId}` : '/api/students';
    const method = studentId ? 'PUT' : 'POST';

    const student = {
        lastname: document.getElementById('lastname').value,
        firstname: document.getElementById('firstname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        validated: document.getElementById('validated').value,
        admin: document.getElementById('admin').checked
    };

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    });

    if (response.ok) {
        fetchStudents();
        hideForm();
    } else {
        alert('Failed to save student.');
    }
}

async function editStudent(id) {
    const response = await fetch(`/api/students/${id}`);
    const student = await response.json();

    document.getElementById('studentId').value = student.id;
    document.getElementById('lastname').value = student.lastname;
    document.getElementById('firstname').value = student.firstname;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone;
    document.getElementById('validated').value = student.validated;
    document.getElementById('admin').checked = student.admin;

    document.getElementById('studentForm').classList.remove('hidden');
}

async function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        const response = await fetch(`/api/students/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchStudents();
        } else {
            alert('Failed to delete student.');
        }
    }
}

fetchStudents();