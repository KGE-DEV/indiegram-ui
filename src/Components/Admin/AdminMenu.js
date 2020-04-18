import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AdminMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="container admin-menu">
                <Link to="/admin/add-post" className="admin-menu__link">Add Post</Link>
                <Link to="/admin/invites" className="admin-menu__link">Approve Invites</Link>
            </div>
        )
    }
}

export default AdminMenu;