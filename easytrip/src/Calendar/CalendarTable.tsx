import React, { useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { IRootState } from '../store';
import { useSelector } from 'react-redux';
import { IDaysInfor } from '../trip/state';
// import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table'


export function CalendarTable() {

    // const daysInfor = useSelector((state:IRootState)=>{
    //     return state.trip.daysInfor
    // })
    let daysInfor: IDaysInfor = {
        month: [],
        days: []
    };
    // daysInfor = useSelector((state: IRootState) => {
    //     return state.trip.daysInfor
    // })

    useEffect(() => {
        console.log('calendar useffect');
        console.log(daysInfor);

    }, [])



    console.log(daysInfor);

    let products = [{ id: 1 }];

    Array(23).fill(null).map((num, index) => {
        products.push({ id: index + 2 })
    })

    console.log(daysInfor.month);


    const renderDayButton = (day: number, index: number) => {
        return <TableHeaderColumn dataField=''>WED, MAR 25 </TableHeaderColumn>
    }




    return (
        <BootstrapTable data={products} height='1100' scrollTop={'Top'}>
            <TableHeaderColumn dataField='id' isKey>Unplanned Attraction</TableHeaderColumn>
            {
                Array(4).fill(null).map((day, index) => {
                    return renderDayButton(day, index)
                })
            }
        </BootstrapTable>
    );

}

// 227 50