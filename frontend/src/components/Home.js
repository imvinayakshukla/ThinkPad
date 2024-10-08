import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "./context/Notes/noteContext";
import Notes_card from "./Notes_card.js";
import { Addnote } from "./Addnote";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let Navigate = useNavigate();

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) getNotes();
    else {
      Navigate("/login");
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false); // State to control Addnote modal

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const openAddNoteModal = () => {
    setAddNoteModalOpen(true);
  };

  const closeAddNoteModal = () => {
    setAddNoteModalOpen(false);
  };

  return (
    <div className="mx-5">
      {/* Add Note Button */}

      <div className="w-full relative">
    <button
      type="button"
      className="btn btn-success my-3 "
      onClick={openAddNoteModal}
    >
      Add Note
    </button>
   

    </div>
    <div>

      {/* Addnote Modal */}
      {addNoteModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Note</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeAddNoteModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Addnote />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeAddNoteModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes:</h2>
      <div className="row my-3 ">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => {
            return (
              <Notes_card note={note} updateNote={updateNote} key={note.id} />
            );
          })
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
    </div>
  );
}
