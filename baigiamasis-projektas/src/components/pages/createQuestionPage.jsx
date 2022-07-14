import '../CSS/createQuestionPage.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'





const CreateQuestionPage = () => {

    const redirect = useNavigate()

    const submitQuestion = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/Question', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: e.target.elements.title.value,
                content: e.target.elements.content.value
            }),
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                return alert(data.error)
            } else {
                alert('Posted Successfully!')
                e.target.elements.title.value = ''
                e.target.elements.content.value = ''
                setquestionTitle('')
                setquestionBody('')
                setTimeout(() => {
                    redirect('/')
                }, 2000);
            }}
            )
            
        .catch(err => alert(err))
    }


    const [questionTitle, setquestionTitle] = useState('')
    const [questionBody, setquestionBody] = useState('')

    return (
        <section className="askAQuestionForm">
            <h1>Ask a question</h1>
            <form onSubmit={submitQuestion}>

                <input
                    type="text" name="title" placeholder="Enter question title"
                    value={questionTitle}
                    onChange={(e) => setquestionTitle(e.target.value)}
                />

                <textarea
                    name="content" cols="30" rows="10"
                    onChange={(e) => setquestionBody(e.target.value)}
                    defaultValue = {questionBody}
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
                <input type="Submit"/>
            </form>

        </section>);
}

export default CreateQuestionPage;