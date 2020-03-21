// ES6
import { Resizable, ResizableBox } from 'react-resizable';
import React from 'react'
// import Board from 'react-trello'

export function ResizableCompo() {


    return (
        <ResizableBox width={200} height={200} axis="x"
            minConstraints={[100, 100]} maxConstraints={[300, 300]}>
            <span>Contents</span>
        </ResizableBox>
    );

}