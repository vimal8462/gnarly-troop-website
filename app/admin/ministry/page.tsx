"use client";

import { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, AddIcon } from "@/components/Icons";
import { Modal } from "@/components/Modal";

export default function LetterPage() {
    const [ministries, setMinistry] = useState([]);

    const [selectedMinistry, setSelectedMinistry] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const openDeleteModal = (ministry: any) => {
        setSelectedMinistry(ministry);
        setDeleteModal(true);
    };
    const openAddModal = () => {
        setAddModal(true);
    };
    const closeAddModal = () => {
        setAddModal(false);
    };
    const addNewMinistry = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title1 = formData.get("title1") as string;
        const title2 = formData.get("title2") as string;
        const description = formData.get("description") as string;
        const file = formData.get("file") as File;
        const status = formData.get("status") as string;



        if (title1.length === 0) {
            alert("Ttile1 is required!");
            return;
        }
        if (title2.length === 0) {
            alert("Ttile2 is required!");
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

        const saveRes = await fetch("/api/ministry", {
            method: "POST",
            body: JSON.stringify({
                title1,
                title2,
                description,
                image: imageUrl,
                status
            }),
        });

        const saveJson = await saveRes.json();

        if (!saveRes.ok) {
            alert(saveJson.error || "Failed to save vision");
            return;
        }


        
        loadMinistry()

        alert("Ministry added successfully!");
        setAddModal(false);
    };
    const updateLetter = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title1 = formData.get("title1") as string;
        const title2 = formData.get("title2") as string;
        const description = formData.get("description") as string;
        const file = formData.get("file") as File;
        const status = formData.get("status") as string;

        // === Validations ===
        if (title1.length === 0) {
            alert("Title1 is required!");
            return;
        }
        if (title2.length === 0) {
            alert("Title2 is required!");
            return;
        }

        if (description.length === 0) {
            alert("Description is required!");
            return;
        }
        // Start with existing image
        let imageUrl = selectedMinistry.image;

        // === Optional image upload ===
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
       
        // === Save updated vision ===
        const saveRes = await fetch(`/api/ministry/${selectedMinistry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title1,
                title2,
                description,
                image: imageUrl,
                status
            }),
        });

        const saveJson = await saveRes.json();

        if (!saveRes.ok) {
            alert(saveJson.error || "Update failed");
            return;
        }
        alert('Ministry updated successfuly');
        // Reload vision list
        loadMinistry();
        setEditModal(false);
    };

    useEffect(() => {
        loadMinistry();
    }, []);
    const openEditModal = (vision: any) => {
        setSelectedMinistry(vision);
        setEditModal(true);
    };
    const loadMinistry = async () => {
        try {
            const res = await fetch("/api/ministry"); // your API endpoint
            const data = await res.json();
            setMinistry(data);
        } finally {
        }
    };
    const deleteLetter = async () => {
        if (!selectedMinistry) return;

        const res = await fetch(`/api/ministry/${selectedMinistry.id}`, {
            method: "DELETE",
        });

        const json = await res.json();

        if (!res.ok) {
            alert(json.error || "Failed to delete vision");
            return;
        }

        // Remove from UI list
        setMinistry(ministries.filter(v => v.id !== selectedMinistry.id));

        setDeleteModal(false);
    };


    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Ministry</h1>
            <button
                onClick={() => openAddModal()}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                <AddIcon />
                Add Ministry
            </button>
            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Title1</th>
                            <th className="p-3 text-left">Title2</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ministries.map((ministry) => (
                            <tr key={ministry.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{ministry.id}</td>
                                <td className="p-3">{ministry.title1}</td>
                                <td className="p-3">{ministry.title2}</td>
                                <td className="p-3">{ministry.description}</td>
                                <td className="p-3"><img src={ministry.image} width="100" height="100" /></td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded text-white text-sm capitalize
                    ${ministry.status === 1 ? "bg-green-600" : "bg-red-500"}
                  `}>
                                        {ministry.status === 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-4 justify-center">
                                    <span onClick={() => openEditModal(ministry)}><EditIcon /></span>
                                    <span onClick={() => openDeleteModal(ministry)}><DeleteIcon /></span>
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
                    <b className="ml-1">{selectedMinistry?.title}</b>?
                </p>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={() => setDeleteModal(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={deleteLetter}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </Modal>


            {/* Edit Modal */}
            <Modal isOpen={editModal} close={() => setEditModal(false)} title="Edit Ministry">
                <form onSubmit={updateLetter} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">

                        {/* Title */}
                        <label>
                            Title1:
                            <input
                                name="title1"
                                className="w-full border p-2 rounded mt-1"
                                placeholder="Enter title1"
                                required
                                defaultValue={selectedMinistry?.title1}

                            />
                        </label>
                        <label>
                            Title2:
                            <input
                                name="title2"
                                className="w-full border p-2 rounded mt-1"
                                placeholder="Enter title2"
                                required
                                defaultValue={selectedMinistry?.title2}

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
                                defaultValue={selectedMinistry?.description}
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
                                defaultValue={selectedMinistry?.status}
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
            <Modal isOpen={addModal} close={closeAddModal} title="Add New Ministry">
                <form onSubmit={addNewMinistry} className="flex flex-col gap-4">

                    <label>
                        Title1:
                        <input
                            name="title1"
                            className="w-full border p-2 rounded mt-1"
                            placeholder="Enter title1"
                            required
                        />
                    </label>
                    <label>
                        Title2:
                        <input
                            name="title2"
                            className="w-full border p-2 rounded mt-1"
                            placeholder="Enter title2"
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
