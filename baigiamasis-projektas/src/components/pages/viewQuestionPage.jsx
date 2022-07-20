import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../CSS/viewQuestionPage.css'

import UserContext from '../JS/userContext';
import AnswerForm from "../JS/answerForm";
import Answer from "./answers";
import EditQuestionForm from "../JS/editQuestionForm";
import VotingBUttons from "../JS/votingButtons";


/*
 Individual question + its answers page.
 If logged in allows to post an answer and edit own posts/questions as well as delete them or mark question answered
*/


const ViewQuestionPage = (props) => {

    let { id } = useParams()
    id = id.split(':')[1]

    const logged = useContext(UserContext)
    const redirect = useNavigate()

    const [question, setQuestion] = useState(null)
    const [showAnswerForm, setshowForm] = useState(false)
    const [showAnswer, setshowAnswer] = useState(false)
    const [Answers, setAnswer] = useState(null)
    const [ShowEdit, setShowEdit] = useState(false)


    const MarkAsAnwsered = () => {
        fetch(`http://localhost:5000/question/answered/${id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answered: true
            }),
        })
    }

    const getQuestion = () => [
        fetch(`http://localhost:5000/question/${id}`)
            .then(res => res.json())
            .then(data => {
                data.length === 0 ? setQuestion(null) :
                    setQuestion(data)
            })
            .catch(err => setQuestion(null))
    ]
    const getAnswers = () => [
        fetch(`http://localhost:5000/answers/${id}`)
            .then(res => res.json())
            .then(data => {
                data.length === 0 ? setshowAnswer(false) : setshowAnswer(true)
                setAnswer(data)
            })
            .catch(err => console.log(err))
    ]

    const DeleteQuestion = (e) => {
        fetch(`http://localhost:5000/question/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert(data.msg)
                    redirect('/')
                }
            })
    }

    useEffect(() => {
        getQuestion()
        getAnswers()
    }, [])


    return (<>
        {question ?
            <>
                <section className="viewQuestion">
                    {logged.user ?
                        <>
                            {question.posterName === logged.user.username ?
                                <div className="myQuestionControl">
                                    {question.answered === false ?
                                        <button className="MarkAsAnswered" onClick={() => { if (window.confirm('Was the question answered?')) { MarkAsAnwsered() } }}>Mark as Answered</button>
                                        :
                                        <div></div>
                                    }
                                    <div>
                                        <button className="AddAnAnswer" onClick={() => ShowEdit === false ? setShowEdit(true) : setShowEdit(false)}>Edit</button>
                                        <button className="AddAnAnswer" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) { DeleteQuestion() } }}>Delete</button>
                                    </div>
                                </div>
                                : ''}</>
                        :
                        ''}
                    <h1>{question.title}</h1>
                    <hr />
                    <section>
                        <div className="viewQuesitonStats">
                            <div className="VoteArrows">
                                 <VotingBUttons votes={question.votes}/> 
                            </div>
                        </div>
                        <div>
                            <div className="viewQuestionContent">
                                <ReactMarkdown Plugins={[remarkGfm]} children={question.content} />
                            </div>
                        </div>
                    </section>
                    <hr />
                    <button className="AddAnAnswer" onClick={() => setshowForm(showAnswerForm === true ? false : true)}>Answer</button>


                    <div className="ViewQuestionUserInfo">{question.postStatus.eddited ? `modified ${question.postStatus.edditDate}` : `asked on  ${question.postTime} by ${question.posterName} `}</div>
                    <hr />
                </section>
                {ShowEdit && (<EditQuestionForm props={question} getQuestion={getQuestion} setShowEdit={setShowEdit} />)}
                {showAnswerForm && (
                    logged.user ?
                        <>
                            <section className="CommentForm">
                                <AnswerForm id={{
                                    id,
                                    setshowForm,
                                    getAnswers
                                }} />
                            </section>
                        </> :
                        <h4 style={{ textAlign: 'center', margin: '5px 5px', backgroundColor: 'red' }}><Link to={'/login'}>Log-in </Link> to post the Answer </h4>

                )}


                <section className="ViewQuestionAnswers">
                    {showAnswer && (
                        Answers.map((answer, i) => <Answer props={answer} key={i} getAnswers={getAnswers}/>)
                    )}
                </section>

            </>
            :
            <>Loading </>
        }
    </>);
}

export default ViewQuestionPage;