import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function RoomImageCarousel({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasError, setHasError] = useState(false);

    const getImageUrl = (filename) => `/static/images/rooms/${filename}`;

    const handleImageError = (e) => {
        console.error('Image load error:', e.target.src);
        setHasError(true);
        e.target.src = '/images/fallback-room.jpg';
    };

    if (images.length === 0 || hasError) {
        return (
            <img
                src="/images/fallback-room.jpg"
                alt="Room"
                className="w-full h-64 object-cover"
            />
        );
    }

    return (
        <div className="relative h-64 group">
            <img
                src={getImageUrl(images[currentIndex])}
                alt={`Room view ${currentIndex + 1}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
            />
            
            {images.length > 1 && (
                <>
                    <button
                        onClick={() => setCurrentIndex(prev => 
                            prev === 0 ? images.length - 1 : prev - 1
                        )}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setCurrentIndex(prev => 
                            prev === images.length - 1 ? 0 : prev + 1
                        )}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}
        </div>
    );
} 