import React, { Component } from 'react';
import { Form, Avatar, Button, Input, Row, Col, message, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import CustomersService from 'services/CustomersService';
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { ROW_GUTTER } from 'constants/ThemeConstant';

import Flex from 'components/shared-components/Flex';


export class EditProfile extends Component {

	state= {
		name: this.props.user?.name ?? '',
		email: this.props.user?.email ?? '',
		username: this.props.user?.username ?? '',
		phone: this.props.user?.phone ?? '',
		website: this.props.user?.website ?? '',
		avatarUrl: this.props.user?.avatarUrl ?? '',
		isLoading: false
	}

	getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	handleFinish = async (values) => {
		try {
			this.setState({ isLoading: true });
			
			const key = 'updatable';
			message.loading({ content: 'Updating...', key });

			await CustomersService.update(this.props.user.id, values);

			this.setState({ ...values });

			message.success({ content: 'Done!', key, duration: 2 });

			setTimeout(this.navigateToCustomersPage, 0);
		} finally {
			this.setState({ isLoading: false });
		}
	};

	handleFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	handleAvatarRemove = () => {
		this.setState({
			avatarUrl: ''
		})
	}

	navigateToCustomersPage = () => {
		this.props.history.push(`${APP_PREFIX_PATH}/customers/list`);
	}

	render() {
		const { name, email, phone, username, website, avatarUrl, isLoading } = this.state;

		return (
			<>
				<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
					<Avatar size={90} src={avatarUrl} icon={<UserOutlined />}/>
					<div className="ml-md-3 mt-md-0 mt-3">
						<Upload showUploadList={false} disabled>
							<Button type="primary" disabled>Change Avatar</Button>
						</Upload>
						<Button className="ml-2" onClick={this.handleAvatarRemove}>Remove</Button>
					</div>
				</Flex>
				<div className="mt-4">
					<Form
						name="basicInformation"
						layout="vertical"
						initialValues={{
							name,
							email,
							phone,
							username,
							website
						}}
						onFinish={this.handleFinish}
						onFinishFailed={this.handleFinishFailed}
					>
						<Row>
							<Col xs={24} sm={24} md={24} lg={16}>
								<Row gutter={ROW_GUTTER}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Name"
											name="name"
											rules={[
												{
													required: true,
													message: 'Please input your name!',
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Username"
											name="username"
											rules={[
												{
													required: true,
													message: 'Please input your username!'
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Email"
											name="email"
											rules={[{ 
												required: true,
												type: 'email',
												message: 'Please enter a valid email!' 
											}]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Phone Number"
											name="phone"
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Website"
											name="website"
										>
											<Input />
										</Form.Item>
									</Col>
								</Row>
								<Button type="primary" htmlType="submit" disabled={isLoading}>
									Save Change
								</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

export default EditProfile
