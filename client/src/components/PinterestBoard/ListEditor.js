import "../../BoardStyles/ListEditor.css";

import React, { useState, useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ListEditor = ({ title, handleChangeTitle, deleteList, onClickOutside }) => {
  const ref = useRef(null);

  const onEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      // saveList();
    }
  };

  const handleClick = e => {
    const node = ref.current;

    if (node.contains(e.target)) {
      return;
    }

    onClickOutside();
  };

  useEffect(() => {
    document.addEventListener("click", handleClick, false);

    return () => {
      document.removeEventListener("click", handleClick, false);
    };
  }, [handleClick]);

  return (
    <div className="List-Title-Edit" ref={ref}>
      <div className="main">
        <div className="titlediv">
        <TextareaAutosize
        autoFocus
        className="List-Title-Textarea"
        placeholder="Enter list title..."
        value={title}
        name="title"
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245 }}
      />
        </div>
        {/* <div className="descriptiondiv">
        <TextareaAutosize
        autoFocus
        className="List-Title-Textarea"
        placeholder="Add Description Here"
        value={title}
        name="title"
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245 }}
      />
        </div> */}
      </div>
     
      
      {deleteList && 
      <i className="fa fa-trash-o" style={{ fontSize: '20px', color: 'black', marginLeft: '10px', cursor: 'pointer' }} 
      onClick={deleteList} 
      ></i>
      }
    </div>
  );
};

export default ListEditor;
