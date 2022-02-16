import React, { useState } from "react"
import data from "./data"
import Comment from "./components/Comment"
import AddComment from "./components/AddComment"


function App() {
    const [currentUser, setCurrentUser] = useState(data.currentUser)
    const [comments, setComments] = useState(data.comments)
    const [newComment, setNewComment] = useState("")

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

    const commentElements = comments.map((comment, idx) => {
        return (
            <Comment 
                key={idx}
                comment={comment}
                currentUser={currentUser}
            />
        )
    })

    return (
        <div className="app">
            {commentElements}
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
