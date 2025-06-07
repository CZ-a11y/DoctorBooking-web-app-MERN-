import React, { useEffect, useState } from "react";
import DoctorCard from "./../../components/Doctor/DoctorCard";
import { doctors as localDoctors } from "./../../assets/data/doctors";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "../../config";
import useFetchData from "../../Hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Doctor = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Debounce the query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const { data: doctors, loading, error, refetch } = useFetchData(
    `${BASE_URL}/doctors${debouncedQuery ? `?query=${encodeURIComponent(debouncedQuery)}` : ''}`
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPerformed(true);
    refetch();
  };

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <form onSubmit={handleSearch} className="max-w-[570px] mt-[30px] mx-auto bg-[#0006ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor by name or specification"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primaryColor py-[15px] px-[35px] text-white font-semibold mt-0 rounded-[0px] rounded-r-md"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {searchPerformed && doctors?.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-lg text-gray-600">No doctors found matching your search</p>
                </div>
              ) : (
                (doctors?.length > 0 ? doctors : localDoctors).map((doctor) => (
                  <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
                ))
              )}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-2xl mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Patient Testimonials
        </h2>
        <p className="text-lg text-gray-600">
          Hear from those who've experienced our exceptional care firsthand
        </p>
      </div>
      <Testimonial />
    </>
  );
};

export default Doctor;