
 let employees = [
  { id: 1, firstName: "Alice", lastName: "Smith", email: "alice@example.com", department: "HR", role: "Manager" },
  { id: 2, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", department: "IT", role: "Developer" },
  { id: 3, firstName: "Charlie", lastName: "Lee", email: "charlie@example.com", department: "Finance", role: "Analyst" }
];

let filters = { search: '', firstName: '', department: '', role: '' };

function renderEmployees(page = 1, limit = 10) {
  const search = filters.search.toLowerCase();
  const sortKey = document.getElementById("sortOption").value;
  const filtered = employees.filter(e =>
    (e.firstName + e.lastName + e.email).toLowerCase().includes(search) &&
    (!filters.firstName || e.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) &&
    (!filters.department || e.department.toLowerCase().includes(filters.department.toLowerCase())) &&
    (!filters.role || e.role.toLowerCase().includes(filters.role.toLowerCase()))
  );

  filtered.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  const container = document.getElementById("employeeList");
  container.innerHTML = "";

  paginated.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h4>${emp.firstName} ${emp.lastName}</h4>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });

  const pagination = document.getElementById("paginationControls");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(filtered.length / limit);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.onclick = () => renderEmployees(i, limit);
    pagination.appendChild(btn);
  }
}

function applyFilters() {
  filters.firstName = document.getElementById("filterFirstName").value;
  filters.department = document.getElementById("filterDepartment").value;
  filters.role = document.getElementById("filterRole").value;
  renderEmployees(1, +document.getElementById("paginationLimit").value);
}

function resetFilters() {
  filters = { search: '', firstName: '', department: '', role: '' };
  document.getElementById("filterFirstName").value = '';
  document.getElementById("filterDepartment").value = '';
  document.getElementById("filterRole").value = '';
  renderEmployees(1, +document.getElementById("paginationLimit").value);
}

function editEmployee(id) {
  alert("Edit employee with ID: " + id);
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees = employees.filter(e => e.id !== id);
    renderEmployees(1, +document.getElementById("paginationLimit").value);
  }
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  filters.search = e.target.value;
  renderEmployees(1, +document.getElementById("paginationLimit").value);
});

document.getElementById("sortOption").addEventListener("change", () => {
  renderEmployees(1, +document.getElementById("paginationLimit").value);
});

document.getElementById("paginationLimit").addEventListener("change", () => {
  renderEmployees(1, +document.getElementById("paginationLimit").value);
});

window.onload = () => {
  renderEmployees();
};
