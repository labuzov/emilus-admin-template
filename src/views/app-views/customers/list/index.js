import React, { Component } from 'react'
import { Card, Table, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

import CustomersService from 'services/CustomersService';

import AvatarStatus from 'components/shared-components/AvatarStatus';
import UserView from './UserView';
import { APP_PREFIX_PATH } from 'configs/AppConfig';


export class CustomerList extends Component {

	state = {
		users: [],
		userProfileVisible: false,
		selectedUser: null,
		isLoading: false
	}

	componentDidMount() {
		this.loadUsers();
	}

	loadUsers = async () => {
		try {
			this.setState({ isLoading: true });

			const data = await CustomersService.getAll();
			this.setState({ users: data });
		} finally {
			this.setState({ isLoading: false });
		}
	}

	handleUserDelete = (user, event) => {
		event.stopPropagation();

		this.setState({
			users: this.state.users.filter(item => item.id !== user.id),
		})
		message.success({ content: `User ${user.name} has been deleted`, duration: 2 });
	}

	handleUserProfileOpen = (userInfo, event) => {
		event.stopPropagation();
		this.setState({
			userProfileVisible: true,
			selectedUser: userInfo
		});
	};
	
	handleUserProfileClose = () => {
		this.setState({
			userProfileVisible: false,
			selectedUser: null
    	});
	}

	handleRow = (record) => {
		return {
			style: {cursor: "pointer"},
			onClick: () => {
				if (!record?.id) return;

				this.props.history.push(`${APP_PREFIX_PATH}/customers/setting/${record.id}`)
			}
		}
	}

	get tableColumns() {
		return [
			{
				title: 'Customer',
				dataIndex: 'name',
				render: (_, record) => (
					<div className="d-flex">
						<AvatarStatus name={record.name} subTitle={record.email}/>
					</div>
				),
				sorter: {
					compare: (a, b) => {
						a = a.name.toLowerCase();
						  b = b.name.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: 'Phone',
				dataIndex: 'phone',
				sorter: {
					compare: (a, b) => {
						a = a.phone.toLowerCase();
						  b = b.phone.toLowerCase();
						return a > b ? -1 : b > a ? 1 : 0;
					},
				},
			},
			{
				title: '',
				dataIndex: 'actions',
				render: (_, elm) => (
					<div className="text-right">
						<Tooltip title="View">
							<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={e => this.handleUserProfileOpen(elm, e)} size="small"/>
						</Tooltip>
						<Tooltip title="Delete">
							<Button danger icon={<DeleteOutlined />} onClick={e=> this.handleUserDelete(elm, e)} size="small"/>
						</Tooltip>
					</div>
				)
			}
		];
	} 

	render() {
		const { users, userProfileVisible, selectedUser, isLoading } = this.state;

		return (
			<Card bodyStyle={{'padding': '0px'}}>
				<Table
					rowKey='id'
					dataSource={users}
					columns={this.tableColumns}
					loading={isLoading}
					onRow={this.handleRow}
				/>

				{/* it's not the best practice. it's better to move the logic in a separate drawer service/store */}
				<UserView data={selectedUser} visible={userProfileVisible} close={this.handleUserProfileClose}/>
			</Card>
		)
	}
}

export default CustomerList
