import React, { Component, PropTypes } from 'react';
import {Tasks} from '../api/tasks.js';

//Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked(){
        //Set the checked property to the opposite of its current value
        Tasks.update(this.props.task._id,{
            $set: { checked: !this.props.task.checked },
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }

    render() {
        //Give tasks a different className when they are checked off,
        //so that we can style them nicely in css

        const taskClassName = this.props.task.checked ? 'checked' : '';

        return (
            //<li>{this.props.task.text}</li>
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>

                <input type="checkbox" readOnly checked={this.props.task.checked} onClick={this.toggleChecked.bind(this)} />

                <span className="text">{this.props.task.text}</span>
            </li>
        );
    }
}

Task.propTypes = {
    // This components gets the task to display throught a React Prop.
    // we can use propTypes to indicate it is required
    task: PropTypes.object.isRequired
};