import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  REMOVE_COA_DOCUMENT,
  UPDATE_DOCUMENT_SORT_ORDER
} from "../utils/mutations";
import {Link} from 'react-router-dom'
import moment from 'moment'

import { useMutation, useQuery } from "@apollo/react-hooks";

const COATable = ({tableData, productID, refetch}) => {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(tableData)
  }, [tableData])

 const [updateSortOrder] = useMutation(UPDATE_DOCUMENT_SORT_ORDER)
const [removeDocument] = useMutation(REMOVE_COA_DOCUMENT)


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
     const updatedItems = Array.from(items).map((document, i) => {
       let {__typename, ...documentItems} = document;
      return {
        ...documentItems,
       sortOrder: i+1
       }
     })

     setData(updatedItems);
     updateSortOrder({variables: {coaProductID: productID, documents: updatedItems} })
    refetch();
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
          const uploadedOnDate = item.uploadedOn && moment(Date.parse(item.uploadedOn), "MMM Do");
          const uploadedOnDateParsed =  uploadedOnDate.format("DD/MM/YYYY");
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
                    <td>{uploadedOnDateParsed}</td>
                    <td>{item.fileUrl}</td>
                    <td><Link to={{
                      pathname:`/COA/Edit/${productID}/${item.coaDocumentID}`,
                      productID: productID 
                    }}>Edit</Link> | <span style={{color: '#007BFF', cursor:'pointer'}}onClick={() => {
                      removeDocument({variables: { coaDocumentID: item.coaDocumentID} })
                      refetch()
                    }}>Delete</span></td>
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
