import React, { Component } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import InnerAppLayout from 'layouts/inner-app-layout';
import EditProfile from './EditProfile';
import CustomersService from 'services/CustomersService';
import Loading from 'components/shared-components/Loading';

const SettingOption = ({ match, location }) => {
	return (
		<Menu
			defaultSelectedKeys={`${match.url}/edit-profile`}
			mode="inline"
			selectedKeys={[location.pathname]}
		>
			<Menu.Item key={`${match.url}/edit-profile`}>
				<UserOutlined />
				<span>Edit Profile</span>
				<Link to={'edit-profile'} />
			</Menu.Item>
		</Menu>
	);
};

const SettingContent = ({ match, user, isLoading, history }) => {
	if (isLoading) {
		return <Loading cover="content" />
	}
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/edit-profile`} />
			<Route path={`${match.url}/edit-profile`} render={() => <EditProfile user={user} history={history} />} />
		</Switch>
	)
}

export class Setting extends Component {
	state = {
		user: null,
		isLoading: true
	}
	componentDidMount() {
		this.loadUser();
	}

	loadUser = async () => {
		try {
			this.setState({ isLoading: true });

			const id = this.props.match?.params?.id;

			const data = await CustomersService.getById(id);
			this.setState({ user: data[0] ?? {} });
		} finally {
			this.setState({ isLoading: false });
		}
	}

	render() {
		return (
			<InnerAppLayout 
				sideContentWidth={320}
				sideContent={<SettingOption {...this.props}/>}
				mainContent={<SettingContent user={this.state.user} isLoading={this.state.isLoading} {...this.props}/>}
			/>
    );
	}
}

export default Setting;
