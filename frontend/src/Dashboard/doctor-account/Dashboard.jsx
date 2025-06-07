import React, { useState } from "react";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../Hooks/useFetchData";
import { BASE_URL } from "../../config";
import Tabs from "./Tab";
import starIcon from '../../assets/images/Star.png';
import DoctorAbout from "../../pages/Doctor/DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";

const Dashboard = () => {
    const { data, loading, error } = useGetProfile(
        `${BASE_URL}/doctors/profile/me`
    );
    const [tab, setTab] = useState('overview');

    return (
        <section className="py-8">
            <div className="max-w-[1170px] px-5 mx-auto">
                {loading && !error && <Loader />}
                {error && !loading && <Error />}

                {!loading && !error && data && (
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                        <Tabs tab={tab} setTab={setTab} />

                        <div className="lg:col-span-2">
                            {data.isApproved === "pending" && (
                                <div className="flex items-start p-4 mb-6 text-yellow-800 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div className="ml-3 text-sm">
                                        <p className="font-medium">Profile Approval Pending</p>
                                        <p>To get approval please complete your profile. We'll review manually and approve within 3 days.</p>
                                    </div>
                                </div>
                            )}

                            <div className="bg-white rounded-xl shadow-sm p-6">
                                {tab === "overview" && (
                                    <div className="space-y-8">
                                        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                                            <figure className="w-48 h-48 shrink-0">
                                                <img
                                                    src={data?.photo}
                                                    alt={data?.name || "Doctor"}
                                                    className="w-full h-full rounded-xl object-cover border-4 border-white shadow-md"
                                                />
                                            </figure>
                                            <div className="text-center md:text-left">
                                                <span className="inline-block bg-[#CCF0F3] text-irisBlueColor py-1 px-4 rounded-full text-sm font-semibold mb-3">
                                                    {data.specialization} Specialist
                                                </span>
                                                <h3 className="text-2xl md:text-3xl font-bold text-headingColor">
                                                    {data.name}
                                                </h3>
                                                <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                                    <span className="flex items-center gap-1 text-headingColor text-sm font-semibold">
                                                        <img src={starIcon} alt="Rating" className="w-4 h-4" />
                                                        {data.averageRating}
                                                    </span>
                                                    <span className="text-gray-500">•</span>
                                                    <span className="text-headingColor text-sm font-medium">
                                                        {data.totalRating} patients
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mt-3 max-w-md">
                                                    {data.bio || "No bio available"}
                                                </p>
                                            </div>
                                        </div>

                                        <DoctorAbout
                                            name={data.name}
                                            about={data.about}
                                            qualifications={data.qualifications}
                                            experiences={data.experiences}
                                        />
                                    </div>
                                )}

                                {tab === "appointments" && (
                                    <div >
                                        <Appointments appointments={data.appointments} />
                                    </div>
                                )}

                                {tab === "settings" && (
                                    <div >
                                        <Profile doctorData={data} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Dashboard;