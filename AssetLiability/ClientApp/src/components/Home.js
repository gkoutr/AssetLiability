import React, { Component } from 'react';
import Form from './Form';
import Table from './Table';

export class Home extends Component {
  displayName = Home.name

    render() {
    return (
        <div>
            <Form />
            <Table />
        </div>
    );
  }
}
