import React from "react"
import getImageByValue from "./GetImage"


function AddReply({ comment, currentUser, username, replyContent, handleReplyInput, AddNewReply, CloseReplyForm}) {
    return (
        <div className="comment--form">
            <img 
                alt="avatar image" 
                id="com--img" 
                src={getImageByValue(currentUser.image.png)} 
            />
            <textarea
                rows={5}
                className="comment--input"
                placeholder=""
                value={replyContent}
                name="new_reply"
                onChange={(event) => handleReplyInput(event, username)}
            >
            </textarea>
            <button 
                className="btn btn-send"
                onClick={
                    (event) => {
                        AddNewReply(event, comment.id, replyContent)
                        CloseReplyForm()
                    }
                }
            >
                REPLY
            </button>
        </div>
    )
}

export default AddReply
