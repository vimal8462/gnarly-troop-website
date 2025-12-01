"use client";

import { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, AddIcon } from "@/components/Icons";
import { Modal } from "@/components/Modal";

export default function LetterPage() {
    const [letters, setLetter] = useState([]);

    const [selectedLetter, setSelectedLetter] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const openDeleteModal = (vision: any) => {
        setSelectedLetter(vision);
        setDeleteModal(true);
    };
    const openAddModal = () => {
        setAddModal(true);
    };
    const closeAddModal = () => {
        setAddModal(false);
    };
    const addNewLetter = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const letter_from = formData.get("letter_from") as string;
        const remarks = formData.get("remarks") as string;
        const file = formData.get("file") as File;
        const letter = formData.get("letter") as File;
        const status = formData.get("status") as string;



        if (letter_from.length === 0) {
            alert("Letter from is required!");
            return;
        }

        if (remarks.length === 0) {
            alert("Remarks is required!");
            return;
        }

        if (!file || file.size === 0) {
            alert("Image file is required!");
            return;
        }
        if (!letter || letter.size === 0) {
            alert("Letter image is required!");
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
        if (letter) {
            const allowed = ["jpg", "jpeg", "png", "gif"];

            const ext = letter.name.split(".").pop()?.toLowerCase();

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

        const uploadData1 = new FormData();

        uploadData1.append("file", letter);
        const uploadRess = await fetch("/api/upload", {
            method: "POST",
            body: uploadData1,
        });
        const uploadJson1 = await uploadRess.json();
        if (!uploadRess.ok) {
            alert(uploadJson1.error || "File upload failed");
            return;
        }
        const imageUrl1 = uploadJson1.path;

        const saveRes = await fetch("/api/letters", {
            method: "POST",
            body: JSON.stringify({
                letter_from,
                remarks,
                image: imageUrl,
                letter_image: imageUrl1,
                status
            }),
        });

        const saveJson = await saveRes.json();

        if (!saveRes.ok) {
            alert(saveJson.error || "Failed to save vision");
            return;
        }


        const newLetter = {
            id: saveJson.id ?? letters.length + 1, // from DB or fallback
            letter_from,
            remarks,
            image: imageUrl,
            letter_image: imageUrl1,
            status
        };
        loadLetter()

        alert("Letter added successfully!");
        setAddModal(false);
    };
    const updateLetter = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const letter_from = formData.get("letter_from") as string;
        const remarks = formData.get("remarks") as string;
        const file = formData.get("file") as File;
        const letter = formData.get("letter") as File;
        const status = formData.get("status") as string;

        // === Validations ===
        if (letter_from.length === 0) {
            alert("Letter from is required!");
            return;
        }

        if (remarks.length === 0) {
            alert("Remarks is required!");
            return;
        }

        // Start with existing image
        let imageUrl = selectedLetter.image;
        let imageUrl1 = selectedLetter.letter_image;

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
        if (letter && letter.size > 0) {
            const allowed = ["jpg", "jpeg", "png", "gif"];

            const ext = letter.name.split(".").pop()?.toLowerCase();

            if (!allowed.includes(ext || "")) {
                alert("Invalid file type! Only JPG, PNG, GIF,JPEG allowed.");
                return;
            }
            const uploadData = new FormData();
            uploadData.append("file", letter);

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
            imageUrl1 = uploadJson.path;
        }

        // === Save updated vision ===
        const saveRes = await fetch(`/api/letters/${selectedLetter.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                letter_from,
                remarks,
                image: imageUrl,
                letter_image: imageUrl1,
                status,
            }),
        });

        const saveJson = await saveRes.json();

        if (!saveRes.ok) {
            alert(saveJson.error || "Update failed");
            return;
        }
        alert('Letter from updated successfuly');
        // Reload vision list
        loadLetter();
        setEditModal(false);
    };

    useEffect(() => {
        loadLetter();
    }, []);
    const openEditModal = (vision: any) => {
        setSelectedLetter(vision);
        setEditModal(true);
    };
    const loadLetter = async () => {
        try {
            const res = await fetch("/api/letters"); // your API endpoint
            const data = await res.json();
            setLetter(data);
        } finally {
        }
    };
    const deleteLetter = async () => {
        if (!selectedLetter) return;

        const res = await fetch(`/api/letters/${selectedLetter.id}`, {
            method: "DELETE",
        });

        const json = await res.json();

        if (!res.ok) {
            alert(json.error || "Failed to delete vision");
            return;
        }

        // Remove from UI list
        setLetter(letters.filter(v => v.id !== selectedLetter.id));

        setDeleteModal(false);
    };


    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Letters</h1>
            <button
                onClick={() => openAddModal()}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                <AddIcon />
                Add Letter
            </button>
            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Title From</th>
                            <th className="p-3 text-left">Remarks</th>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Letter</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {letters.map((letter) => (
                            <tr key={letter.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{letter.id}</td>
                                <td className="p-3">{letter.letter_from}</td>
                                <td className="p-3">{letter.remarks}</td>
                                <td className="p-3"><img src={letter.image} width="100" height="100" /></td>
                                <td className="p-3"><img src={letter.letter_image} width="100" height="100" /></td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded text-white text-sm capitalize
                    ${letter.status === 1 ? "bg-green-600" : "bg-red-500"}
                  `}>
                                        {letter.status === 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-4 justify-center">
                                    <span onClick={() => openEditModal(letter)}><EditIcon /></span>
                                    <span onClick={() => openDeleteModal(letter)}><DeleteIcon /></span>
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
                    <b className="ml-1">{selectedLetter?.title}</b>?
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
            <Modal isOpen={editModal} close={() => setEditModal(false)} title="Edit Vision">
                <form onSubmit={updateLetter} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">

                        {/* Title */}
                        <label>
                            Letter From:
                            <input
                                name="letter_from"
                                className="w-full border p-2 rounded mt-1"
                                placeholder="Enter letter from"
                                required
                                defaultValue={selectedLetter?.letter_from}

                            />
                        </label>

                        {/* Description */}
                        <label>
                            Remarks:
                            <textarea
                                name="remarks"
                                className="w-full border p-2 rounded mt-1"
                                placeholder="Enter remarks"
                                required
                                defaultValue={selectedLetter?.remarks}
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
                        <label>
                            Letter From:
                            <input
                                name="letter"
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
                                defaultValue={selectedLetter?.status}
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
            <Modal isOpen={addModal} close={closeAddModal} title="Add New Letter">
                <form onSubmit={addNewLetter} className="flex flex-col gap-4">

                    <label>
                        Letter From:
                        <input
                            name="letter_from"
                            className="w-full border p-2 rounded mt-1"
                            placeholder="Enter letter from"
                            required
                        />
                    </label>

                    <label>
                        Remarks:
                        <textarea className="w-full border p-2 rounded mt-1"
                            placeholder="Enter remarks" name="remarks"
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
                        Letter:
                        <input
                            name="letter"
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
