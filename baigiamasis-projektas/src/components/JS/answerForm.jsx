import '../CSS/answerForm.css'
import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom';
import remarkGfm from "remark-gfm";

const AnswerForm = (props) => {
    const { id} = props.id
    const { setshowForm } = props.id
    const { getAnswers } = props.id
    const redirect = useNavigate()


    const submitAnswer = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/Answers/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answer: e.target.elements.content.value,
                questionID: id
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.err) {
                    return alert(data.err)
                } else {
                    alert('Answer Posted')
                    setTimeout(() => {
                        setshowForm(false)
                        getAnswers()
                        redirect(`/questions/:${id}`)
                    },2000)
                }
            })
    }

    const [questionBody, setquestionBody] = useState('')

    return (<>

        <form className='AnswerForm' onSubmit={submitAnswer}>
            <h1>Your Answer</h1>
            <textarea
                className='AnswerWindow'
                name="content" cols="30" rows="10"
                onChange={(e) => setquestionBody(e.target.value)}
                defaultValue={questionBody}

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


export default AnswerForm;