import React, { Component } from 'react';
import { render } from 'react-dom';
import TaskActionCreators from '../actions/TaskActionCreators';

class Task extends Component {
    render() {
        console.log('this.props=', this.props);

        return (
            <li key={this.props.id} className="checklist__task">
                <input type="checkbox" defaultChecked={this.props.done}
                  onChange={
                    TaskActionCreators.toggleTask.bind(null, this.props.cardId, this.props.task, this.props.taskIndex)
                  }/>
                {this.props.name}{' '}
                <a href="#" className="checklist__task--remove"
                  onClick={
                    TaskActionCreators.deleteTask.bind(null, this.props.cardId, this.props.task, this.props.taskIndex)
                  } />
            </li>
        );
    }
}

export default Task;
