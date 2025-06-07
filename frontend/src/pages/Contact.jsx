import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center text-3xl font-bold text-gray-900 mb-4">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-600 text-lg">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white p-6 rounded-lg shadow-md"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              className="form_input mt-1 w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Let us know how we can help you"
              className="form_input mt-1 w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="6"
              className="form_input mt-1 w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Leave a comment..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-full sm:w-auto"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
