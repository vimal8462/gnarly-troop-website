"use client";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import "../style/registration.css";
import { useState } from "react";

export default function RegistrationPage() {
    const [form, setForm] = useState<any>({});
    const [errors, setErrors] = useState<any>({});

    // Validation logic
    const validateField = (name: string, value: string) => {
        switch (name) {
            case "name":
                return value.trim() === "" ? "Name is required" : "";

            case "phone":
                return /^\d{10}$/.test(value)
                    ? ""
                    : "Phone number must be 10 digits";

            case "email":
                return /\S+@\S+\.\S+/.test(value)
                    ? ""
                    : "Invalid email format";

            case "age":
                return value && Number(value) > 0 ? "" : "Age must be valid";

            case "aadhar_passport":
                return value.trim() === "" ? "Aadhar/Passport is required" : "";

            case "dob":
                return value ? "" : "Date of Birth is required";

            case "parent_phone":
                return /^\d{10}$/.test(value)
                    ? ""
                    : "Parent phone number must be 10 digits";

            case "preferred_language":
            case "father_name":
            case "organization_details":
                return value.trim() === "" ? "This field is required" : "";

            default:
                return "";
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        let updated = { ...form, [name]: value };
        if (name === "registration_for") {
            updated.amount = value === "Internship" ? "1000" :
                value === "Volunteer" ? "500" : "";
        }
        setForm(updated);
        // setForm({ ...form, [name]: value });

        // Inline validation
        setErrors({
            ...errors,
            [name]: validateField(name, value),
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let newErrors: any = {};

        Object.keys(form).forEach((key) => {
            const msg = validateField(key, form[key]);
            if (msg) newErrors[key] = msg;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(form),
        });

        const response = await res.json();
        alert(response.message);
    };

    return (
        <>
            <Header />

            <main className="min-h-[80vh] py-10 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h3
                        className="mb-6 pb-1 border-b-4 border-[#00A3FF] text-2xl font-semibold"
                        style={{ width: "100%" }}
                    >
                        Registration Form
                    </h3>

                    {/* FORM */}
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3">

                            {/* LEFT SIDE */}
                            <div className="w-full md:w-1/2 px-3">

                                {/* Registration For */}
                                <div className="mb-4">
                                    <label className="block font-medium">Registration for</label>
                                    <input
                                        name="registration_for"
                                        className={`input-box ${errors.name ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.registration_for && (
                                        <p className="text-red-600 text-sm">{errors.registration_for}</p>
                                    )}
                                </div>

                                {/* Name */}
                                <div className="mb-4">
                                    <label className="block font-medium">Name</label>
                                    <input
                                        name="name"
                                        className={`input-box ${errors.name ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.name && (
                                        <p className="text-red-600 text-sm">{errors.name}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="mb-4">
                                    <label className="block font-medium">Phone No.</label>
                                    <input
                                        name="phone"
                                        className={`input-box ${errors.phone ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-600 text-sm">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Age */}
                                <div className="mb-4">
                                    <label className="block font-medium">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        className={`input-box ${errors.age ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.age && (
                                        <p className="text-red-600 text-sm">{errors.age}</p>
                                    )}
                                </div>

                                {/* Aadhar */}
                                <div className="mb-4">
                                    <label className="block font-medium">Aadhar/Passport No.</label>
                                    <input
                                        name="aadhar_passport"
                                        className={`input-box ${errors.aadhar_passport ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.aadhar_passport && (
                                        <p className="text-red-600 text-sm">{errors.aadhar_passport}</p>
                                    )}
                                </div>

                                {/* Representative Of */}
                                <div className="mb-4">
                                    <label className="block font-medium">Representative Of</label>
                                    <select
                                        name="representative_of"
                                        className="input-box"
                                        onChange={handleChange}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="School">School</option>
                                        <option value="College">College</option>
                                        <option value="Organization">Organization</option>
                                    </select>
                                </div>

                                {/* Preferred Language */}
                                <div className="mb-4">
                                    <label className="block font-medium">Preferred Language</label>
                                    <input
                                        name="preferred_language"
                                        className={`input-box ${errors.preferred_language ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.preferred_language && (
                                        <p className="text-red-600 text-sm">{errors.preferred_language}</p>
                                    )}
                                </div>

                                {/* Father Name */}
                                <div className="mb-4">
                                    <label className="block font-medium">Father’s Name</label>
                                    <input
                                        name="father_name"
                                        className={`input-box ${errors.father_name ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.father_name && (
                                        <p className="text-red-600 text-sm">{errors.father_name}</p>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT SECTION */}
                            <div className="w-full md:w-1/2 px-3">

                                {/* Amount */}
                                <div className="mb-4">
                                    <label className="block font-medium">Amount</label>
                                    
                                    <input
                                        type="number"
                                        name="amount"
                                        className={`input-box ${errors.dob ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.amount && (
                                        <p className="text-red-600 text-sm">{errors.amount}</p>
                                    )}
                                </div>

                                {/* DOB */}
                                <div className="mb-4">
                                    <label className="block font-medium">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        className={`input-box ${errors.dob ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.dob && (
                                        <p className="text-red-600 text-sm">{errors.dob}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block font-medium">Email ID</label>
                                    <input
                                        name="email"
                                        className={`input-box ${errors.email ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 text-sm">{errors.email}</p>
                                    )}
                                </div>

                                {/* Gender */}
                                <div className="mb-4">
                                    <label className="block font-medium">Gender</label>
                                    <select
                                        name="gender"
                                        className="input-box"
                                        onChange={handleChange}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* T-shirt Size */}
                                <div className="mb-4">
                                    <label className="block font-medium">T-Shirt Size</label>
                                    <select
                                        name="tshirt_size"
                                        className="input-box"
                                        onChange={handleChange}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                </div>

                                {/* Occupation */}
                                <div className="mb-4">
                                    <label className="block font-medium">Occupation</label>
                                    <select
                                        name="occupation"
                                        className="input-box"
                                        onChange={handleChange}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="Business">Business</option>
                                        <option value="Student">Student</option>
                                        <option value="Employee">Employee</option>
                                    </select>
                                </div>

                                {/* Organization Details */}
                                <div className="mb-4">
                                    <label className="block font-medium">
                                        School/College/Organization Name & Address
                                    </label>
                                    <input
                                        name="organization_details"
                                        className={`input-box ${errors.organization_details ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.organization_details && (
                                        <p className="text-red-600 text-sm">
                                            {errors.organization_details}
                                        </p>
                                    )}
                                </div>

                                {/* Parent Phone */}
                                <div className="mb-4">
                                    <label className="block font-medium">Mobile number of Parent</label>
                                    <input
                                        name="parent_phone"
                                        className={`input-box ${errors.parent_phone ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.parent_phone && (
                                        <p className="text-red-600 text-sm">
                                            {errors.parent_phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* AGREEMENT CHECKBOX BELOW BOTH SECTIONS */}
                        <div className="w-full mt-6">
                            <div className="flex items-start">
                                <input type="checkbox" className="mt-1 mr-2" required />
                                <label>
                                    I agree with{" "}
                                    <a href="#" className="text-blue-600 underline">
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="mt-6">
                            <button type="submit" className="btn-register">
                                REGISTER NOW
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}
