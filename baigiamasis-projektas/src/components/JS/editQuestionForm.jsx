import '../CSS/createQuestionPage.css'
import { useState } from 'react'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/*
    Returns question edit form.
    Refreshes question info via getQuestion function as well as hides edit form with setShowEdit funcion.
*/


const EditQuestionForm = ({ props, getQuestion, setShowEdit }) => {

    const [questionTitle, setquestionTitle] = useState(props.title)
    const [questionBody, setquestionBody] = useState(props.content)

    const EditQuestion = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/question/${props.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: e.target.elements.content.value,
                title: e.target.elements.title.value
            }),

        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    getQuestion()
                    setShowEdit(false)
                    alert(data.msg)
                }
            })
            .catch(err => alert(err))
    }

    return (
        <section className="askAQuestionForm">

            <h1>Edit question</h1>
            <form onSubmit={EditQuestion}>

                <input
                    type="text" name="title" placeholder="Enter question title"
                    defaultValue={props.title}
                    onChange={(e) => setquestionTitle(e.target.value)}
                />

                <textarea
                    name="content" cols="30" rows="10"
                    onChange={(e) => setquestionBody(e.target.value)}
                    defaultValue={props.content}
                >
                </textarea>

                <div className='PreviewArea'>
                    <div className='PreviewAreaTitle'>
                        <ReactMarkdown Plugins={[remarkGfm]} children={questionTitle} />
                    </div>
                    <div className='PreviewAreaBody'>
                        <ReactMarkdown Plugins={[remarkGfm]} children={questionBody} />
                    </div>
                </div>
                <input type="Submit" style={{ marginRight: 'Auto' }} />
            </form>

        </section>

    );
}

export default EditQuestionForm;