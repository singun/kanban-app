import React, { Component } from 'react';
import { render } from 'react-dom';

class Task extends Component {
    render() {
        console.log('this.props=', this.props);

        return (
            <li key={this.props.id} className="checklist__task">
                <input type="checkbox" defaultChecked={this.props.done} />
                {this.props.name}
                <a href="#" className="checklist__task--remove" />
            </li>
        );
    }
}

export default Task;
