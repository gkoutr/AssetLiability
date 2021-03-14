import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balanceSheet: { records: [] }, loading: true
        };

        this.updateBalanceSheet();
    }

    updateBalanceSheet() {
        fetch('api/balancesheet')
            .then(response => response.json())
            .then(data => {
                if (data.records == null) {
                    data = {
                        records: []
                    }
                }
                this.setState({ balanceSheet: data, loading: false });
            });
    }

    /**
     * 
     * Delete balancesheet record and reset the state
     * 
     * @param {any} record
     * @param {any} test
     */
    deleteRecord(record) {
        if (window.confirm("Are you sure you want to delete this record from your balance sheet?")) {
            fetch('api/records/' + record.recordId, {
                method: 'DELETE'
            }).then(() => {
                this.updateBalanceSheet()
            });
        }
    }

    /**
     * 
     * Renders table after pulling balancesheet data from api
     * 
     * @param {any} balanceSheet
     */
    renderBalanceSheetTable(balanceSheet) {
        let assets = {
            color: '#85bb65'
        }
        let liabilities = {
            color: '#E84855'
        }
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
                    {balanceSheet.records.map(record =>
                        <tr key={record.balanceSheetID}>
                            <td>{record.type}</td>
                            <td>{record.name}</td>
                            <td>{record.balance}</td>
                            <td><FontAwesomeIcon icon={faTrash} onClick={() => this.deleteRecord(record)} /></td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr style={assets}>
                        <th scope="row">Total Assets</th>
                        <td></td>
                        <td>{balanceSheet.assetsTotal}</td>
                    </tr>
                    <tr style={liabilities}>
                        <th scope="row">Total Liabilities</th>
                        <td></td>
                        <td>{balanceSheet.liabilitiesTotal}</td>
                    </tr>
                    <tr style={balanceSheet.assetsTotal >= balanceSheet.liabilitiesTotal ? assets : liabilities}>
                        <th scope="row">Net Worth</th>
                        <td></td>
                        <td>{balanceSheet.netWorth}</td>
                    </tr>
                </tfoot>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderBalanceSheetTable(this.state.balanceSheet);

        return (
            <div>
                <h1>Balance Sheet</h1>
                <p>This component fetches data from server and displays Assets and Liabilities.</p>
                {contents}
            </div>
        );
    }
}