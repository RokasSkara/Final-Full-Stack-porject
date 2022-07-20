import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../CSS/answers.css'

import { useState } from 'react';

/*
Edit form pops up if click on edit button.
Allows to edit user's answer and refreshes answers once edit is done via getAnswers function as well as hides edit form with setEditAnswer
*/

const EditAnswerForm = ({ props, getAnswers, setEditAnswer }) => {

    const [questionBody, setquestionBody] = useState(props.answerContent)

    const EditAnswer = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/answers/${props.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: e.target.elements.content.value
            }),

        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    getAnswers()
                    setEditAnswer(false)
                    alert(data.msg)
                }
            })
    }

    return (<>

        <form className='AnswerForm' onSubmit={EditAnswer}>
            <h1>Edit your answer</h1>
            <div className="CancelEdit" onClick={() => setEditAnswer(false)}>Cancel Edit</div>
            <textarea
                className='AnswerWindow'
                name="content" cols="30" rows="10"
                onChange={(e) => setquestionBody(e.target.value)}
                defaultValue={props.answerContent}

            >
            </textarea>
            <div className='PreviewArea'>
                <div className='PreviewAreaBody'>
                    <ReactMarkdown Plugins={[remarkGfm]} children={questionBody} />
                </div>
            </div>
            <input type="submit" />
        </form>
    </>);
}

export default EditAnswerForm;