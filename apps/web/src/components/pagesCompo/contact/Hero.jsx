import React from "react";
import { cloudinaryImage2 } from "../../../utils/cloudinary";

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="relative bg-gray-400 h-56 flex items-center px-50">
        <h1 className="text-4xl font-bold text-white z-10">Contact Us</h1>

        <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden">
          <img
            src={cloudinaryImage2("contact_vzejk5")}
            alt="support"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 px-10 py-10">
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">All General Queries</h2>
          <p className="text-l mb-2">unnati.ir@iiitbh.ac.in</p>
          <p className="text-l mb-4">Dheeraj Yadav : 7348145325</p>
          <br />
          <h3 className="text-2xl font-bold mb-4">Donation Related Queries</h3>
          <p className="text-l">unnati.ir@iiitbh.ac.in</p>
          <p className="text-l">Dheeraj Yadav : 7348145325</p>
          <br />
          <h3 className="text-2xl font-bold mb-4">For Media Related Queries</h3>
          <p className="text-l">unnati.ir@iiitbh.ac.in</p>
        </div>
        <div className="bg-gray-200 shadow-md rounded-lg p-6 w-full md:w-1/2">
          <h2 className="text-xl font-bold text-center mb-6">Helpdesk</h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-2 border rounded"
            />

            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded"
            />

            <input
              type="text"
              placeholder="Mobile"
              className="p-2 border rounded"
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              className="p-2 border rounded"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="px-10 py-10">
        <div className="relative px-10 py-10 flex flex-col lg:flex-row gap-10 bg-gray-300 rounded-lg w-full">
          <div className="bg-gray-300 shadow-md rounded-lg w-full px-5 py-10">
            <h1 className="text-2xl font-extrabold mb-6 px-20 py-2">
              VISIT US HERE
            </h1>
            <h1 className="text-xl font-bold mb-6 px-20">HEAD OFFICE</h1>
            <h2 className="text-xl mb-3 px-20">
              Indian Institute of Information Technology, Bhagalpur, Sabour,
              Bihar
            </h2>
            <h2 className="text-xl mb-3 px-20">Pin Code: 812210</h2>
            <h2 className="text-xl mb-3 px-20">Phone : 9999999999</h2>
            <h2 className="text-xl mb-3 px-20">
              Monday to Friday 8:00 AM to 6:00 PM
            </h2>
            <h2 className="text-xl font-bold text-red-600 mb-3 px-20">
              Locate us on map
            </h2>
          </div>
          <div className="bg-gray-300 shadow-md rounded-lg w-full px-4 py-6 md:px-10 md:py-10">
            <div className="w-full h-75 sm:h-100 md:h-112.5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10374.130889500819!2d87.04202000000002!3d25.25735000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1776687662276!5m2!1sen!2sin"
                className="w-full h-full rounded-lg"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
