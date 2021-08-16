import * as React from 'react';
import './List.css';

export default function List(props) {
  console.log(props.lists);

  const data = props.lists.map((list) => {
    return (
      <li className="list_item">
        <div>{list.title}</div>
        <button className="button">Click</button>
      </li>
    );
  });

  return (
    <div className="todolists" style={{ height: 400, width: '100%' }}>
      {/* <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection disableSelectionOnClick /> */}

      <h2 className="header">To Do Lists</h2>
      <ul className="list">{data}</ul>
    </div>
  );
}
