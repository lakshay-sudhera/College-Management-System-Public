

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "student",
  });

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    await API.post("/auth/create-user", form);
    setForm({ name: "", email: "", role: "student" });
    fetchUsers();
  };

  const updateUser = async () => {
    await API.put(`/admin/users/${editingUser._id}`, editingUser);
    setEditingUser(null);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await API.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-6 bg-gray-50 h-auto">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

      {/* CREATE USER CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border">
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>

        <div className="grid md:grid-cols-4 gap-3">
          <input
            placeholder="Name"
            value={form.name}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            value={form.email}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            value={form.role}
            className="border p-2 rounded-lg"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="professor">Professor</option>
          </select>

          <button
            onClick={createUser}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition"
          >
            Add User
          </button>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
        <table className="w-full text-left">
          {/* TABLE HEADER */}
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {editingUser?._id === u._id ? (
                  <>
                    <td className="p-4">
                      <input
                        value={editingUser.name}
                        className="border p-2 rounded-lg w-full"
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>

                    <td className="p-4">
                      <input
                        value={editingUser.email}
                        className="border p-2 rounded-lg w-full"
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </td>

                    <td className="p-4">
                      <select
                        value={editingUser.role}
                        className="border p-2 rounded-lg"
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            role: e.target.value,
                          })
                        }
                      >
                        <option value="student">Student</option>
                        <option value="professor">Professor</option>
                      </select>
                    </td>

                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={updateUser}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingUser(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4">{u.email}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          u.role === "student"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => setEditingUser(u)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteUser(u._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}