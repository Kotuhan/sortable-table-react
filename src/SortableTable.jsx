import React, { Component } from 'react';
import Table from 'rc-table';
//import styles from './index.styl';

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

        this.handleDrop = this.handleDrop.bind(this);
    }

    componentDidMount() {
        this.setEvents();
    }

    setEvents() {
        const rows = document.querySelectorAll('.rc-table-row');
        const length = rows.length - 1;

        rows.forEach((row, i) => {
            row.draggable = length !== i;

            row.ondragstart = (ev) => {
                ev.dataTransfer.setData('data', i);
            };

            row.ondragover = (ev) => {
                ev.preventDefault();
            };

            row.ondrop = (ev) => {
                const startIndex = ev.dataTransfer.getData('data');

                if (i === length || startIndex === i || startIndex === length) {
                    return;
                }
                ev.preventDefault();
                this.handleDrop(startIndex, i);
            };
        });
    }

    handleDrop(startIndex, stopIndex) {
        const data = this.state.data;
        const temp = data[startIndex];

        data[startIndex] = data[stopIndex];
        data[stopIndex] = temp;

        this.setState({ data });
        this.setEvents();
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
