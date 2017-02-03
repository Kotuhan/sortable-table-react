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
        { name: '1', age: 10, address: 'some where', key: '1', priority: '1' },
        { name: '2', age: 20, address: 'some where', key: '2', priority: '2' },
        { name: '3', age: 30, address: 'some where', key: '3', priority: '3' },
        { name: '4', age: 40, address: 'some where', key: '4', priority: '4' },
        { name: '5', age: 50, address: 'some where', key: '5', priority: '5' },
        { name: '6', age: 600, address: 'some where', key: '6', priority: '6' }
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

        const handleDrop = (startIndex, stopIndex) => {
            const data = this.state.data;

            const arrayMove = (arr, fromIndex, stopIndex) => {
                const element = arr[startIndex];

                arr.splice(startIndex, 1);
                arr.splice(stopIndex, 0, element);
                arr[startIndex].priority = startIndex + 1;
                arr[stopIndex].priority = stopIndex + 1;

                if (startIndex > stopIndex) {
                    [startIndex, stopIndex] = [stopIndex, startIndex];
                }

                for (let i = startIndex; i < stopIndex; i++) {
                    arr[i].priority = i + 1;
                }
            };

            arrayMove(data, startIndex, stopIndex);
            this.setState({ data });
        };

        Sortable.create(tableRows, {
            animation: 150,
            filter: '.disabled',
            onMove: (ev) => {
                return !ev.related.classList.contains('disabled');
            },
            onEnd: (ev) => {
                handleDrop(ev.oldIndex, ev.newIndex);
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
