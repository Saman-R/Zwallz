import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch pictures from the backend API
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5555/pictures');
                setImages(response.data); // Assuming the response contains an array of image URLs
                setLoading(false);
            } catch (err) {
                console.error('Error fetching images:', err);
                setError('Failed to load images');
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

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

    if (loading) {
        return <p>Loading images...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid gap-4">
                        {row.map((image, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                <img
                                    className="w-full h-80 object-cover cursor-pointer transition-transform duration-300 transform hover:scale-105"
                                    src={image.url} // Assuming the backend sends an array of objects with a 'url' field
                                    alt={`Gallery image ${index + 1}`}
                                    onClick={() => handleImageClick(image.url)}
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
