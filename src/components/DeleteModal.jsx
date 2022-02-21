import React from "react"

function DeleteModal({ commentId, handleDelete, handleCancel }) {
    return (
        <section className="modal">
            <div className="modal--delete">
                <div className="modal--title">
                    Delete comment
                </div>
                <div className="modal--content">
                    Are you sure you want to delete this comment? This will remove the 
                    comment and can't be undone
                </div>
                <div className="modal--actions">
                    <button 
                        className="btn btn--cancel"
                        onClick={() => handleCancel(0)}
                    >
                        NO, CANCEL
                    </button>
                    <button 
                        className="btn btn--delete"
                        onClick={(event) => handleDelete(event, commentId)}
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>
        </section>
    )
}

export default DeleteModal
