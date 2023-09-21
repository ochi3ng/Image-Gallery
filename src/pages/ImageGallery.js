import React, { useState, useEffect } from 'react';
import ImageSearch from './ImageSearch';
import './ImageGallery.css'


const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
            const dummyData = [
                {
                    id: 1,
                    src: 'https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_1280.jpg',
                    tag: 'Bird Fluttering Berries',
                },
                  {
                    id: 2,
                    src: 'https://cdn.pixabay.com/photo/2020/01/16/19/49/elephants-4771585_640.jpg',
                    tag: 'Elephans Bottle Feeding',
                },
              
                {
                    id: 3,
                    src: 'https://cdn.pixabay.com/photo/2023/02/02/17/00/lions-7763341_640.jpg',
                    tag: 'Lions Wild Animals',
                },
                {
                    id: 4,
                    src: 'https://cdn.pixabay.com/photo/2022/07/13/18/35/grassland-7319833_1280.jpg',
                    tag: 'grassland nature hill',
                },
                {
                    id: 5,
                    src: 'https://cdn.pixabay.com/photo/2018/10/31/15/26/young-3786062_640.jpg',
                    tag: 'Young Model Kenya',
                },
                {
                    id: 6,
                    src: 'https://cdn.pixabay.com/photo/2015/07/14/19/46/zebra-845266_640.jpg',
                    tag: 'Zebra Savannah',
                },
                {
                    id: 7,
                    src: 'https://cdn.pixabay.com/photo/2017/09/21/01/39/nairobi-2770340_1280.jpg',
                    tag: 'Nairobi Kenya Streets',
                },

                {
                    id: 8,
                    src: 'https://cdn.pixabay.com/photo/2022/10/22/03/35/elephant-7538331_640.jpg',
                    tag: 'Elephant Animal Safari',
                },
            ];
            setImages(dummyData);
            
        }, 2000);
    }, []);
    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredImages(images);
        } else {
            const filtered = images.filter((image) =>
                image.tag.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredImages(filtered);
        }
    };

    useEffect(() => {
        setFilteredImages(images);
        setLoading(false);
    }, [images]);
    const handleImageReorder = (dragIndex, dropIndex) => {
        const updatedImages = [...filteredImages];
        const [draggedImage] = updatedImages.splice(dragIndex, 1);
        updatedImages.splice(dropIndex, 0, draggedImage);
        setFilteredImages(updatedImages);
        
    };
    return (
        <div className="image-gallery">
            <h2>Image Gallery</h2>
            <ImageSearch onSearch={handleSearch} />
      
            {loading?  (
                <div className="loader">Loading...</div>
            ) : (
                <div className="image-grid">
                    {filteredImages.map((image, index) => (
                        <div
                            key={image.id}
                            className="image-item"
                            draggable="true"
                            onDragStart={(e) => {
                                e.dataTransfer.setData('text/plain', index.toString());
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const dragIndex = Number(e.dataTransfer.getData('text/plain'));
                                handleImageReorder(dragIndex, index);
                            }}
                        >
                            <img src={image.src} alt={image.tag} />
                            <p className="image-tag">{image.tag}</p>
                        </div>
                    ))}
                   
                </div>
            )}
        </div>
    );
};

export default ImageGallery;