"use client";

import { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, AddIcon } from "@/components/Icons";
import { Modal } from "@/components/Modal";


export default function TeamPage() {
    const [teams, setTeams] = useState([]);

    const [selectedTeam, setSelectedTeam] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // show 5 rows per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const openDeleteModal = (user: any) => {
        setSelectedTeam(user);
        setDeleteModal(true);
    };
    const openAddModal = () => {
        setAddModal(true);
    };
    const closeAddModal = () => {
        setAddModal(false);
    };
    const addNewTeam = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name") as string;
        const position = formData.get("position") as string;
        const file = formData.get("file") as File;
        const status = formData.get("status") as string;



        if (name.length === 0) {
            alert("Name is required!");
            return;
        }

        if (position.length === 0) {
            alert("Position is required!");
            return;
        }

        if (!file || file.size === 0) {
            alert("Image file is required!");
            return;
        }
        if (file) {
            const allowed = ["jpg", "jpeg", "png", "gif"];

            const ext = file.name.split(".").pop()?.toLowerCase();

            if (!allowed.includes(ext || "")) {
                alert("Invalid file type! Only JPG, PNG, GIF,JPEG allowed.");
                return;
            }
        }
        const uploadData = new FormData();
        uploadData.append("file", file);
        const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: uploadData,
        });

        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) {
            alert(uploadJson.error || "File upload failed");
            return;
        }

        const imageUrl = uploadJson.path;

        // Send to API
        const res = await fetch("/api/teams", {
            method: "POST",
            body: JSON.stringify({ name, position, imageUrl, status }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        alert("Team added successfully!");
        loadteams();
        setAddModal(false); // close modal
    };
    const updateUser = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const name = formData.get("name") as string;
        const position = formData.get("position") as string;
        const file = formData.get("file") as File;
        const status = formData.get("status") as string;



        if (name.length === 0) {
            alert("Name is required!");
            return;
        }

        if (position.length === 0) {
            alert("Position is required!");
            return;
        }
        let imageUrl = selectedTeam.image;

        if (file && file.size > 0) {

            const allowed = ["jpg", "jpeg", "png", "gif"];

            const ext = file.name.split(".").pop()?.toLowerCase();

            if (!allowed.includes(ext || "")) {
                alert("Invalid file type! Only JPG, PNG, GIF,JPEG allowed.");
                return;
            }

            const uploadData = new FormData();
            uploadData.append("file", file);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            const uploadJson = await uploadRes.json();

            if (!uploadRes.ok) {
                alert(uploadJson.error || "File upload failed");
                return;
            }

            // Replace with newly uploaded image
            imageUrl = uploadJson.path;
        }
        const res = await fetch(`/api/teams/${selectedTeam.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, position, imageUrl, status }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        alert(data.message);

        // Update UI
        loadteams();

        setEditModal(false);
    };

    useEffect(() => {
        loadteams();
    }, []);
    const currentTeams = teams.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(teams.length / itemsPerPage);

    const openEditModal = (user: any) => {
        setSelectedTeam(user);
        setEditModal(true);
    };
    const loadteams = async () => {
        try {
            const res = await fetch("/api/teams", { cache: "no-store" }); // your API endpoint
            const data = await res.json();
            setTeams(data);
        } finally {
        }
    };
    const deleteUser = async () => {
        if (!selectedTeam) return;

        const res = await fetch(`/api/teams/${selectedTeam.id}`, {
            method: "DELETE",
        });
        const json = await res.json();

        if (!res.ok) {
            alert(json.error || "Failed to delete user");
            return;
        }

        // Remove from UI list
        setTeams(teams.filter(u => u.id !== selectedTeam.id));
        setDeleteModal(false);
    };

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">teams</h1>
            <button
                onClick={() => openAddModal()}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                <AddIcon />
                Add Team
            </button>
            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Position</th>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{team.id}</td>
                                <td className="p-3">{team.name}</td>
                                <td className="p-3">{team.role}</td>
                                <td className="p-3"><img src={team.img} width="100" height="100" /></td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded text-white text-sm capitalize
                    ${team.status === 1 ? "bg-green-600" : "bg-red-500"}
                  `}>
                                        {team.status === 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-4 justify-center">
                                    <span onClick={() => openEditModal(team)}><EditIcon /></span>
                                    <span onClick={() => openDeleteModal(team)}><DeleteIcon /></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>

            </div>

            {/* Delete Modal */}
            <Modal isOpen={deleteModal} close={() => setDeleteModal(false)} title="Delete Vision">
                <p>
                    Are you sure you want to delete
                    <b className="ml-1">{selectedTeam?.title}</b>?
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
                                defaultValue={selectedTeam?.name} name="name"

                            />

                        </label>

                        <label>
                            Postition:
                            <input
                                name="position"
                                type="text"
                                className="w-full border p-2 rounded mt-1"
                                placeholder="Enter position"
                                defaultValue={selectedTeam?.position_name}
                            />
                        </label>
                        <label>
                            File:
                            <input
                                name="file"
                                type="file" accept=".jpeg, .jpg, .gif, .png"
                                className="w-full border p-2 rounded mt-1"

                            />
                        </label>
                        <label>Status:</label>
                        <select className="border p-2 rounded" defaultValue={selectedTeam?.status} name="status">
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
                <form onSubmit={addNewTeam} className="flex flex-col gap-4">

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
                        Postition:
                        <input
                            name="position"
                            type="text"
                            className="w-full border p-2 rounded mt-1"
                            placeholder="Enter position"
                            required
                        />
                    </label>
                    <label>
                        File:
                        <input
                            name="file"
                            type="file" accept=".jpeg, .jpg, .gif, .png"
                            className="w-full border p-2 rounded mt-1"
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
                            Add Team
                        </button>
                    </div>

                </form>
            </Modal>

        </div>
    );
}
