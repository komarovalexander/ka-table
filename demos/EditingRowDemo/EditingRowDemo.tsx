import './EditingRowDemo.scss';

import React from 'react';

import { DataType, Table } from 'ka-table';
import { closeRowEditors, openRowEditors, saveRowEditors } from 'ka-table/actionCreators';
import { ICellEditorProps, ICellTextProps } from 'ka-table/props';

const dataArray: any[] = [
    { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
    { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 10, 8, 10) },
    { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2021, 11, 8, 10) },
    { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
    { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
    { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 9, 10) },
];

const EditButton: React.FC<ICellTextProps> = ({
    dispatch, rowKeyValue
}) => {
    return (
        <div className='edit-cell-button'>
            <img
                src='static/icons/edit.svg'
                alt='Edit Row'
                title='Edit Row'
                onClick={() => dispatch(openRowEditors(rowKeyValue))}
            />
        </div>
    );
};

const SaveButton: React.FC<ICellEditorProps> = ({
    dispatch, rowKeyValue
}) => {
    return (
        <div className='buttons'
            style={{display: 'flex', justifyContent: 'space-between'}} >
            <img
                src='static/icons/save.svg'
                className='save-cell-button'
                alt='Save'
                title='Save'
                onClick={() => {
                    dispatch(saveRowEditors(rowKeyValue, {
                        validate: true,
                    }));
                }}
            />
            <img
                src='static/icons/close.svg'
                className='close-cell-button'
                alt='Cancel'
                title='Cancel'
                onClick={() => {
                    dispatch(closeRowEditors(rowKeyValue));
                }}
            />
        </div >
    );
};

const EditingDemoRow: React.FC = () => {
    return (
        <div className='editing-row-demo'>
            <Table
                columns= {[
                    { key: 'name', title: 'Name', dataType: DataType.String },
                    { key: 'score', title: 'Score', dataType: DataType.Number },
                    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
                    { key: 'nextTry', title: 'Next Try', dataType: DataType.Date },
                    { key: 'editColumn', width: 80 },
                ]}
                format= {({ column, value }) => {
                    if (column.dataType === DataType.Date){
                        return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
                    }
                }}
                data={dataArray}
                rowKeyField={'id'}
                validation= {({ column, value }) => {
                    if (column.key === 'name'){
                        return value ? '' : 'value must be specified';
                    }
                }}
                childComponents={{
                    cellText: {
                        content: (props) => {
                            if (props.column.key === 'editColumn'){
                                return <EditButton {...props}/>
                            }
                        }
                    },
                    cellEditor: {
                        content: (props) => {
                            if (props.column.key === 'editColumn'){
                                return <SaveButton {...props}/>
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default EditingDemoRow;
