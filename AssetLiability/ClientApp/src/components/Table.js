import React, { Component } from 'react';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };

        fetch('api/balancesheet')
            .then(response => response.json())
            .then(data => {
                this.setState({ balanceSheetList: data, loading: false });
            });
    }

    static renderBalanceSheetTable(balanceSheetList) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {balanceSheetList.map(balanceSheet =>
                        <tr key={balanceSheet.balanceSheetID}>
                            <td>{balanceSheet.type}</td>
                            <td>{balanceSheet.name}</td>
                            <td>{balanceSheet.balance}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Table.renderBalanceSheetTable(this.state.balanceSheetList);

        return (
            <div>
                <h1>Balance Sheet</h1>
                <p>This component fetches data from server and displays Assets and Liabilities.</p>
                {contents}
            </div>
        );
    }
}