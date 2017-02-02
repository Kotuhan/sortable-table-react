import React, { Component } from 'react';
import Table from 'rc-table';
import Sortable from 'sortablejs';

const columns = [
    {
        title: 'Priority', dataIndex: 'priority', key: 'priority', width: 100
    },
    {
        title: 'Name', dataIndex: 'name', key: 'name', width: 100
    },
    {
        title: 'Age', dataIndex: 'age', key: 'age', width: 100
    }, {
        title: 'Address', dataIndex: 'address', key: 'address', width: 200
    }];

const data = [
        { name: 'Jack', age: 10, address: 'some where', key: '1', priority: '1' },
        { name: 'Rose', age: 20, address: 'some where', key: '2', priority: '2' },
        { name: 'Jack', age: 30, address: 'some where', key: '3', priority: '3' },
        { name: 'Rose', age: 40, address: 'some where', key: '4', priority: '4' }
];


export default class extends Component {
    constructor (props) {
        super(props);

        this.state = {
            data
        };
    }

    componentDidMount() {
        const tableRows = document.querySelector('.rc-table-tbody');

        tableRows.lastChild.className += ' disabled';

        Sortable.create(tableRows, {
            animation: 150,
            filter: '.disabled',
            onMove: (event) => {
                return !event.related.classList.contains('disabled');
            }
        });
    }

    render() {
        const { data } = this.state;
        return (
            <div className="container">
                <Table columns={columns} data={data} />
            </div>
        );
    }
}
