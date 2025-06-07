import DoctorCard from "../../components/Doctor/DoctorCard";
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import useFetchData from '../../Hooks/useFetchData';
import { BASE_URL } from '../../config';

const MyBookings = () => {
    const {
        data: appointments = [], // Provide default empty array
        loading,
        error,
    } = useFetchData(`${BASE_URL}/users/appointment/my-appointments`);

    return (
        <div className="container mx-auto px-4 py-8">
            {loading && !error && <Loading />}

            {error && !loading && <Error errMessage={error} />}

            {!loading && !error && (
                <>
                    {appointments && appointments.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {appointments.map((appointment) => (
                                <DoctorCard
                                    doctor={appointment.doctor}
                                    key={appointment._id}
                                    appointmentData={appointment}
                                />
                            ))}
                        </div>
                    ) : (
                        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
                            You did not book any doctor yet!
                        </h2>
                    )}
                </>
            )}
        </div>
    );
};

export default MyBookings;