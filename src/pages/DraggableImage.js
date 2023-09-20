import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableImage = ({ id, src, alt, onDrag }) => {
    const [, drag] = useDrag({
        type: 'IMAGE',
        item: { id },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                onDrag(item.id, dropResult.id);
            }
        },
    });

    return (
        <div ref={drag} className="draggable-image">
            <img src={src} alt={alt} />
        </div>
    );
};

export default DraggableImage;
