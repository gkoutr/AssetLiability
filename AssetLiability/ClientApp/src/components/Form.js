import React, { Component } from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { type: '', name: '', balance: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    handleSubmit(event) {
        fetch('api/BalanceSheets/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: this.state.type,
                name: this.state.name,
                balance: this.state.balance
            })
        })
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Type:
          <input type="text" name="type" value={this.state.type} onChange={this.handleChange} />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                </label>
                <label>
                    Balance:
                    <input type="text" name="balance" value={this.state.balance} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}