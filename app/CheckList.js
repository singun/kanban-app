import React, { Component } from 'react';

class CheckList extends Component {
    render() {
        var tasks = this.props.tasks.map((task) => {
            console.log('task=',task);

            <li className="checklist__task">
                adf
            </li>
        });

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
            </div>
        );
    }
}

export default CheckList;
