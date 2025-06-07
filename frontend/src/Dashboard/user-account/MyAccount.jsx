import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Profile from "./Profile";
import MyBooking from "./MyBooking";
import useGetProfile from "../../Hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
const MyAccount = () => {
    const { dispatch } = useContext(AuthContext);
    const [tab, setTab] = useState('bookings');
    const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/profile/me`);

    console.log(userData, 'userdata');

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    const handleDeleteAccount = () => {
        // Add delete account functionality here
        console.log("Account deletion requested");
    };

    return (
        <section className="py-8">
            <div className="max-w-[1170px] px-5 mx-auto">
                {loading && !error && <Loading />}
                {error && !loading && <Error errMessage={error} />}
                {
                    !loading && !error && <div className="grid md:grid-cols-3 gap-10">
                        {/* Profile Sidebar */}
                        <div className="pb-[50px] px-[30px] rounded-md bg-white shadow-md">
                            <div className="flex items-center justify-center">
                                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                                    <img
                                        src={userData?.photo}
                                        alt="User profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </figure>
                            </div>

                            <div className="text-center mt-4">
                                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                                    {userData?.name}
                                </h3>
                                <p className="text-textColor text-[15px] leading-6 font-medium">
                                    {userData?.email}
                                </p>
                                <p className="text-textColor text-[15px] leading-6 font-medium">
                                    Blood Type:
                                    <span className="ml-2 text-headingColor text-[22px] leading-8">
                                        {userData?.bloodType}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-[50px] md:mt-[100px]">
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white hover:bg-[#2c2e32] transition-all"
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="w-full bg-red-600 hover:bg-red-700 mt-4 p-3 text-[16px] leading-7 rounded-md text-white transition-all"
                                >
                                    Delete account
                                </button>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="md:col-span-2 md:px-[30px]">
                            {/* Tab Navigation */}
                            <div className="flex gap-4 mb-8">
                                <button
                                    onClick={() => setTab('bookings')}
                                    className={`py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] border border-solid border-primaryColor transition-all
                                    ${tab === 'bookings' ? 'bg-primaryColor text-white' : 'hover:bg-primaryColor/10'}`}
                                >
                                    My Bookings
                                </button>
                                <button
                                    onClick={() => setTab('settings')}
                                    className={`py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] border border-solid border-primaryColor transition-all
                                    ${tab === 'settings' ? 'bg-primaryColor text-white' : 'hover:bg-primaryColor/10'}`}
                                >
                                    Profile Settings
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="bg-white p-6 rounded-md shadow-md">
                                {tab === 'bookings' && <MyBooking />}
                                {tab === 'settings' && <Profile user={userData} />}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};

export default MyAccount;