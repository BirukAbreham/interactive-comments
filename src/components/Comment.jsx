import React, { useState } from "react"
import AddReply from "./AddReply"
import getImageByValue from "./GetImage"
import plusIcon from "../images/icon-plus.svg"
import minusIcon from "../images/icon-minus.svg"
import replyIcon from "../images/icon-reply.svg"
import deleteIcon from "../images/icon-delete.svg"
import editIcon from "../images/icon-edit.svg"


function Comment(props) {
    const { comment, currentUser } = props
    const [startReply, setStartReply] = useState(false)

    function handleReply() {
        setStartReply((prevState) => !prevState)
    }

    const replyElements = (comment.replies || []).map((reply, idx) => {
        return (
            <Comment 
                key={idx}
                comment={reply}
                currentUser={currentUser}
            />
        )
    })

    return (
        <div className="com--reply">
            <div className="comment">
                <section className="desk-reaction">
                    <img 
                        src={plusIcon} 
                        alt="pluse icon" 
                        className="icon" 
                    />
                    <div className="up">
                        {comment.score}
                    </div>
                    <img 
                        src={minusIcon} 
                        alt="minus icon" 
                        className="icon" 
                    />
                </section>
                <section className="sec--avatar">
                    <div className="avatar-header">
                        <img 
                            src={getImageByValue(comment.user.image.png)} 
                            alt="avatar image" 
                            className="avatar--img" 
                        />
                        <div className="avatar-name">
                            {comment.user.username}
                        </div>
                        {
                            comment.user.username === currentUser.username &&
                            <div className="badge">
                                you
                            </div>
                        }
                        <div className="time">
                            {comment.createdAt}
                        </div>
                    </div>
                    
                    {
                        comment.user.username === currentUser.username ?
                        <div className="desk reply--del-edit">
                            <div className="del">
                                <img src={deleteIcon} />
                                <span>Delete</span>
                            </div>
                            <div className="edit">
                                <img src={editIcon} />
                                <span>Edit</span>
                            </div>
                        </div>
                        :
                        <div className="desk-reply" onClick={handleReply}>
                            <img src={replyIcon} alt="reply icon" />
                            <span className="reply">Reply</span>
                        </div>
                    }
                </section>
                <section className="comment-txt">
                    {comment.content}
                </section>
                <section className="comment-mob">
                    <section className="mob-reaction">
                        <img 
                            src={plusIcon} 
                            alt="pluse icon" 
                            className="icon" 
                        />
                        <div className="up">
                            {comment.score}
                        </div>
                        <img 
                            src={minusIcon} 
                            alt="minus icon" 
                            className="icon" 
                        />
                    </section>
                    {
                        comment.user.username === currentUser.username ?
                        <div className="mob reply--del-edit">
                            <div className="del">
                                <img src={deleteIcon} />
                                <span>Delete</span>
                            </div>
                            <div className="edit">
                                <img src={editIcon} />
                                <span>Edit</span>
                            </div>
                        </div>
                        :
                        <div className="mob-reply" onClick={handleReply}>
                            <img src={replyIcon} alt="reply icon" />
                            <span className="reply">Reply</span>
                        </div>
                    }
                </section>
            </div>
            {
                startReply &&
                <AddReply
                    username={comment.user.username}
                    currentUser={currentUser}  
                />
            }
            <section className="reply--section">
                {replyElements}
            </section>
        </div>
    )
}

export default Comment
