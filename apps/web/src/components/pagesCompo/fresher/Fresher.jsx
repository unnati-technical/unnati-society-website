import React from "react";

const Fresher = () => {
  const videoUrl = "https://ik.imagekit.io/your_imagekit_id/your-video.mp4";

  const photos = [
    {
      id: 1,
      src: "https://ik.imagekit.io/your_imagekit_id/photo1.jpg",
      alt: "Gallery Photo 1",
    },
    {
      id: 2,
      src: "https://ik.imagekit.io/your_imagekit_id/photo2.jpg",
      alt: "Gallery Photo 2",
    },
    {
      id: 3,
      src: "https://ik.imagekit.io/your_imagekit_id/photo3.jpg",
      alt: "Gallery Photo 3",
    },
    {
      id: 4,
      src: "https://ik.imagekit.io/your_imagekit_id/photo4.jpg",
      alt: "Gallery Photo 4",
    },
  ];

  return (
    <main className="w-full">
      <section className="text-center px-5 pt-12 md:pt-16 pb-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Heading</h1>
        <p className="mt-3 text-lg md:text-xl lg:text-2xl">
          Subheading of the topic
        </p>
      </section>
      <section className="w-[90%] md:w-[75%] lg:w-[65%] mx-auto mb-16 md:mb-20">
        <div className="w-full aspect-video rounded-sm overflow-hidden border border-gray-300 bg-gray-100">
          {videoUrl ? (
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-3xl md:text-5xl font-semibold">
                Video Screen
              </span>
            </div>
          )}
        </div>
      </section>
      <section className="w-[92%] md:w-[88%] mx-auto mb-14 md:mb-18">
        <div className="min-h-[140px] md:min-h-[165px] border border-gray-300 rounded-sm flex items-center justify-center px-6 md:px-12 py-8">
          <p className="text-center text-lg md:text-xl lg:text-2xl leading-relaxed">
            Text and Description
          </p>
        </div>
      </section>
      <section className="w-[92%] md:w-[88%] mx-auto pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="
                aspect-[0.72]
                overflow-hidden
                rounded-sm
                border border-gray-300
                bg-gray-100
                group
              "
            >
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-105
                  "
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-lg md:text-xl font-semibold text-center">
                    Photo
                    <br />
                    Card
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Fresher;
