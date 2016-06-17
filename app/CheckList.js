import React, { Component } from 'react';
import { render } from 'react-dom';
import Task from './Task'

class CheckList extends Component {
    render() {
        var tasks = this.props.tasks.map((task) => {
            return <Task key={task.id}
                    id={task.id}
                    name={task.name}
                    done={task.done} />
        });

        console.log('tasks=', tasks);

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                        className="checklist--add-task"
                        placeholder="Type then hit Enter to add a task" />
            </div>
        );
    }
}

export default CheckList;
