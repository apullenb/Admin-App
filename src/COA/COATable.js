import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const dataSet = [
  {
    batchNumber: "208z-2503",
    isExternal: "Yes",
    dateUploaded: "7/4/2021",
    url: "2021-233z.pdf",
  },
  {
    batchNumber: "0125",
    isExternal: "No",
    dateUploaded: "05/01/2021",
    url: "2021-233a.pdf",
  },
  {
    batchNumber: "1235",
    isExternal: "No",
    dateUploaded: "06/15/2021",
    url: "2021-233t.pdf",
  },
  {
    batchNumber: "06Z1",
    isExternal: "Yes",
    dateUploaded: "06/17/2021",
    url: "2021-233e.pdf",
  },
];

const COATable = () => {
  const [data, setData] = useState(dataSet);

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
            {data.map((item, index) => (
              <Draggable
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
                    <td>{item.isExternal}</td>
                    <td>{item.dateUploaded}</td>
                    <td>{item.url}</td>
                    <td>Edit | Delete</td>
                  </tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </table>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default COATable;
