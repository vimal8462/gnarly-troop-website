"use client";

import { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, AddIcon } from "@/components/Icons";
import { Modal } from "@/components/Modal";

export default function TimelinePage() {
    const [timelines, setTimeline] = useState([]);

    const [selectedTimeline, setSelectedTimeline] = useState<any>(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    const openDeleteModal = (timeline: any) => {
        setSelectedTimeline(timeline);
        setDeleteModal(true);
    };
    const openAddModal = () => {
        setAddModal(true);
    };
    const closeAddModal = () => {
        setAddModal(false);
    };
    const addNewTimeline = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = formData.get("title") as string;
        const details = formData.get("details") as string;
        const year = formData.get("year")
        const flag_marker = formData.get("flag_marker")
        const city = formData.get("city")
        const subcity = formData.get("subcity")
        const status = formData.get("status") as string;



        if (title.length === 0) {
            alert("Title is required!");
            return;
        }
        if (flag_marker.length === 0) {
            alert("Flag marker is required!");
            return;
        }
        if (year.length === 0) {
            alert("Year is required!");
            return;
        }
        if (city.length === 0) {
            alert("City is required!");
            return;
        }
        if (subcity.length === 0) {
            alert("Subcity is required!");
            return;
        }
        if (details.length === 0) {
            alert("Details is required!");
            return;
        }



        const saveRes = await fetch("/api/timelines", {
            method: "POST",
            body: JSON.stringify({
                title,
                details,
                year,
                flag_marker,
                city,
                subcity,
                status
            }),
        });

        const saveJson = await saveRes.json();

        if (!saveRes.ok) {
            alert(saveJson.error || "Failed to save timeline");
            return;
        }


        const newTimeline = {
            id: saveJson.id ?? timelines.length + 1, // from DB or fallback
            title,
            details,
            year,
            flag_marker,
            city,
            subcity,
            status
        };
        loadTimeline()

        alert("Timeline added successfully!");
        setAddModal(false);
    };
    const updateTimeline = async (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get("title") as string;
        const details = formData.get("details") as string;
        const year = formData.get("year")
        const flag_marker = formData.get("flag_marker")
        const city = formData.get("city")
        const subcity = formData.get("subcity")
        const status = formData.get("status") as string;


        // === Validations ===
        if (title.length === 0) {
            alert("Title is required!");
            return;
        }
        if (flag_marker.length === 0) {
            alert("Flag marker is required!");
            return;
        }
        if (year.length === 0) {
            alert("Year is required!");
            return;
        }
        if (!/^\d+$/.test(year)) {
            alert("Year must be a number only!");
            return;
        }
        if (city.length === 0) {
            alert("City is required!");
            return;
        }
        if (subcity.length === 0) {
            alert("Subcity is required!");
            return;
        }
        if (details.length === 0) {
            alert("Details is required!");
            return;
        }

        // === Save updated vision ===
        const saveRes = await fetch(`/api/timelines/${selectedTimeline.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                details,
                year,
                flag_marker,
                city,
                subcity,
                status
            }),
        });

        const saveJson = await saveRes.json();

        if (!saveRes.ok) {
            alert(saveJson.error || "Update failed");
            return;
        }
        alert("Timeline updated successfuly");
        // Reload timeline list
        loadTimeline();
        setEditModal(false);
    };

    useEffect(() => {
        loadTimeline();
    }, []);
    const openEditModal = (timeline: any) => {
        setSelectedTimeline(timeline);
        setEditModal(true);
    };
    const loadTimeline = async () => {
        try {
            const res = await fetch("/api/timelines"); // your API endpoint
            const data = await res.json();
            setTimeline(data);
        } finally {
        }
    };
    const deleteTimeline = async () => {
        if (!selectedTimeline) return;

        const res = await fetch(`/api/timelines/${selectedTimeline.id}`, {
            method: "DELETE",
        });

        const json = await res.json();

        if (!res.ok) {
            alert(json.error || "Failed to delete timeline");
            return;
        }

        // Remove from UI list
        setTimeline(timelines.filter(v => v.id !== selectedTimeline.id));

        setDeleteModal(false);
    };


    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Timelines</h1>
            <button
                onClick={() => openAddModal()}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                <AddIcon />
                Add Timeline
            </button>
            <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Year</th>
                            <th className="p-3 text-left">Flag Marker</th>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">City</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {timelines.map((timeline) => (
                            <tr key={timeline.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{timeline.id}</td>
                                <td className="p-3">{timeline.year}</td>
                                <td className="p-3">{timeline.country}</td>
                                <td className="p-3">{timeline.details}</td>
                                <td className="p-3">{timeline.city}</td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded text-white text-sm capitalize
                    ${timeline.status === 1 ? "bg-green-600" : "bg-red-500"}
                  `}>
                                        {timeline.status === 1 ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-4 justify-center">
                                    <span onClick={() => openEditModal(timeline)}><EditIcon /></span>
                                    <span onClick={() => openDeleteModal(timeline)}><DeleteIcon /></span>
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
                    <b className="ml-1">{selectedTimeline?.title}</b>?
                </p>

                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={() => setDeleteModal(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={deleteTimeline}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                </div>
            </Modal>


            {/* Edit Modal */}
            <Modal isOpen={editModal} close={() => setEditModal(false)} title="Edit Vision">
                <form onSubmit={updateTimeline} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <label>
                            Year:
                            <input
                                name="year"
                                type="number" maxLength={4} minLength={4}
                                className="w-full border p-2 rounded mt-1"
                                required
                                defaultValue={selectedTimeline?.year}
                            />
                        </label>
                        {/* Title */}
                        <label>
                            Title:
                            <input
                                className="w-full border p-2 rounded mt-1"
                                name="title"
                                required
                                defaultValue={selectedTimeline?.title}
                            />
                        </label>

                        {/* Description */}
                        <label>
                            Details:
                            <textarea
                                name="details"
                                className="w-full border p-2 rounded mt-1"
                                placeholder="Enter details"
                                required
                                defaultValue={selectedTimeline?.details}
                            />
                        </label>

                        <label>
                            Flag Marker:
                            <input
                                name="flag_marker"
                                type="text"
                                className="w-full border p-2 rounded mt-1"
                                required
                                defaultValue={selectedTimeline?.country}

                            />
                        </label>
                        <label>
                            City:
                            <input
                                name="city"
                                type="text"
                                className="w-full border p-2 rounded mt-1"
                                required
                                defaultValue={selectedTimeline?.cities}

                            />
                        </label>
                        <label>
                            Subcity:
                            <input
                                name="subcity"
                                type="text"
                                className="w-full border p-2 rounded mt-1"
                                required
                                defaultValue={selectedTimeline?.subcity}

                            />
                        </label>

                        {/* Status */}
                        <label>
                            Status:
                            <select
                                className="border p-2 rounded mt-1"
                                name="status"
                                defaultValue={selectedTimeline?.status}
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
                <form onSubmit={addNewTimeline} className="flex flex-col gap-4">
                    <label>
                        Year:
                        <input
                            name="year"
                            type="number" maxLength={4} minLength={4}
                            className="w-full border p-2 rounded mt-1"
                            placeholder="Enter year"
                            required
                        />
                    </label>
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
                        Details:
                        <textarea className="w-full border p-2 rounded mt-1"
                            placeholder="Enter details" name="details"
                            required></textarea>

                    </label>
                    <label>
                        Flag Marker:
                        <input
                            name="flag_marker"
                            type="text"
                            className="w-full border p-2 rounded mt-1"
                            required
                        />
                    </label>
                    <label>
                        City:
                        <input
                            name="city"
                            type="text"
                            className="w-full border p-2 rounded mt-1"
                            required
                        />
                    </label>
                    <label>
                        Subcity:
                        <input
                            name="subcity"
                            type="text"
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
                            Save
                        </button>
                    </div>

                </form>
            </Modal>

        </div>
    );
}
