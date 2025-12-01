"use client";

import { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, AddIcon } from "@/components/Icons";
import { Modal } from "@/components/Modal";

export default function VersionPage() {
    const [visions, setVision] = useState([]);

    const [selectedVision, setSelectedVision] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const openDeleteModal = (vision: any) => {
        setSelectedVision(vision);
        setDeleteModal(true);
    };
    const openAddModal = () => {
        setAddModal(true);
    };
    const closeAddModal = () => {
        setAddModal(false);
    };
    const addNewVision = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const file = formData.get("file") as File;
        const status = formData.get("status") as string;



        if (title.length === 0) {
            alert("Title is required!");
            return;
        }

        if (description.length === 0) {
            alert("Description is required!");
            return;
        }

        if (!file || file.size === 0) {
            alert("Image file is required!");
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

        const imageUrl = uploadJson.path;
        const saveRes = await fetch("/api/visions", {
            method: "POST",
            body: JSON.stringify({
                title,
                description,
                image: imageUrl,
                status,
            }),
        });

        const saveJson = await saveRes.json();

        if (!saveRes.ok) {
            alert(saveJson.error || "Failed to save vision");
            return;
        }


        const newVision = {
            id: saveJson.id ?? visions.length + 1, // from DB or fallback
            title,
            description,
            image: imageUrl,
            status,
        };
        loadVision()

        alert("Vision added successfully!");
        setAddModal(false);
    };
    const updateUser = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const file = formData.get("file") as File;
        const status = formData.get("status") as string;

        // === Validations ===
        if (!title || title.trim().length === 0) {
            alert("Title is required!");
            return;
        }

        if (!description || description.trim().length === 0) {
            alert("Description is required!");
            return;
        }

        // Start with existing image
        let imageUrl = selectedVision.image;

        // === Optional image upload ===
        if (file && file.size > 0) {
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

        // === Save updated vision ===
        const saveRes = await fetch(`/api/visions/${selectedVision.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                image: imageUrl,
                status,
            }),
        });

        const saveJson = await saveRes.json();

        if (!saveRes.ok) {
            alert(saveJson.error || "Update failed");
            return;
        }

        // Reload vision list
        loadVision();
        setEditModal(false);
    };

    useEffect(() => {
        loadVision();
    }, []);
    const openEditModal = (vision: any) => {
        setSelectedVision(vision);
        setEditModal(true);
    };
    const loadVision = async () => {
        try {
            const res = await fetch("/api/visions"); // your API endpoint
            const data = await res.json();
            setVision(data);
        } finally {
        }
    };
    const deleteVision = async () => {
        if (!selectedVision) return;

        const res = await fetch(`/api/visions/${selectedVision.id}`, {
            method: "DELETE",
        });

        const json = await res.json();

        if (!res.ok) {
            alert(json.error || "Failed to delete vision");
            return;
        }

        // Remove from UI list
        setVision(visions.filter(v => v.id !== selectedVision.id));

        setDeleteModal(false);
    };


    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Visions</h1>
            <button
                onClick={() => openAddModal()}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                <AddIcon />
                Add Vision
            </button>
            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {visions.map((vision) => (
                            <tr key={vision.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{vision.id}</td>
                                <td className="p-3">{vision.title}</td>
                                <td className="p-3">{vision.description}</td>
                                <td className="p-3"><img src={vision.image} width="100"height="100"/></td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded text-white text-sm capitalize
                    ${vision.status === 1 ? "bg-green-600" : "bg-red-500"}
                  `}>
                                        {vision.status === 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-4 justify-center">
                                    <span onClick={() => openEditModal(vision)}><EditIcon /></span>
                                    <span onClick={() => openDeleteModal(vision)}><DeleteIcon /></span>
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
                    <b className="ml-1">{selectedVision?.title}</b>?
                </p>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={() => setDeleteModal(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={deleteVision}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </Modal>


            {/* Edit Modal */}
            <Modal isOpen={editModal} close={() => setEditModal(false)} title="Edit Vision">
                <form onSubmit={updateUser} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">

                        {/* Title */}
                        <label>
                            Title:
                            <input
                                className="w-full border p-2 rounded mt-1"
                                name="title"
                                required
                                defaultValue={selectedVision?.title}
                            />
                        </label>

                        {/* Description */}
                        <label>
                            Description:
                            <textarea
                                name="description"
                                className="w-full border p-2 rounded mt-1"
                                placeholder="Enter description"
                                required
                                defaultValue={selectedVision?.description}
                            />
                        </label>

                        {/* Image (optional on edit) */}
                        <label>
                            Image:
                            <input
                                name="file"
                                type="file"
                                className="w-full border p-2 rounded mt-1"
                                accept=".png,jpg,jpeg,.gif"
                            />
                        </label>

                        {/* Status */}
                        <label>
                            Status:
                            <select
                                className="border p-2 rounded mt-1"
                                name="status"
                                defaultValue={selectedVision?.status}
                            >
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </label>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                type="button"
                                onClick={() => setEditModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded">
                                Save
                            </button>
                        </div>

                    </div>
                </form>
            </Modal>

            {/* ADD MODAL — PLACE HERE */}

            {/* Add User Modal */}
            <Modal isOpen={addModal} close={closeAddModal} title="Add New Vision">
                <form onSubmit={addNewVision} className="flex flex-col gap-4">

                    <label>
                        Title:
                        <input
                            name="title"
                            className="w-full border p-2 rounded mt-1"
                            placeholder="Enter title"
                            required
                        />
                    </label>

                    <label>
                        Description:
                        <textarea className="w-full border p-2 rounded mt-1"
                            placeholder="Enter description" name="description"
                            required></textarea>

                    </label>
                    <label>
                        Image:
                        <input
                            name="file"
                            type="file"
                            className="w-full border p-2 rounded mt-1"
                            required accept=".png,jpg,jpeg,.gif"
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
                            Save
                        </button>
                    </div>

                </form>
            </Modal>

        </div>
    );
}
