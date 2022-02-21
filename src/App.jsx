import React, { useState } from "react"
import data from "./data"
import Comment from "./components/Comment"
import AddComment from "./components/AddComment"
import DeleteModal from "./components/DeleteModal"


function App() {
    const [currentUser] = useState(data.currentUser)
    const [comments, setComments] = useState(data.comments)
    const [newComment, setNewComment] = useState("")
    const [deleteComment, setDeleteComment] = useState({
        deleteModalFlag: false,
        currentCommentId: 0,
    })

    function handleTextInput(event) {
        event.preventDefault()
        if (event.target.name === "new_comment") {
            setNewComment(event.target.value)
        }
    }

    function handleAddComment(event) {
        event.preventDefault()
        setComments((prevComments) => {
            return [
                ...prevComments,
                {
                    id: 5,
                    content: newComment,
                    createdAt: "1 sec ago",
                    score: 0,
                    user: currentUser,
                    replies: [],
                }
            ]
        })
        setNewComment("")
    }

    function handleScoreUp(commentId) {
        function scoreUp(pc) {
            return pc.map(c => {
                if (c.id === commentId) {
                    return { ...c, score: c.score + 1 }
                } else if (c.replies.length > 0) {
                    return { ...c, replies: scoreUp(c.replies) }
                }
                return c
            })
        }

        setComments(prevComment => {
            return scoreUp(prevComment)
        })
    }

    function handleScoreDown(commentId) {
        function scoreDown(pc) {
            return pc.map(c => {
                if (c.id === commentId) {
                    return { ...c, score: c.score - 1 }
                } else if (c.replies.length > 0) {
                    return { ...c, replies: scoreDown(c.replies) }
                }
                return c
            })
        }

        setComments(prevComment => {
            return scoreDown(prevComment)
        })
    }

    function AddReply(event, commentId, content) {
        event.preventDefault()

        function newReply(pc) {
            return pc.map(c => {
                if (c.id === commentId) {
                    return { 
                        ...c, 
                        replies: [ 
                            ...c.replies,
                            {
                                id: 8,
                                content: content,
                                createdAt: "1 sec ago",
                                score: 0,
                                user: currentUser,
                                replies: []
                            }
                        ]
                    }
                } else if (c.replies.length > 0) {
                    return { ...c, replies: newReply(c.replies) }
                }
                return c
            })
        }

        setComments(prevComment => newReply(prevComment))
    }

    function handleCommentModal(commentId) {
        setDeleteComment((prevModal) => {
            return {
                deleteModalFlag: !prevModal.deleteModalFlag,
                currentCommentId: prevModal.deleteModalFlag ? 0 : commentId
            }
        })
    }

    function handleCommentDelete(event, commentId) {
        event.preventDefault()

        function delComment(comments, id) {
            let items = []

            for(const comment of comments) {
                if (comment.replies.length > 0 && comment.id !== id) {
                    items.push({
                        ...comment,
                        replies: delComment(comment.replies, id)
                    })
                }

                if (comment.replies.length === 0 && comment.id !== id) {
                    items.push(comment)
                }
            }

            return items
        }

        setComments(prevComments => delComment(prevComments, commentId))
        setDeleteComment({ deleteModalFlag: false, currentCommentId: 0 })
    }

    return (
        <div className="app">
            { 
                deleteComment.deleteModalFlag && 
                <DeleteModal 
                    commentId={deleteComment.currentCommentId}
                    handleDelete={handleCommentDelete}
                    handleCancel={handleCommentModal}
                /> 
            }
            <Comment 
                comments={comments}
                currentUser={currentUser}
                handleScoreUp={handleScoreUp}
                handleScoreDown={handleScoreDown}
                AddNewReply={AddReply}
                handleCommentModal={handleCommentModal}
            />
            <AddComment 
                currentUser={currentUser}
                newComment={newComment}
                handleTextChange={handleTextInput}
                handleAddComment={handleAddComment}
            />
        </div>
    )
}

export default App
