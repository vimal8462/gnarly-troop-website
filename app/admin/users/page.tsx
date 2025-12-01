"use client";

import { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, AddIcon } from "@/components/Icons";
import { Modal } from "@/components/Modal";

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const openDeleteModal = (user: any) => {
        setSelectedUser(user);
        setDeleteModal(true);
    };
    const openAddModal = () => {
        setAddModal(true);
    };
    const closeAddModal = () => {
        setAddModal(false);
    };
    const addNewUser = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const status = formData.get("status") as string;

        const emailExists = users.some(
            (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (emailExists) {
            alert("Email already exists!");
            return;
        }
        if (password.length == 0) {
            alert("Password must be required!");
            return;
        }
        if (confirmPassword.length == 0) {
            alert("confirm password must be required!");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long!");
            return;
        }
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

        if (!specialCharPattern.test(password)) {
            alert("Password must contain at least one special character!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match!");
            return;
        }
        const newUser = {
            id: users.length + 1,
            name,
            email,
            status,
        };
        // Send to API
        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password, status }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        alert("User added successfully!");

        setUsers([...users, newUser]);
        setAddModal(false); // close modal
    };
    const updateUser = async (e: any) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const name = form.get("name") as string;
        const email = form.get("email") as string;
        const status = form.get("status") as string;
        const password = form.get("password") as string; // optional
        const confirmPassword = form.get("confirmPassword") as string;

        if (password.length !==0) {
        if (password.length < 8) {
            alert("Password must be at least 8 characters long!");
            return;
        }
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

        if (!specialCharPattern.test(password)) {
            alert("Password must contain at least one special character!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match!");
            return;
        }
    }
        const res = await fetch(`/api/users/${selectedUser.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, email, status, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        alert(data.message);

        // Update UI
        loadUsers();

        setEditModal(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);
    const openEditModal = (user: any) => {
        setSelectedUser(user);
        setEditModal(true);
    };
    const loadUsers = async () => {
        try {
            const res = await fetch("/api/users"); // your API endpoint
            const data = await res.json();
            setUsers(data);
        } finally {
        }
    };
    const deleteUser = async () => {
        if (!selectedUser) return;

        const res = await fetch(`/api/users/${selectedUser.id}`, {
            method: "DELETE",
        });
        const json = await res.json();

        if (!res.ok) {
            alert(json.error || "Failed to delete user");
            return;
        }

        // Remove from UI list
        setUsers(users.filter(u => u.id !== selectedUser.id));
        setDeleteModal(false);
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Users</h1>
            <button
                onClick={() => openAddModal()}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                <AddIcon />
                Add User
            </button>
            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{user.id}</td>
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded text-white text-sm capitalize
                    ${user.status === 1 ? "bg-green-600" : "bg-red-500"}
                  `}>
                                        {user.status === 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-4 justify-center">
                                    <span onClick={() => openEditModal(user)}><EditIcon /></span>
                                    <span onClick={() => openDeleteModal(user)}><DeleteIcon /></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            <Modal isOpen={deleteModal} close={() => setDeleteModal(false)} title="Delete Vision">
                <p>
                    Are you sure you want to delete
                    <b className="ml-1">{selectedUser?.title}</b>?
                </p>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={() => setDeleteModal(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={deleteUser}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal isOpen={editModal} close={() => setEditModal(false)} title="Edit User">
                <form onSubmit={updateUser} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <label>
                            Name:
                            <input
                                className="w-full border p-2 rounded mt-1"
                                defaultValue={selectedUser?.name} name="name"
                            />
                           
                        </label>

                        <label>
                            Email:
                            <input
                                className="w-full border p-2 rounded mt-1"
                                defaultValue={selectedUser?.email} name="email"
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                name="password"
                                type="password"
                                className="w-full border p-2 rounded mt-1"
                                placeholder="Enter password"
                                
                            />
                        </label>
                        <label>
                            ConfirmPassword:
                            <input
                                name="confirmPassword"
                                type="password"
                                className="w-full border p-2 rounded mt-1"
                                placeholder="Enter confirm password"
                                
                            />
                        </label>
                        <label>Status:</label>
                        <select className="border p-2 rounded" defaultValue={selectedUser?.status} name="status">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>

                        <div className="flex justify-end gap-3 mt-5">
                            <button onClick={() => setEditModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                        </div>
                    </div>
                </form>
            </Modal>

            {/* ADD MODAL — PLACE HERE */}

            {/* Add User Modal */}
            <Modal isOpen={addModal} close={closeAddModal} title="Add New User">
                <form onSubmit={addNewUser} className="flex flex-col gap-4">

                    <label>
                        Name:
                        <input
                            name="name"
                            className="w-full border p-2 rounded mt-1"
                            placeholder="Enter name"
                            required
                        />
                    </label>

                    <label>
                        Email:
                        <input
                            name="email"
                            type="email"
                            className="w-full border p-2 rounded mt-1"
                            placeholder="Enter email"
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            className="w-full border p-2 rounded mt-1"
                            placeholder="Enter password"
                            required
                        />
                    </label>
                    <label>
                        ConfirmPassword:
                        <input
                            name="confirmPassword"
                            type="password"
                            className="w-full border p-2 rounded mt-1"
                            placeholder="Enter confirm password"
                            required
                        />
                    </label>

                    <label>
                        Status:
                        <select name="status" className="border p-2 rounded mt-1">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </label>

                    <div className="flex justify-end gap-3 mt-5">
                        <button
                            type="button"
                            onClick={closeAddModal}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                            Add User
                        </button>
                    </div>

                </form>
            </Modal>

        </div>
    );
}
