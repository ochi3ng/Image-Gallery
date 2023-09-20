import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

const DroppableGallery = ({ images, onDrop }) => {
    const [hovered, setHovered] = useState(false);

    const [, drop] = useDrop({
        accept: 'IMAGE',
        drop: (item) => {
            onDrop(item.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const galleryClassName = `droppable-gallery ${hovered ? 'hovered' : ''}`;

    return (
        <div
            ref={(node) => {
                drop(node);
                if (node) {
                    setHovered(node.className.includes('hovered'));
                }
            }}
            className={galleryClassName}
        >
            {images.map((image) => (
                <div key={image.id} className="gallery-image">
                    <img src={image.src} alt={image.alt} />
                </div>
            ))}
        </div>
    );
};

export default DroppableGallery;
