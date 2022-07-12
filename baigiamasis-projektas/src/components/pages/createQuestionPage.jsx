import '../CSS/createQuestionPage.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'





const CreateQuestionPage = () => {


    const submitQuestion = (e) => {
        e.preventDefault()
        console.log('Sumitting')
    }


    const [questionTitle, setquestionTitle] = useState('')
    const [questionBody, setquestionBody] = useState('')

    return (
        <section className="askAQuestionForm">
            <h1>Ask a question</h1>
            <form onSubmit={() => submitQuestion()}>

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
                <input type="Submit" />
            </form>

        </section>);
}

export default CreateQuestionPage;