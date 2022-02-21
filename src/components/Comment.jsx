import React, { useState } from "react";
import AddReply from "./AddReply"
import getImageByValue from "./GetImage";
import plusIcon from "../images/icon-plus.svg";
import minusIcon from "../images/icon-minus.svg";
import replyIcon from "../images/icon-reply.svg";
import deleteIcon from "../images/icon-delete.svg";
import editIcon from "../images/icon-edit.svg";

function CommentWrapper(props) {
    return (
        <div style={{ marginBlock: "10px"}}>
            {props.child}
        </div>
    )
}

function Comment({ comments, currentUser, handleScoreUp, handleScoreDown, AddNewReply, handleCommentModal }) {
    const [replyToComment, setReplyToComment] = useState(-1)
    const [newReply, setNewReply] = useState("")

    function handleToReply(commentId) {
        setReplyToComment(prevId => prevId === commentId ? -1 : commentId)
    }

    function handleReplyInput(event, username) {
        event.preventDefault()
        if (event.target.name === "new_reply") {
            setNewReply(prevReply => (
                prevReply.startsWith("@") 
                    ? event.target.value 
                    : `@${username}, ${event.target.value}`
            ))
        }
    }

    function commentContentFormatter(content, username) {
        return (
            <div>
                <span className="username">
                    {content.substring(0, username.length + 1)}
                </span>
                {content.substring(username.length + 1)}
            </div>
        )
    }

    return (
        <div className="com--reply">
            { comments.map((comment) => {
                return (
                    <CommentWrapper
                        key={comment.id}
                        child = {
                            <div>
                                <div className="comment">
                                    <section className="desk-reaction">
                                        <img 
                                            src={plusIcon} 
                                            alt="pluse icon" 
                                            className="icon"
                                            onClick={() => handleScoreUp(comment.id)}
                                        />
                                        <div className="up">
                                            {comment.score}
                                        </div>
                                        <img 
                                            src={minusIcon} 
                                            alt="minus icon" 
                                            className="icon"
                                            onClick={() => handleScoreDown(comment.id)}
                                        />
                                    </section>
                                    <section className="sec--avatar">
                                        <div className="avatar-header">
                                            <img
                                                src={getImageByValue(comment.user.image.png)}
                                                alt="avatar image"
                                                className="avatar--img"
                                            />
                                            <div className="avatar-name">{comment.user.username}</div>
                                            {comment.user.username === currentUser.username && (
                                                <div className="badge">you</div>
                                            )}
                                            <div className="time">{comment.createdAt}</div>
                                        </div>

                                        {comment.user.username === currentUser.username ? (
                                            <div className="desk reply--del-edit">
                                                <div 
                                                    className="del"
                                                    onClick={() => handleCommentModal(comment.id)}
                                                >
                                                    <img src={deleteIcon} />
                                                    <span>Delete</span>
                                                </div>
                                                <div className="edit">
                                                    <img src={editIcon} />
                                                    <span>Edit</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div 
                                                className="desk-reply"
                                                onClick={() => handleToReply(comment.id)}
                                            >
                                                <img src={replyIcon} alt="reply icon" />
                                                <span className="reply">
                                                    Reply
                                                </span>
                                            </div>
                                        )}
                                    </section>
                                    <section className="comment-txt">
                                        {
                                            comment.content.startsWith("@") ?
                                                    commentContentFormatter(
                                                        comment.content, 
                                                        comment.user.username
                                                    ) :
                                                    comment.content
                                        }
                                    </section>
                                    <section className="comment-mob">
                                        <section className="mob-reaction">
                                            <img 
                                                src={plusIcon} 
                                                alt="pluse icon" 
                                                className="icon"
                                                onClick={() => handleScoreUp(comment.id)}
                                            />
                                            <div className="up">
                                                {comment.score}
                                            </div>
                                            <img 
                                                src={minusIcon} 
                                                alt="minus icon" 
                                                className="icon"
                                                onClick={() => handleScoreDown(comment.id)}
                                            />
                                        </section>
                                        {comment.user.username === currentUser.username ? (
                                            <div className="mob reply--del-edit">
                                                <div 
                                                    className="del"
                                                    onClick={() => handleCommentModal(comment.id)}
                                                >
                                                    <img src={deleteIcon} />
                                                    <span>Delete</span>
                                                </div>
                                                <div className="edit">
                                                    <img src={editIcon} />
                                                    <span>Edit</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div 
                                                className="mob-reply"
                                                onClick={() => handleToReply(comment.id)}
                                            >
                                                <img src={replyIcon} alt="reply icon" />
                                                <span className="reply">
                                                    Reply
                                                </span>
                                            </div>
                                        )}
                                    </section>
                                </div>
                                {
                                    replyToComment === comment.id && 
                                    <AddReply 
                                        comment={comment}
                                        currentUser={currentUser}
                                        replyContent={newReply}
                                        username={comment.user.username}
                                        handleReplyInput={handleReplyInput}
                                        AddNewReply={AddNewReply}
                                        CloseReplyForm={
                                            () => {
                                                setReplyToComment(-1)
                                                setNewReply("")
                                            }
                                        }
                                    />
                                }
                                {(comment.replies.length > 0) &&
                                    <section className="reply--section">
                                        <Comment
                                            key={comment.id}
                                            comments={comment.replies}
                                            currentUser={currentUser}
                                            handleScoreUp={handleScoreUp}
                                            handleScoreDown={handleScoreDown}
                                            AddNewReply={AddReply}
                                            handleCommentModal={handleCommentModal}
                                        />
                                    </section>
                                }
                            </div>
                        }
                    />
                )
            })
        }
        </div>
    );
}

export default Comment;
