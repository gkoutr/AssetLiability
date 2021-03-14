import React, { Component } from 'react';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { type: 'Asset', name: '', balance: ''};

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
        fetch('api/records', {
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
        window.location.reload();
    }

    render() {
        var style = {
            padding: '20px'
        };

        return (
            <form style={style} onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="typeFormSelect">Type:</label>
                    <select className="form-control" id="typeFormSelect" name="type" value={this.state.type} onChange={this.handleChange} >
                        <option selected key="1" value="Asset">Asset</option>
                        <option key="2" value="Liability">Liability</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="typeFormInput">Name:</label>
                    <input id="typeFormInput" className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="balanceFormInput">Balance:</label>
                    <input id="balanceFormInput" className="form-control" type="text" name="balance" value={this.state.balance} onChange={this.handleChange} />
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}