import React, { useState, useEffect } from "react";
import axios from "axios";

const PAGE_SIZE = 5;
const API_URL = "https://studentrecord-backend-b1qs.onrender.com/api/students";

const App = () => {
  const initialForm = {
    _id: null,
    name: "",
    marks: ["", "", "", "", ""],
  };

  const [form, setForm] = useState(initialForm);
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [page, setPage] = useState(1);

  // search & filter
  const [searchName, setSearchName] = useState("");
  const [filterDivision, setFilterDivision] = useState("All");

  // FETCH STUDENTS (BACKEND PAGINATION + FILTERS) 
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(API_URL, {
          params: {
            page,
            limit: PAGE_SIZE,
            ...(searchName && { search: searchName }),
            ...(filterDivision !== "All" && { division: filterDivision }),
          },
        });

        setStudents(res.data.students || []);
        setPagination(res.data.pagination || null);
      } catch (err) {
        console.error(err);
        setStudents([]);
        setPagination(null);
      }
    };

    fetchStudents();
  }, [page, searchName, filterDivision]);

  // FORM HANDLERS 
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z ]*$/.test(value)) {
      setForm({ ...form, name: value });
    }
  };

  const handleMarksChange = (index, value) => {
    if (/^\d*$/.test(value) && Number(value) <= 100) {
      const newMarks = [...form.marks];
      newMarks[index] = value;
      setForm({ ...form, marks: newMarks });
    }
  };

  const handleSubmit = async () => {
    if (!form.name || form.marks.some((m) => m === "")) {
      alert("Fill all fields");
      return;
    }

    const payload = {
      name: form.name,
      marks: form.marks.map(Number),
    };

    if (editMode) {
      await axios.put(`${API_URL}/${form._id}`, payload);
    } else {
      await axios.post(API_URL, payload);
    }

    setForm(initialForm);
    setEditMode(false);
    setPage(1);
  };

  const handleEdit = (student) => {
    setForm({
      _id: student._id,
      name: student.name,
      marks: student.marks,
    });
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this record?")) {
      await axios.delete(`${API_URL}/${id}`);
      setPage(1);
    }
  };

  // UI 
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f8ff", padding: "20px", fontFamily: "Arial" }}>
      <div style={{ backgroundColor: "#4169e1", color: "white", textAlign: "center", padding: "20px", borderRadius: "10px", marginBottom: "25px" }}>
        <h1>Student Record System</h1>
        <p>Manage student marks and results</p>
      </div>

      <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
        {/* FORM */}
        <div style={{ flex: "1 1 300px", background: "white", padding: "25px", borderRadius: "10px" }}>
          <h3>Enter Student Record</h3>

          <input
            placeholder="Student Name"
            value={form.name}
            onChange={handleNameChange}
            style={{ width: "100%", padding: "12px", marginBottom: "15px" }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: "10px" }}>
            {form.marks.map((m, i) => (
              <input
                key={i}
                placeholder={`Subject ${i + 1}`}
                value={m}
                onChange={(e) => handleMarksChange(i, e.target.value)}
                style={{ padding: "10px" }}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            style={{ marginTop: "20px", width: "100%", padding: "14px", background: editMode ? "#ff9800" : "#4169e1", color: "white", border: "none" }}
          >
            {editMode ? "Update Student" : "Save Student"}
          </button>
        </div>

        {/* TABLE */}
        <div style={{ flex: "2 1 600px", background: "white", padding: "25px", borderRadius: "10px" }}>
          <h3>Student Records</h3>

          {/* SEARCH + FILTER */}
          <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
            <input
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                setPage(1);
              }}
              style={{ padding: "10px", flex: 1 }}
            />

            <select
              value={filterDivision}
              onChange={(e) => {
                setFilterDivision(e.target.value);
                setPage(1);
              }}
              style={{ padding: "10px" }}
            >
              <option value="All">All Divisions</option>
              <option value="First Class">First Class</option>
              <option value="Second Class">Second Class</option>
              <option value="Third Class">Third Class</option>
              <option value="Distinction">Distinction</option>
            </select>
          </div>

          <table width="100%" border="1" cellPadding="10">
            <thead>
              <tr style={{ background: "#4169e1", color: "white" }}>
                <th>Name</th>
                <th>Marks</th>
                <th>Percentage</th>
                <th>Division</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.marks.join(", ")}</td>
                  <td>{s.percentage}%</td>
                  <td>{s.division}</td>
                  <td><button onClick={() => handleEdit(s)}>Edit</button></td>
                  <td><button onClick={() => handleDelete(s._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            {Array.from({ length: pagination?.totalPages || 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                style={{
                  margin: "5px",
                  background: page === i + 1 ? "#4169e1" : "white",
                  color: page === i + 1 ? "white" : "black"
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
