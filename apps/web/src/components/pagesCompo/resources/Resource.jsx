import React from 'react'
import { cloudinaryImage } from './../../../utils/cloudinary.js'

const Resource = () => {

    const resources = [
        {
            title: "Unnati Magazine",
            desc: "Explore our official Unnati magazine filled with insights, stories, and achievements.",
            link: "https://heyzine.com/flip-book/2f239fd2b7.html?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnJe35WrkyDf7qDLkcFr_t0fB98gZkeMip1WbOKXBLZ_bWf_jcuDwr2-bukLM_aem_PMREjp6a8NEgJru_ygoldA#page/1"
        },
        {
            title: "Unnati Newsletter",
            desc: "Stay updated with our latest activities and announcements through the newsletter.",
            link: "https://heyzine.com/flip-book/36de4bab25.html"
        }
    ]

    return (
        <div className="relative min-h-screen flex justify-center items-center px-6 overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0">
                <img 
                    src={cloudinaryImage("Screenshot_2026-04-18_024047_kwjl9z")} 
                    alt="" 
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 grid md:grid-cols-2 gap-8 w-full max-w-5xl">

                {resources.map((item, index) => (
                    <div 
                        key={index} 
                        className="bg-blue-500 backdrop-blur-md p-6 shadow-lg hover:scale-105 transition duration-300"
                    >
                        <h2 className="oswald-font text-xl sm:text-2xl md:text-4xl">
                            {item.title}
                        </h2>

                        <p className="text-black font-semibold mb-6">
                            {item.desc}
                        </p>

                        <button
                            onClick={() => window.open(item.link, "_blank")}
                            className="bg-yellow-400 text-black px-5 py-1 font-medium hover:bg-gray-200 transition oswald-font-3 cursor-pointer"
                        >
                            OPEN
                        </button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Resource
