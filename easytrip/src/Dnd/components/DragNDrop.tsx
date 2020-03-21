import React, { useState, useRef } from 'react';



interface IParams {

    grpI: number
    itemI: number

}


const data = [
    { title: 'group 1', items: ['1', '2', '3'] },
    { title: 'group 2', items: ['4', '5'] }
]


export function DragNDrop() {

    const [list, setList] = useState(data)

    const [dragging, setdragging] = useState(false)

    const dragItem: React.MutableRefObject<IParams | undefined | null> = useRef() // useRef = > variable ?
    const dragNode: React.MutableRefObject<EventTarget | undefined | null> = useRef();


    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, params: any) => {
        // console.log(e);
        // console.log({ grpI: params.grpI });
        // console.log({ itemI: params.itemI });

        dragItem.current = params; // store the information of dragging item
        dragNode.current = e.target;

        dragNode.current.addEventListener('dragend', handleDragEnd)

        console.log(dragNode.current);

        // keep the origin style while dragging
        setTimeout(() => {
            setdragging(true)
        }, 0)
    }


    // trigger this function when enter the drag area
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, targetItem: IParams) => {
        console.log('Entering a drag target', targetItem)
        const currentItem: any = dragItem.current;
        if (dragNode.current !== e.target) {
            console.log('Target is NOT the same as dragged item')
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[targetItem.grpI].items.splice(targetItem.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
                dragItem.current = targetItem;
                localStorage.setItem('List', JSON.stringify(newList));
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        // cleanup process
        dragNode.current?.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
        setdragging(false)
    }

    const getStyles = (params: IParams) => {

        const currentItem = dragItem.current
        console.log(currentItem);

        if (currentItem?.grpI === params.grpI && currentItem?.itemI === params.itemI) {
            return 'current dnd-item'
        } else {
            return 'dnd-item'
        }




    }



    return (
        <div className="drag-n-drop">
            {list.map((grp, grpI) => (
                <div 
                    key={grp.title}
                    className="dnd-group"
                    onDragEnter={dragging && !grp.items.length? (e) => { handleDragEnter(e, { grpI, itemI:0 }) } : undefined}
                    >
                    <div className="group-title">{grp.title}</div>
                    {grp.items.map((item, itemI) => (
                        <div
                            draggable
                            onDragStart={(e) => { handleDragStart(e, { grpI, itemI }) }}
                            onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpI, itemI }) } : undefined}
                            key={item}
                            className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )




}