import React, { Component, PropTypes } from 'react';

//Task component - represents a single todo item
export default class Task extends Component {
    render() {
        return (
            <li>{this.props.task.text}</li>
        );
    }
}

Task.propTypes = {
    // This components gets the task to display throught a React Prop.
    // we can use propTypes to indicate it is required
    task: PropTypes.object.isRequired
};