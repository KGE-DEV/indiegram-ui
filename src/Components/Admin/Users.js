import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faEdit, faChartLine } from '@fortawesome/free-solid-svg-icons'

import Loading from '../Loading/Loading.js';

import {getUsers, sendEditUser} from '../../Utilities/UserUtilites.js';

class Users extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            users: [],
            loading: true,
            editingUser: null,
            userInfoForEditing: {}
        }
    }

    componentDidMount() {
        Promise.resolve(getUsers())
            .then(response => {
                if(response.data.success) {
                    this.setState({
                        users: response.data.users,
                        loading: false
                    })
                }
            })
    }

    buildUsersTable = (users) => {
        return users.map(user => {
            let wpPassword = "";
            if(user.wp_pass) {
                wpPassword = "wp_pass";
            }
            return (
                <div key={user.id} className={wpPassword + " admin-users__user-row"}>
                    <p className="admin-users__user-name">{user.name} - {user.role}</p>
                    <div className="admin-users__user-info">
                        <span className="admin-users__user-email">{user.email}</span>
                        <Link to={`/admin/user-events?event_by_type=user&user=${user.id}`}><FontAwesomeIcon className="admin-users__user-edit" icon={faChartLine} /></Link>
                        <FontAwesomeIcon className="admin-users__user-edit" icon={faEdit} onClick={() => {this.editUser(user)}}/>
                    </div>
                </div>
            )
        })
    }

    editUser = (user) => {
        this.setState({
            editingUser: user.id,
            userInfoForEditing: user
        })
    }

    buildUserEditView =() => {
        let {users, editingUser, userInfoForEditing} = this.state;
        return users.map(user => {
            if(user.id === editingUser) {
                return (
                    <div key={user.id} className="admin-users__edit-user">
                        <label>Name</label>
                        <input type="text" className="admin-users__edit-input" value={userInfoForEditing.name} onChange={this.handleEditInput} data-name="name"/>
                        <label>Email</label>
                        <input type="text" className="admin-users__edit-input" value={userInfoForEditing.email} onChange={this.handleEditInput} data-name="email"/>
                        <input type="checkbox" className="admin-users__edit-checkbox" value={userInfoForEditing.role} onChange={this.updateUserRole} checked={userInfoForEditing.role === "admin"} data-name="role" />
                        <label>Admin?</label>
                        <button className="admin-users__edit-update" onClick={this.updateUser}>Update</button>
                    </div>
                )
            }
            return false;
        })
    }

    handleEditInput = (evt) => {
        let userInfoForEditing = Object.assign({}, this.state.userInfoForEditing);
        userInfoForEditing[evt.target.dataset.name] = evt.target.value;
        this.setState({
            userInfoForEditing
        })
    }

    updateUserRole = (evt) => {
        let userInfoForEditing = Object.assign({}, this.state.userInfoForEditing);
        userInfoForEditing[evt.target.dataset.name] = evt.target.checked ? "admin" : "subscriber";
        this.setState({
            userInfoForEditing
        })
    }

    updateUser = () => {
        this.setState({
            loading: true
        })
        let {userInfoForEditing} = this.state;
        Promise.resolve(sendEditUser(userInfoForEditing))
            .then(response => {
                if(response.data.success) {
                    this.setState({
                        users: response.data.users,
                        loading: false,
                        editingUser: null,
                        userInfoForEditing: {}
                    })
                }
            })
    }

    render() {
        let {loading, users, editingUser} = this.state;
        if(loading) {
            return (
                <Loading />
            )
        }
        return (
            <div className="container admin-users">
                <Link to="/admin" ><p className="feed__go-back"><FontAwesomeIcon icon={faChevronLeft} /> Back</p></Link>
                <p className="login__header">Users</p>
                {editingUser ? this.buildUserEditView() : this.buildUsersTable(users)}
            </div>
        )
    }
}

export default Users;