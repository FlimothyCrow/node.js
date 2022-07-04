import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useOutletContext } from "react-router-dom"

function NewMeme() {
    const [userId] = useOutletContext()
    const [selectedFile, setSelectedFile] = useState()
    const [isSelected, setIsSelected] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [title, setTitle] = useState("")

    let navigate = useNavigate()

    const titleChangeHandler = (event) => {
        let title = event.target.value
        setTitle(title)
        setShowErrorMessage(title.length < 4)
        console.log("length " + title.length)
    }

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0])
        setIsSelected(true)
    }

    const handleSubmission = () => {
        if (showErrorMessage) {
            console.log("nothing was posted, title too short")
            return
        }
        const formData = new FormData()

        formData.append("file", selectedFile)
        formData.append("title", title)
        formData.append("user_id", userId)

        fetch("http://localhost:3000/memes/meme", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json()) // server response
            .then((result) => {
                console.log("Success:", result)
                navigate(`/meme/${result.id}`)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    return (
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            {isSelected ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>lastModifiedDate: {selectedFile.lastModifiedDate.toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <>
                {isSelected && (
                    <p>
                        Meme Title:
                        <input type="text" onChange={titleChangeHandler} />
                        {showErrorMessage && (
                            <span style={{ color: "red" }}>
                                Meme title is too short! {4 - title.length} characters remaining
                            </span>
                        )}
                    </p>
                )}
            </>

            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )
}

export default NewMeme
