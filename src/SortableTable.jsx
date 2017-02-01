import React, { Component } from 'react';
import Table from 'rc-table';
import shallowCompare from 'react-addons-shallow-compare';
//import styles from './index.styl';

const columns = [
    {
        title: 'Name', dataIndex: 'name', key: 'name', width: 100
    },
    {
        title: 'Age', dataIndex: 'age', key: 'age', width: 100
    }, {
        title: 'Address', dataIndex: 'address', key: 'address', width: 200
    }];

const data = [
    { name: 'Jack', age: 28, address: 'some where', key: '1' },
    { name: 'Rose', age: 36, address: 'some where', key: '2' }
];


export default class extends Component {
    static propTypes = {
    };
    static defaultProps = {
    };

    state = {
    };


    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <div className="container">
                <Table columns={columns} data={data} />
            </div>
        );
    }
}
