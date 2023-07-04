// Define the array of students
const students = [
    { ID: 1, name: 'Subhadeep', age: 24, grade: 'A++', degree: 'Btech', email: 'debrsubha@gmail.com' },
    
  ];
  
  // Function to render the student table
  function renderStudentTable() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; // Clear existing table rows
  
    students.forEach((student) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editButton" onclick="editStudent(${student.ID})">&#x270E;</button>
          <button class="deleteButton" onclick="deleteStudent(${student.ID})">&#128465;</button>
        </td>
      `;
  
      studentList.appendChild(row);
    });
  }
  
  // Function to add or edit a student
  function addEditStudent(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    const studentId = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    const degree = document.getElementById('degree').value;
    const email = document.getElementById('email').value;
  
    if (studentId) {
      // Editing an existing student
      const student = students.find((s) => s.ID === parseInt(studentId));
      if (student) {
        student.name = name;
        student.age = parseInt(age);
        student.grade = grade;
        student.degree = degree;
        student.email = email;
      }
    } else {
      // Adding a new student
      const newStudent = {
        ID: students.length + 1,
        name,
        age: parseInt(age),
        grade,
        degree,
        email
      };
      students.push(newStudent);
    }
  
    renderStudentTable(); // Refresh the table
    document.getElementById('studentForm').reset(); // Reset form inputs
    document.getElementById('submitButton').innerText = 'Add Student'; // Reset button text
  }
  
  // Function to edit a student
  function editStudent(studentId) {
    const student = students.find((s) => s.ID === studentId);
    if (student) {
      // Fill form inputs with existing student values
      document.getElementById('studentId').value = student.ID;
      document.getElementById('name').value = student.name;
      document.getElementById('age').value = student.age;
      document.getElementById('grade').value = student.grade;
      document.getElementById('degree').value = student.degree;
      document.getElementById('email').value = student.email;
  
      // Change button text to indicate edit mode
      document.getElementById('submitButton').innerText = 'Edit Student';
    }
  }
  
  // Function to delete a student
  function deleteStudent(studentId) {
    const studentIndex = students.findIndex((s) => s.ID === studentId);
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      renderStudentTable(); // Refresh the table
    }
  }
  
  // Function to handle search
  function handleSearch() {
    const searchValue = document.getElementById('searchBox').value.toLowerCase();
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchValue) ||
      student.email.toLowerCase().includes(searchValue) ||
      student.degree.toLowerCase().includes(searchValue)
    );
    renderFilteredStudents(filteredStudents);
  }
  
  // Function to render the filtered student table
  function renderFilteredStudents(filteredStudents) {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
  
    filteredStudents.forEach((student) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editButton" onclick="editStudent(${student.ID})">Edit</button>
          <button class="deleteButton" onclick="deleteStudent(${student.ID})">Delete</button>
        </td>
      `;
  
      studentList.appendChild(row);
    });
  }
  
  // Render the initial student table
  renderStudentTable();
  
  // Event listeners
  document.getElementById('studentForm').addEventListener('submit', addEditStudent);
  document.getElementById('searchBox').addEventListener('input', handleSearch);
  