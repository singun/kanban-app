import React, { Component } from 'react';
import { render } from 'react-dom';

class Task extends Component {
    render() {
        console.log('this.props=', this.props);

        return (
            <li key={this.props.id} className="checklist__task" onChange={
                this.props.taskCallbacks.toggle.bind(null, this.props.cardId
                    , this.props.id, this.props.taskIndex)}>
                <input type="checkbox" defaultChecked={this.props.done} />
                {this.props.name}{' '}
                <a href="#" className="checklist__task--remove" onClick={
                    this.props.taskCallbacks.delete.bind(null, this.props.cardId
                    , this.props.id, this.props.taskIndex)} />
            </li>
        );
    }
}

export default Task;
