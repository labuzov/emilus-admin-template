import React, { useMemo, useState } from 'react';
import { DEFAULT_SIZE, objectItems } from './objectItems';
import ObjectItem from './ObjectItem';
import { Card } from 'antd';

const tabList = [
    {
        key: 'all',
        tab: 'All',
    },
    {
        key: 'tables',
        tab: 'Dining tables',
    },
    {
        key: 'chairs',
        tab: 'Chairs',
    },
];

const ObjectItemList = () => {
    const [activeTab, setActiveTab] = useState(tabList[0].key);

    const handleTabChange = (key) => {
		setActiveTab(key);
	}

	const handleNewObjectDragStart = (e, objectId) => {
		e.dataTransfer.setData('objectId', objectId);
		e.dataTransfer.setData('id', Math.random().toString());
	}

    const objects = useMemo(() => {
        return objectItems.filter(obj => {
            switch (activeTab) {
                case 'all': return true;
                case 'tables': return obj.tags?.includes('table');
                case 'chairs': return obj.tags?.includes('chair');
                default: return true;
            }
        })
    }, [activeTab]);

    return (
        <Card
            tabList={tabList}
            onTabChange={handleTabChange}
            activeTabKey={activeTab}
            style={{ width: '100%', overflow: 'auto' }}
        >
            <div className="d-flex">
                {objects.map(obj => (
                    <ObjectItem
                        key={obj.id}
                        objectId={obj.id}
                        size={DEFAULT_SIZE}
                        className="mr-3"
                        onDragStart={e => handleNewObjectDragStart(e, obj.id)}
                    />
                ))}
            </div>
        </Card>
    )
}

export default ObjectItemList;
