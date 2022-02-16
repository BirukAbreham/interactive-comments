import React from "react"
import getImageByValue from "./GetImage"


function AddComment(props) {
    return (
        <div className="comment--form">
            <img 
                alt="avatar image" 
                id="com--img" 
                src={getImageByValue(props.currentUser.image.png)} 
            />
            <textarea
                rows={5}
                className="comment--input"
                placeholder="Add a comment..."
                value={props.newComment}
                name="new_comment"
                onChange={(event) => props.handleTextChange(event)}
            >
            </textarea>
            <button 
                className="btn btn-send"
                onClick={(event) => props.handleAddComment(event)}
            >
                SEND
            </button>
        </div>
    )
}

export default AddComment
