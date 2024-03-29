import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  REMOVE_COA_DOCUMENT,
  UPDATE_DOCUMENT_SORT_ORDER,
} from "../utils/mutations";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

import { useMutation } from "@apollo/react-hooks";
import ConfirmDel from "./ConfirmDel";

const COATable = ({ tableData, productID, refetch }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const [showDel, setShowDel] = useState(false);
  const [itemToDel, setItemToDel] = useState(false);
  const [updateSortOrder] = useMutation(UPDATE_DOCUMENT_SORT_ORDER);
  const [removeDocument] = useMutation(REMOVE_COA_DOCUMENT);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const showDelete = () => {
    setShowDel(!showDel);
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
      let { __typename, ...documentItems } = document;
      return {
        ...documentItems,
        sortOrder: i + 1,
      };
    });

    setData(updatedItems);
    updateSortOrder({
      variables: { coaProductID: productID, documents: updatedItems },
    });
    // refetch();
  };

  const handleDeleteDocument = (item) => {
    setItemToDel(item);
    showDelete();
    refetch();
  };

  return (
    <Wrapper>
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
              <tbody>
                {data.map((item, index) => {
                  const localTimeDate =
                    item.uploadedOn &&
                    item.uploadedOn.substr(0, item.uploadedOn.indexOf("Z"));
                  const uploadedOnDate =
                    moment(localTimeDate).format("MM/DD/YYYY");

                  return (
                    <Draggable
                      key={item.coaDocumentID}
                      draggableId={item.batchNumber}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
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
                              <i
                                role="Handle"
                                className="fas fa-grip-lines"
                              ></i>
                            </span>
                          </td>
                          <td>
                            <div>
                              <span>{item.batchNumber}</span>
                            </div>
                          </td>
                          <td>{item.isExternal ? "Yes" : "No"}</td>
                          <td>{uploadedOnDate}</td>
                          <td>
                            <a
                              href={`https://res.cloudinary.com/zilis/image/upload/${item.fileUrl}`}
                            >
                              {item.fileUrl}
                            </a>
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: `/COA/Edit/${productID}/${item.coaDocumentID}`,
                                productID: productID,
                                coaDetails: item,
                              }}
                            >
                              Edit
                            </Link>{" "}
                            |{" "}
                            <span
                              style={{ color: "#007BFF", cursor: "pointer" }}
                              onClick={() => handleDeleteDocument(item)}
                            >
                              Delete
                            </span>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
      <Overlay showDel={showDel} />
      <Delete>
        <div className={showDel ? "show" : "hide"}>
          <ConfirmDel
            document={itemToDel}
            type={"COA"}
            show={showDelete}
            name={itemToDel.batchNumber}
          />
        </div>
      </Delete>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  th {
    text-align: left;
  }
  tr {
    text-align: left;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${(props) => (props.showDel ? "visible" : "hidden")};
`;

const Delete = styled.div`
  .hide {
    display: none;
  }

  .show {
    z-index: 12;
    position: absolute;
    left: 35%;
    top: 35%;
    background: white;
    border: 1px solid gray;
    padding: 3%;
    box-shadow: 2px 3px 5px gray;
    max-width: 500px;
  }
`;

export default COATable;
