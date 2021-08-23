import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Link} from 'react-router-dom'

const COATable = ({tableData, productID}) => {
  // const [data, setData] = useState(tableData);
  const [data, setData] = useState([])

  useEffect(() => {
    setData(tableData)
  }, [tableData])



  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };


  const getItemStyle = (isDragging, draggableStyle) => ({
    opacity: isDragging ? 0.5 : 1,

    ...draggableStyle,
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

  
    const items = reorder(data, result.source.index, result.destination.index);

    setData(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <table
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              width: "100%",
              fontSize: "20px",
              color: "#707070",
              borderCollapse: "seperate",
              borderSpacing: "20px",
            }}
          >
            <tr>
              <th></th>
              <th>Batch Number</th>
              <th>Is External</th>
              <th>Date Upload</th>
              <th>View COA</th>
              <th>Actions</th>
            </tr>
            {data.map((item, index) => {
             return (<Draggable
                key={item.batchNumber}
                draggableId={item.batchNumber}
                index={index}
              >
                {(provided, snapshot) => (
                  <tr
                    key={index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <td>
                      <span>
                        <i role="Handle" className="fas fa-grip-lines"></i>
                      </span>
                    </td>
                    <td>
                      <div>
                        <span>{item.batchNumber}</span>
                      </div>
                    </td>
                    <td>{item.isExternal ? 'Yes' : 'No'}</td>
                    <td>{item.uploadedOn}</td>
                    <td>{item.fileUrl}</td>
                    <td><Link to={{
                      pathname:`/COA/Edit/${productID}/${item.coaDocumentID}`,
                      productID: productID 
                    }}>Edit</Link> | Delete</td>
                  </tr>
                )}
              </Draggable>
            )
                    })}
            {provided.placeholder}
          </table>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default COATable;
