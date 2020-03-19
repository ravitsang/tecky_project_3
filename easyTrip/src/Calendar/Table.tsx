import React from 'react'
import { useDrop } from 'react-dnd'
import './styles.scss';

export interface TableProps {
    allowedDropEffect: string
}



const Table: React.FC<TableProps> = ({ allowedDropEffect }) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'card',
        drop: () => ({
            name: `${allowedDropEffect} Table`,
            allowedDropEffect,
        }),
        collect: (monitor: any) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const isActive = canDrop && isOver
    return (
        <div ref={drop} className='table-item'>
            {isActive ? '' : ''}
        </div>
    )
}
export default Table
