import React from 'react';
import { Button, Card, Col, InputNumber, Row } from 'antd';
import FormItemLabel from 'antd/lib/form/FormItemLabel';


const Properties = ({
    selectedObject, setObjects
}) => {
    const disabled = !selectedObject;

    const handleObjectChange = (field, value) => {
		setObjects(prev => prev.map(obj => {
			if (obj.id === selectedObject?.id) {
				obj[field] = value;
			}
			return obj;
		}))
	}

    const handleDelete = (id) => {
		setObjects(prev => prev.filter(obj => obj.id !== id));
	}

    return (
        <Card
            title="Object properties"
            className="mt-4"
        >
            <Row gutter={16} className="mb-3">
                <Col span={6}>
                    <FormItemLabel label="X" />
                    <InputNumber
                        value={selectedObject?.x}
                        className="w-100"
                        disabled={disabled}
                        onChange={(v) => handleObjectChange('x', v)}
                    />
                </Col>
                <Col span={6}>
                    <FormItemLabel label="Y" />
                    <InputNumber
                        value={selectedObject?.y}
                        className="w-100"
                        disabled={disabled}
                        onChange={(v) => handleObjectChange('y', v)}
                    />
                </Col>
                <Col span={6}>
                    <FormItemLabel label="Rotate" />
                    <InputNumber
                        value={selectedObject?.rotate}
                        className="w-100"
                        disabled={disabled}
                        onChange={(v) => handleObjectChange('rotate', v)}
                    />
                </Col>
                <Col span={6}>
                    <FormItemLabel label="Size" />
                    <InputNumber
                        value={selectedObject?.size}
                        className="w-100"
                        disabled={disabled}
                        onChange={(v) => handleObjectChange('size', v)}
                    />
                </Col>
            </Row>
            <Row justify="end">
                <Button
                    danger
                    disabled={disabled}
                    onClick={() => handleDelete(selectedObject?.id)}
                >
                    Delete
                </Button>
            </Row>
        </Card>
    )
}

export default Properties;
