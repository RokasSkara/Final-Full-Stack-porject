import '../CSS/createQuestionPage.css'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import UserContext from '../JS/userContext';
import LoginForm from '../pages/loginPage';



const CreateQuestionPage = () => {

    const redirect = useNavigate()

    const logged = useContext(UserContext)

     useEffect(() => {
        logged.checkAuth()
    }, []) 

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
                if (data.err) {
                    logged.checkAuth()
                    return alert(data.err)
                } else {
                    alert('Posted Successfully!')
                    e.target.elements.title.value = ''
                    e.target.elements.content.value = ''
                    setquestionTitle('')
                    setquestionBody('')
                    setTimeout(() => {
                        redirect('/')
                    }, 2000);
                }
            }
            )

            .catch(err => err === undefined? alert('Access Denied, relog and try again') : alert(err))
    }


    const [questionTitle, setquestionTitle] = useState('')
    const [questionBody, setquestionBody] = useState('')

    return (<>
        {logged.user !== null ?
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
                        defaultValue={questionBody}
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

            </section>
            :
            <> 
            <h1 className='PostQuestionErrMsg'>User needs to be logged in</h1>
            <LoginForm />
            </>
            }
            

    </>);
}

export default CreateQuestionPage;