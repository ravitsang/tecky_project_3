import React, { useEffect, useState } from 'react';
import './DndApp.scss';

import { DragNDrop } from './components/DragNDrop'


export function DndApp() {
  // const [data, setData] = useState();  
  // useEffect(() => {
  //   if (localStorage.getItem('List')) {
  //     console.log(localStorage.getItem('List'))
  //     setData(JSON.parse(localStorage.getItem('List' || "[]") || '[]'))
  //   } else {
  //     setData(defaultData)
  //   }
  // }, [setData])
  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop />
      </header>
    </div>
  );
}
