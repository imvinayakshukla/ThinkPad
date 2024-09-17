import React, { useContext } from "react";
import noteContext from "../components/context/Notes/noteContext";

export default function Notes_card(props) {
  const context = useContext(noteContext);
  const { deleteNote  } = context;

  return (
    <div className="col-md-3">
    <div className="card my-3 shadow-lg rounded-lg overflow-hidden">
      <div className="card-body p-4 bg-white">
        <h5 className="card-title text-xl font-semibold text-gray-800">{props.note.title}</h5>
        <p className="card-text text-gray-600 mt-2">{props.note.description}</p>
        <div className="flex justify-between items-center mt-4">
          <i
            className="fa-solid fa-trash fa-lg text-red-500 hover:text-red-700 cursor-pointer transition-transform duration-300 transform hover:scale-110 mx-2"
            onClick={() => { deleteNote(props.note._id) }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square fa-lg text-blue-500 hover:text-blue-700 cursor-pointer transition-transform duration-300 transform hover:scale-110 mx-2"
            onClick={() => props.updateNote(props.note)}
          ></i>
        </div>
      </div>
    </div>
  </div>
  
  );
}
