import React, { useMemo, useState } from 'react'

import Board from './Board';
import ObjectItemList from './ObjectItemList';
import Properties from './Properties';


const Home = () => {
	const [objects, setObjects] = useState([]);
	const [selectedObjectId, setSelectedObjectId] = useState(null);

	const handleObjectClick = (id) => {
		setSelectedObjectId(id);
	}

	const selectedObject = useMemo(() => (
		objects.find(obj => obj.id === selectedObjectId) ?? null
	), [objects, selectedObjectId]);

	return (
		<div className='d-flex justify-content-between'>
			<div className="mr-4" style={{ flexGrow: 1 }}>
				<ObjectItemList />

				<Properties selectedObject={selectedObject} setObjects={setObjects} />
			</div>

			<Board
				objects={objects}
				setObjects={setObjects}
				onObjectClick={handleObjectClick}
			/>
		</div>
	)
}

export default Home
