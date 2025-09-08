import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", age: "", email: "" });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users", form);
      setUsers([...users, res.data]); 
      setForm({ name: "", age: "", email: "" }); 
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>React(Vite)+Express+MongoDB</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* Display Users */}
      <h2>All Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} ({u.age}) - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;