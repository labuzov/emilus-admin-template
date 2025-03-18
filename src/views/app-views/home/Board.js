import React, { useRef } from 'react';
import { Button, Card, Upload } from 'antd';

import ObjectItem from './ObjectItem';
import { DEFAULT_SIZE } from './objectItems';


const Board = ({
    objects, selectedId, draggableId, setObjects, onObjectClick, setDraggableId
}) => {
    const boardRef = useRef(null);

    const handleDrop = (e) => {
		const id = e.dataTransfer.getData('id');
		const objectId = e.dataTransfer.getData('objectId');
		const offsetX = e.dataTransfer.getData('offsetX');
		const offsetY = e.dataTransfer.getData('offsetY');

		const x = Math.round(e.clientX - boardRef.current.getBoundingClientRect().left - offsetX);
		const y =  Math.round(e.clientY - boardRef.current.getBoundingClientRect().top - offsetY);
	
		setObjects(prev => {
			const currentObj = prev.find(obj => obj.id === id);

			const newList = prev.filter(p => p.id !== id);
			newList.push({ size: DEFAULT_SIZE, ...currentObj, id, objectId, x, y });

			return newList;
		});
    };
	
    const handleDragOver = (e) => {
		e.preventDefault();
    };
    
    const handleDragEnd = () => {
        setDraggableId(null);
    }

    const handleObjectDragStart = (e, id, objectId) => {
		e.dataTransfer.setData('id', id);
		e.dataTransfer.setData('objectId', objectId);

        setDraggableId(id);
	}

	const handleDeleteAll = () => {
		setObjects([]);
	}

    const handleExport = () => {
        const json = JSON.stringify(objects);

        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;
        a.download = 'Map.json';

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const handleImport = ({ file }) => {
        if (!file || !file.originFileObj) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const importedObjects = JSON.parse(e.target.result);
            setObjects(importedObjects);
        };

        reader.readAsText(file.originFileObj);
    }

    return (
        <Card
            title="Map"
            extra={(
                <div className="d-flex">
                    <Upload
                        accept="application/json"
                        showUploadList={false}
                        onChange={handleImport}
                    >
                        <Button type="primary" className="mr-2">Import</Button>
                    </Upload>
                    <Button
                        className="mr-4"
                        disabled={!objects?.length}
                        onClick={handleExport}
                    >
                        Export
                    </Button>
                    <Button
                        danger
                        disabled={!objects?.length}
                        onClick={handleDeleteAll}
                    >
                        Clear all
                    </Button>
                </div>
            )}
            style={{ width: '100%', maxWidth: '840px' }}
        >
            <div
                ref={boardRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                style={{
                    width: '800px',
                    height: '520px',
                    border: '1px solid #999',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                {objects.map(obj => (
                    <ObjectItem
                        key={obj.id}
                        objectId={obj.objectId}
                        size={obj.size}
                        rotate={obj.rotate}
                        isDraggable={draggableId === obj.id}
                        isSelected={selectedId === obj.id}
                        style={{
                            position: 'absolute',
                            left: obj.x,
                            top: obj.y,
                        }}
                        onDragStart={e => handleObjectDragStart(e, obj.id, obj.objectId)}
                        onClick={() => onObjectClick(obj.id)}
                    />
                ))}
            </div>
        </Card>  
    )
}

export default Board;
