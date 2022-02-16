import React from "react"
import getImageByValue from "./GetImage"


function AddReply(props) {
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
                placeholder={`@${props.username}`}
            >
            </textarea>
            <button 
                className="btn btn-send"
            >
                REPLY
            </button>
        </div>
    )
}

export default AddReply
