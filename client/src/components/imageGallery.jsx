// src/components/ImageGallery.jsx
import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        "https://i.pinimg.com/736x/8a/4b/9a/8a4b9a90c9f5b3f920c7d6a22d355a05.jpg",
        "https://i.pinimg.com/736x/c0/97/42/c09742d2d1ecfac1376628f4ff18182a.jpg",
        "https://i.pinimg.com/474x/3a/a2/21/3aa2216240f7920fa4eccfd2851c8b71.jpg",
        "https://i.pinimg.com/564x/9a/83/d2/9a83d298d78eb8843e2c72e3e331a7f3.jpg",
        "https://i.pinimg.com/564x/37/f5/d1/37f5d19f215c97c64df8817ba8511920.jpg",
        "https://i.pinimg.com/736x/53/17/21/53172113f35377654692d4c84797bb45.jpg",
        "https://i.pinimg.com/564x/50/05/b8/5005b83ca13eb4b6fb3abcf59be605db.jpg",
        "https://i.pinimg.com/736x/7b/41/da/7b41da0a02d2a7e514a43725b9979f0d.jpg",
        "https://i.pinimg.com/564x/07/ef/3a/07ef3abab89a639d1c0aed657f63e381.jpg",
        "https://i.pinimg.com/564x/dd/cd/9f/ddcd9f077f30dc274c5eb85bb541d79b.jpg",
        "https://i.pinimg.com/564x/7c/d0/8a/7cd08ae7a7fa867ce80ac12651a9a62d.jpg",
        "https://i.pinimg.com/736x/76/09/28/7609287471abb4bd05403fccc897ce11.jpg"
    ];

    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const rows = chunkArray(images, 3);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    const handleClickOutside = (e) => {
        if (e.target.className.includes('overlay')) {
            handleClose();
        }
    };

    useEffect(() => {
        if (selectedImage) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [selectedImage]);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid gap-4">
                        {row.map((image, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                <img
                                    className="w-full h-80 object-cover cursor-pointer transition-transform duration-300 transform hover:scale-105"
                                    src={image}
                                    alt={`Gallery image ${index + 1}`}
                                    onClick={() => handleImageClick(image)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm overlay"
                    onClick={handleClickOutside}
                >
                    <img
                        className="max-w-[90%] max-h-[9%] object-contain rounded-lg p-4"
                        src={selectedImage}
                        alt="Enlarged"
                        style={{ maxHeight: '100vh', maxWidth: '90vw' }}
                    />
                </div>
            )}
        </>
    );
};

export default ImageGallery;
