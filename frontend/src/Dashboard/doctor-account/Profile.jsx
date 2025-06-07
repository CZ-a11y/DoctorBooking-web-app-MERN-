import { useEffect, useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const Profile = ({ doctorData, onUpdate }) => {
    const [previewURL, setPreviewURL] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        gender: '',
        specialization: '',
        ticketPrice: '0',
        qualifications: [{ startingDate: '', endingDate: '', degree: '', university: '' }],
        experiences: [{ startingDate: '', endingDate: '', position: '', hospital: '' }],
        timeSlots: [{ day: '', startingTime: '', endingTime: '' }],
        about: '',
        photo: null
    });

    // Initialize form data with doctorData
    useEffect(() => {
        if (doctorData) {
            setFormData({
                name: doctorData.name || '',
                email: doctorData.email || '',
                phone: doctorData.phone || '',
                bio: doctorData.bio || '',
                gender: doctorData.gender || '',
                specialization: doctorData.specialization || '',
                ticketPrice: doctorData.ticketPrice?.toString() || '0',
                qualifications: doctorData.qualifications?.length > 0 ?
                    doctorData.qualifications.map(q => ({
                        startingDate: q.startingDate || '',
                        endingDate: q.endingDate || '',
                        degree: q.degree || '',
                        university: q.university || ''
                    })) : [{ startingDate: '', endingDate: '', degree: '', university: '' }],
                experiences: doctorData.experiences?.length > 0 ?
                    doctorData.experiences.map(e => ({
                        startingDate: e.startingDate || '',
                        endingDate: e.endingDate || '',
                        position: e.position || '',
                        hospital: e.hospital || ''
                    })) : [{ startingDate: '', endingDate: '', position: '', hospital: '' }],
                timeSlots: doctorData.timeSlots?.length > 0 ?
                    doctorData.timeSlots.map(t => ({
                        day: t.day || '',
                        startingTime: t.startingTime || '',
                        endingTime: t.endingTime || ''
                    })) : [{ day: '', startingTime: '', endingTime: '' }],
                about: doctorData.about || '',
                photo: doctorData.photo || null
            });

            if (doctorData.photo) {
                setPreviewURL(doctorData.photo);
            }
        }
    }, [doctorData]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArrayInputChange = (field, index, e) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = {
            ...updatedArray[index],
            [e.target.name]: e.target.value
        };
        setFormData({ ...formData, [field]: updatedArray });
    };

    const updateProfileHandler = async e => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }
            toast.success(result.message);
            if (onUpdate) onUpdate(); // Trigger parent to refetch data
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleAddItem = (field) => {
        const template = {
            qualifications: { startingDate: '', endingDate: '', degree: '', university: '' },
            experiences: { startingDate: '', endingDate: '', position: '', hospital: '' },
            timeSlots: { day: '', startingTime: '', endingTime: '' }
        };
        setFormData({
            ...formData,
            [field]: [...formData[field], template[field]]
        });
    };

    const handleRemoveItem = (field, index) => {
        const updatedArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: updatedArray });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error("File size should be less than 2MB");
            return;
        }

        try {
            const data = await uploadImageToCloudinary(file);
            setPreviewURL(data.url);
            setFormData({ ...formData, photo: data.url });
        } catch (error) {
            toast.error("Failed to upload image");
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Profile Information
            </h2>

            <form className="space-y-6" onSubmit={updateProfileHandler}>
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <input
                            type="text"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Short bio (max 100 chars)"
                            maxLength={100}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Professional Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                        <select
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                            <option value="surgeon">Surgeon</option>
                            <option value="neurologist">Neurologist</option>
                            <option value="dermatologist">Dermatologist</option>
                            <option value="cardiologist">Cardiologist</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Price ($)</label>
                        <input
                            type="number"
                            name="ticketPrice"
                            value={formData.ticketPrice}
                            onChange={handleInputChange}
                            placeholder="100"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Qualifications */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">Qualifications</h3>
                    {formData.qualifications.map((item, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Starting Date</label>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate || ''}
                                        onChange={(e) => handleArrayInputChange('qualifications', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ending Date</label>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate || ''}
                                        onChange={(e) => handleArrayInputChange('qualifications', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={item.degree || ''}
                                        onChange={(e) => handleArrayInputChange('qualifications', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                                    <input
                                        type="text"
                                        name="university"
                                        value={item.university || ''}
                                        onChange={(e) => handleArrayInputChange('qualifications', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveItem('qualifications', index)}
                                className="flex items-center text-red-600 text-sm"
                            >
                                <AiOutlineDelete className="mr-1" /> Remove Qualification
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddItem('qualifications')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Add Qualification
                    </button>
                </div>

                {/* Experiences */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">Experiences</h3>
                    {formData.experiences.map((item, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Starting Date</label>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate || ''}
                                        onChange={(e) => handleArrayInputChange('experiences', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ending Date</label>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate || ''}
                                        onChange={(e) => handleArrayInputChange('experiences', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={item.position || ''}
                                        onChange={(e) => handleArrayInputChange('experiences', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
                                    <input
                                        type="text"
                                        name="hospital"
                                        value={item.hospital || ''}
                                        onChange={(e) => handleArrayInputChange('experiences', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveItem('experiences', index)}
                                className="flex items-center text-red-600 text-sm"
                            >
                                <AiOutlineDelete className="mr-1" /> Remove Experience
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddItem('experiences')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Add Experience
                    </button>
                </div>

                {/* Time Slots */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">Time Slots</h3>
                    {formData.timeSlots.map((item, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                                    <select
                                        name="day"
                                        value={item.day || ''}
                                        onChange={(e) => handleArrayInputChange('timeSlots', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select</option>
                                        <option value="monday">Monday</option>
                                        <option value="tuesday">Tuesday</option>
                                        <option value="wednesday">Wednesday</option>
                                        <option value="thursday">Thursday</option>
                                        <option value="friday">Friday</option>
                                        <option value="saturday">Saturday</option>
                                        <option value="sunday">Sunday</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Starting Time</label>
                                    <input
                                        type="time"
                                        name="startingTime"
                                        value={item.startingTime || ''}
                                        onChange={(e) => handleArrayInputChange('timeSlots', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ending Time</label>
                                    <input
                                        type="time"
                                        name="endingTime"
                                        value={item.endingTime || ''}
                                        onChange={(e) => handleArrayInputChange('timeSlots', index, e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem('timeSlots', index)}
                                        className="flex items-center text-red-600 text-sm"
                                    >
                                        <AiOutlineDelete className="mr-1" /> Remove Slot
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleAddItem('timeSlots')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Add Time Slot
                    </button>
                </div>

                {/* About */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                    <textarea
                        name="about"
                        rows={5}
                        value={formData.about}
                        onChange={handleInputChange}
                        placeholder="Write about yourself..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Profile Photo */}
                <div className="flex items-center gap-4">
                    <div className="shrink-0">
                        <figure className="w-16 h-16 rounded-full border-2 border-blue-500 overflow-hidden">
                            {previewURL ? (
                                <img src={previewURL} alt="Profile preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">Photo</span>
                                </div>
                            )}
                        </figure>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Photo (Optional)
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <label
                                htmlFor="photo"
                                className="block w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors"
                            >
                                Choose File
                            </label>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            JPG, PNG (Max 2MB)
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;