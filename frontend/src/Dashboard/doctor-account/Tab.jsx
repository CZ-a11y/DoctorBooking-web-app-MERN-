import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Tab = ({ tab, setTab }) => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate('/');
    };

    const handleDeleteAccount = () => {
        // Add your account deletion logic here
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            // Dispatch account deletion action
            console.log("Account deletion requested");
        }
    };

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "appointments", label: "Appointments" },
        { id: "settings", label: "Profile Settings" }
    ];

    return (
        <div className="lg:min-w-[250px]">
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
            >
                <BiMenu className="w-6 h-6 text-gray-600" />
            </button>

            {/* Desktop Tabs */}
            <div className="hidden lg:flex flex-col p-6 bg-white shadow-panelShadow rounded-md gap-2">
                {tabs.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors ${tab === item.id
                                ? "bg-indigo-100 text-primaryColor font-medium"
                                : "text-headingColor hover:bg-gray-50"
                            }`}
                        aria-current={tab === item.id ? "page" : undefined}
                    >
                        {item.label}
                    </button>
                ))}

                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors font-medium"
                    >
                        Logout
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

Tab.propTypes = {
    tab: PropTypes.string.isRequired,
    setTab: PropTypes.func.isRequired,
};

export default Tab;