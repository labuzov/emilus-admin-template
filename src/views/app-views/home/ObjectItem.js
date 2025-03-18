import React from 'react';
import { objectItems } from './objectItems';



const ObjectItem = ({
    objectId, className, style, size, rotate, isDraggable, isSelected, onDragStart, onClick
}) => {

    const handleDragStart = (e) => {
        const { left, top } = e.target.getBoundingClientRect();
		const offsetX = e.clientX - left;
		const offsetY = e.clientY - top;

        e.dataTransfer.setData('offsetX', offsetX);
		e.dataTransfer.setData('offsetY', offsetY);

        onDragStart(e);
    }

    const content = objectItems.find(objectItem => objectItem.id === objectId)?.content;

    if (!content) return null;

    return (
        <div
            draggable
            className={"d-flex align-items-center justify-content-center " + (className ?? '')}
            style={{ 
                width: size + 'px',
                height: size + 'px',
                borderRadius: '8px',
                transform: `${rotate ? `rotate(${rotate}deg)` : ''} ${isDraggable ? ' translateX(9999px)' : ''}`,
                transition: 'transform 0.01s, background .1s',
                background: isSelected ? '#eee' : 'transparent',
                cursor: 'pointer',
                ...(style ?? {})
            }}
            onDragStart={handleDragStart}
            onClick={onClick}
        >
            {content}
        </div>
           
    )
}

export default ObjectItem;
