"use client";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import "../style/registration.css";
import { useState } from "react";

export default function RegistrationPage() {
    const [form, setForm] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const resetForm = () => {
        setForm({});
        setErrors({});
    };

    // Validation logic
    const validateField = (name: string, value: string) => {
        switch (name) {
            case "name":
                return value.trim() === "" ? "Name is required" : "";

            case "phone":
                return /^\d{10}$/.test(value)
                    ? ""
                    : "Mobile number must be 10 digits";

            case "email":
                return /\S+@\S+\.\S+/.test(value)
                    ? ""
                    : "Invalid email format";

            case "dob":
                return value ? "" : "Date of Birth is required";

            case "address":
                return value ? "" : "Address is required";


            case "pincode":
                return /^\d{6}$/.test(value) ? "" : "Pincode must be 6 digits";

            case "state":
                return value.trim() === "" ? "State is required" : "";

            case "district":
                return value.trim() === "" ? "District is required" : "";

            case "country":
                return value.trim() === "" ? "Country is required" : "";

            case "father_name":
                return value.trim() === "" ? "Father name is required" : "";

            default:
                return "";
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setForm({ ...form, [name]: value });

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
        if (response.status) {
            alert(response.message);
            resetForm();
            e.target.reset();
        } else {
            alert(response.message);
        }
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

                                {/* Pincode */}
                                <div className="mb-4">
                                    <label className="block font-medium">Pin Code</label>
                                    <input
                                        type="number"
                                        name="pincode"
                                        className={`input-box ${errors.age ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.pincode && (
                                        <p className="text-red-600 text-sm">{errors.pincode}</p>
                                    )}
                                </div>

                                {/* State */}
                                <div className="mb-4">
                                    <label className="block font-medium">State</label>
                                    <input
                                        name="state"
                                        className={`input-box ${errors.state ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.state && (
                                        <p className="text-red-600 text-sm">{errors.state}</p>
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

                                {/* Organization Details */}
                                <div className="mb-4">
                                    <label className="block font-medium">
                                        Address
                                    </label>
                                    <input
                                        name="address"
                                        className={`input-box ${errors.address ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.address && (
                                        <p className="text-red-600 text-sm">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                {/* District */}
                                <div className="mb-4">
                                    <label className="block font-medium">District</label>
                                    <input
                                        name="district"
                                        className={`input-box ${errors.district ? "border-red-500" : ""}`}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {errors.district && (
                                        <p className="text-red-600 text-sm">
                                            {errors.district}
                                        </p>
                                    )}
                                </div>

                                {/* Country */}
                                <div className="mb-4">
                                    <label className="block font-medium">Country</label>
                                    <select
                                        name="country"
                                        className="input-box"
                                        onChange={handleChange}
                                    >
                                        <option value="">--Select Country--</option>
                                        <option value="Afghanistan">Afghanistan</option>
                                        <option value="Albania">Albania</option>
                                        <option value="Algeria">Algeria</option>
                                        <option value="Andorra">Andorra</option>
                                        <option value="Angola">Angola</option>
                                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Armenia">Armenia</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Austria">Austria</option>
                                        <option value="Azerbaijan">Azerbaijan</option>
                                        <option value="Bahamas">Bahamas</option>
                                        <option value="Bahrain">Bahrain</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Barbados">Barbados</option>
                                        <option value="Belarus">Belarus</option>
                                        <option value="Belgium">Belgium</option>
                                        <option value="Belize">Belize</option>
                                        <option value="Benin">Benin</option>
                                        <option value="Bhutan">Bhutan</option>
                                        <option value="Bolivia">Bolivia</option>
                                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                        <option value="Botswana">Botswana</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="Brunei">Brunei</option>
                                        <option value="Bulgaria">Bulgaria</option>
                                        <option value="Burkina Faso">Burkina Faso</option>
                                        <option value="Burundi">Burundi</option>
                                        <option value="Cabo Verde">Cabo Verde</option>
                                        <option value="Cambodia">Cambodia</option>
                                        <option value="Cameroon">Cameroon</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Central African Republic">Central African Republic</option>
                                        <option value="Chad">Chad</option>
                                        <option value="Chile">Chile</option>
                                        <option value="China">China</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Comoros">Comoros</option>
                                        <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
                                        <option value="Costa Rica">Costa Rica</option>
                                        <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                                        <option value="Croatia">Croatia</option>
                                        <option value="Cuba">Cuba</option>
                                        <option value="Cyprus">Cyprus</option>
                                        <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
                                        <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                                        <option value="Denmark">Denmark</option>
                                        <option value="Djibouti">Djibouti</option>
                                        <option value="Dominica">Dominica</option>
                                        <option value="Dominican Republic">Dominican Republic</option>
                                        <option value="Ecuador">Ecuador</option>
                                        <option value="Egypt">Egypt</option>
                                        <option value="El Salvador">El Salvador</option>
                                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                                        <option value="Eritrea">Eritrea</option>
                                        <option value="Estonia">Estonia</option>
                                        <option value="Eswatini">Eswatini</option>
                                        <option value="Ethiopia">Ethiopia</option>
                                        <option value="Fiji">Fiji</option>
                                        <option value="Finland">Finland</option>
                                        <option value="France">France</option>
                                        <option value="Gabon">Gabon</option>
                                        <option value="Gambia">Gambia</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Ghana">Ghana</option>
                                        <option value="Greece">Greece</option>
                                        <option value="Grenada">Grenada</option>
                                        <option value="Guatemala">Guatemala</option>
                                        <option value="Guinea">Guinea</option>
                                        <option value="Guinea-Bissau">Guinea-Bissau</option>
                                        <option value="Guyana">Guyana</option>
                                        <option value="Haiti">Haiti</option>
                                        <option value="Holy See">Holy See</option>
                                        <option value="Honduras">Honduras</option>
                                        <option value="Hungary">Hungary</option>
                                        <option value="Iceland">Iceland</option>
                                        <option value="India">India</option>
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Iran">Iran</option>
                                        <option value="Iraq">Iraq</option>
                                        <option value="Ireland">Ireland</option>
                                        <option value="Israel">Israel</option>
                                        <option value="Italy">Italy</option>
                                        <option value="Jamaica">Jamaica</option>
                                        <option value="Japan">Japan</option>
                                        <option value="Jordan">Jordan</option>
                                        <option value="Kazakhstan">Kazakhstan</option>
                                        <option value="Kenya">Kenya</option>
                                        <option value="Kiribati">Kiribati</option>
                                        <option value="Kuwait">Kuwait</option>
                                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                                        <option value="Laos">Laos</option>
                                        <option value="Latvia">Latvia</option>
                                        <option value="Lebanon">Lebanon</option>
                                        <option value="Lesotho">Lesotho</option>
                                        <option value="Liberia">Liberia</option>
                                        <option value="Libya">Libya</option>
                                        <option value="Liechtenstein">Liechtenstein</option>
                                        <option value="Lithuania">Lithuania</option>
                                        <option value="Luxembourg">Luxembourg</option>
                                        <option value="Madagascar">Madagascar</option>
                                        <option value="Malawi">Malawi</option>
                                        <option value="Malaysia">Malaysia</option>
                                        <option value="Maldives">Maldives</option>
                                        <option value="Mali">Mali</option>
                                        <option value="Malta">Malta</option>
                                        <option value="Marshall Islands">Marshall Islands</option>
                                        <option value="Mauritania">Mauritania</option>
                                        <option value="Mauritius">Mauritius</option>
                                        <option value="Mexico">Mexico</option>
                                        <option value="Micronesia">Micronesia</option>
                                        <option value="Moldova">Moldova</option>
                                        <option value="Monaco">Monaco</option>
                                        <option value="Mongolia">Mongolia</option>
                                        <option value="Montenegro">Montenegro</option>
                                        <option value="Morocco">Morocco</option>
                                        <option value="Mozambique">Mozambique</option>
                                        <option value="Myanmar">Myanmar</option>
                                        <option value="Namibia">Namibia</option>
                                        <option value="Nauru">Nauru</option>
                                        <option value="Nepal">Nepal</option>
                                        <option value="Netherlands">Netherlands</option>
                                        <option value="New Zealand">New Zealand</option>
                                        <option value="Nicaragua">Nicaragua</option>
                                        <option value="Niger">Niger</option>
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="North Korea">North Korea</option>
                                        <option value="North Macedonia">North Macedonia</option>
                                        <option value="Norway">Norway</option>
                                        <option value="Oman">Oman</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="Palau">Palau</option>
                                        <option value="Palestine State">Palestine State</option>
                                        <option value="Panama">Panama</option>
                                        <option value="Papua New Guinea">Papua New Guinea</option>
                                        <option value="Paraguay">Paraguay</option>
                                        <option value="Peru">Peru</option>
                                        <option value="Philippines">Philippines</option>
                                        <option value="Poland">Poland</option>
                                        <option value="Portugal">Portugal</option>
                                        <option value="Qatar">Qatar</option>
                                        <option value="Romania">Romania</option>
                                        <option value="Russia">Russia</option>
                                        <option value="Rwanda">Rwanda</option>
                                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                        <option value="Saint Lucia">Saint Lucia</option>
                                        <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                                        <option value="Samoa">Samoa</option>
                                        <option value="San Marino">San Marino</option>
                                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                        <option value="Senegal">Senegal</option>
                                        <option value="Serbia">Serbia</option>
                                        <option value="Seychelles">Seychelles</option>
                                        <option value="Sierra Leone">Sierra Leone</option>
                                        <option value="Singapore">Singapore</option>
                                        <option value="Slovakia">Slovakia</option>
                                        <option value="Slovenia">Slovenia</option>
                                        <option value="Solomon Islands">Solomon Islands</option>
                                        <option value="Somalia">Somalia</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="South Korea">South Korea</option>
                                        <option value="South Sudan">South Sudan</option>
                                        <option value="Spain">Spain</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                        <option value="Sudan">Sudan</option>
                                        <option value="Suriname">Suriname</option>
                                        <option value="Sweden">Sweden</option>
                                        <option value="Switzerland">Switzerland</option>
                                        <option value="Syria">Syria</option>
                                        <option value="Tajikistan">Tajikistan</option>
                                        <option value="Tanzania">Tanzania</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="Timor-Leste">Timor-Leste</option>
                                        <option value="Togo">Togo</option>
                                        <option value="Tonga">Tonga</option>
                                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                        <option value="Tunisia">Tunisia</option>
                                        <option value="Turkey">Turkey</option>
                                        <option value="Turkmenistan">Turkmenistan</option>
                                        <option value="Tuvalu">Tuvalu</option>
                                        <option value="Uganda">Uganda</option>
                                        <option value="Ukraine">Ukraine</option>
                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="United States of America">United States of America</option>
                                        <option value="Uruguay">Uruguay</option>
                                        <option value="Uzbekistan">Uzbekistan</option>
                                        <option value="Vanuatu">Vanuatu</option>
                                        <option value="Venezuela">Venezuela</option>
                                        <option value="Vietnam">Vietnam</option>
                                        <option value="Yemen">Yemen</option>
                                        <option value="Zambia">Zambia</option>
                                        <option value="Zimbabwe">Zimbabwe</option>
                                    </select>

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

                                {/* Submit */}
                                <div className="mt-4">
                                    <label className="block font-medium">&nbsp;</label>
                                    <button type="submit" className="btn-register">
                                        REGISTER NOW
                                    </button>
                                </div>

                            </div>
                        </div>




                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}
