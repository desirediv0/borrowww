'use client';

import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';

import Image from 'next/image';

export default function VideoSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const videos = [
    {
      id: 1,
      title: "Sanjay Kumar Mahto's home buying journey",
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 2,
      title: "Behind Every Home, There's a Story We're Proud Of and theirs is one to remember.",
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 3,
      title: "Behind Every Home, There's a Story We're Proud Of. Her story will move you.",
      youtubeId: 'dQw4w9WgXcQ',
    },
    {
      id: 4,
      title: "Teaser drop- Behind Every Home, There's a Story We're Proud Of!",
      youtubeId: 'dQw4w9WgXcQ',
    },
  ];

  const getThumbnailUrl = (youtubeId) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  const getEmbedUrl = (youtubeId, autoplay = false) => {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? 1 : 0}&mute=0&controls=1&rel=0`;
  };

  const handleVideoClick = (youtubeId) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-3 sm:mb-4 tracking-tight capitalize">
            Success Stories That Inspire
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold  mb-2">
            Over ₹3,000 Crores+ in Loans Disbursed
          </p>
          <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto">
            Watch how Borrowww helped thousands of families turn their home ownership dreams
            into reality
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 ">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:z-10"
              onMouseEnter={() => setHoveredCard(video.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleVideoClick(video.youtubeId)}
            >
              {/* Video Thumbnail or Embedded Video */}
              {hoveredCard === video.id ? (
                <iframe
                  src={getEmbedUrl(video.youtubeId, true)}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
              ) : (
                <>
                  <Image
                    src={getThumbnailUrl(video.youtubeId)}
                    alt={video.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                </>
              )}

              {/* Logo and Brand */}
              <div className="absolute bottom-3 left-3  z-10 flex items-center gap-2">
                <span className="text-white text-xs sm:text-sm font-medium drop-shadow-lg bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                  Borrowww
                </span>
              </div>

              {/* Video Title Overlay */}
              <div className="absolute top-2 left-0 right-0 px-4 sm:px-5 z-10">
                <h3 className="text-white text-sm   text-center leading-tight line-clamp-3 drop-shadow-lg bg-black/40 px-3 py-2 rounded-xl backdrop-blur-sm">
                  {video.title}
                </h3>
              </div>

              {/* Play Button (when not hovered) */}
              {hoveredCard !== video.id && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-16 h-16  bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110">
                    <FaPlay className="w-6 h-6  text-white ml-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
