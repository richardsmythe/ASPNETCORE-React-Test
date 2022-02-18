import React, { useState } from 'react'
import Constants from '../Utilities/Constants'

export default function PostUpdateForm(props) {
    const initialFormData = Object.freeze({
        title: props.post.title,
        content: props.post.content
    });

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent default action from happening when form is submitted

        const postToUpdate = {
            postId: props.post.postid,
            title: formData.title,
            content: formData.content
        };

        const url = Constants.API_URL_UPDATE_POST;

        // js fetch api for post request up to server
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postToUpdate) //convert to json string
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        // call function that post has been created using props
        // props are a way to send data between react components
        props.onPostUpdated(postToUpdate);

    };


    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Updating the post "{props.post.title}".</h1>

            <div className="mt-5">
                <label className="h3 form-label">Post title</label>
                <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Post content</label>
                <input value={formData.content} name="content" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
            <button onClick={() => props.onPostUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
        </form>
    );
}
