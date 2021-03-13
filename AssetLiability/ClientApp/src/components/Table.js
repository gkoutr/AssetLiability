import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = { balanceSheetList: [], loading: true };

        fetch('api/balancesheet')
            .then(response => response.json())
            .then(data => {
                this.setState({ balanceSheetList: data, loading: false });
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
            fetch('api/balancesheet/' + record.balanceSheetID, {
                method: 'DELETE'
            })
            let filteredArray = this.state.balanceSheetList.filter(balanceSheet => balanceSheet.balanceSheetID !== record.balanceSheetID)
            this.setState({ balanceSheetList: filteredArray });
        }
    }

    renderBalanceSheetTable(balanceSheetList) {
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
                            <td><FontAwesomeIcon icon={faTrash} onClick={() => this.deleteRecord(balanceSheet)} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderBalanceSheetTable(this.state.balanceSheetList);

        return (
            <div>
                <h1>Balance Sheet</h1>
                <p>This component fetches data from server and displays Assets and Liabilities.</p>
                {contents}
            </div>
        );
    }
}