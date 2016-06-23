import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Task from './Task'

class CheckList extends Component {

    checkInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.taskCallbacks.add(this.props.cardId, e.target.value);
            e.target.value = '';
        }
    }

    render() {
        var tasks = this.props.tasks.map((task, taskIndex) => {
            return <Task key={task.id}
                    id={task.id}
                    name={task.name}
                    done={task.done}
                    cardId={this.props.cardId}
                    taskIndex={taskIndex}
                    taskCallbacks={this.props.taskCallbacks} />
        });

        console.log('tasks=', tasks);

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                        className="checklist--add-task"
                        placeholder="Type then hit Enter to add a task"
                        onKeyPress={this.checkInputKeyPress.bind(this)} />
            </div>
        );
    }
}

CheckList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardId: PropTypes.number
}

export default CheckList;
