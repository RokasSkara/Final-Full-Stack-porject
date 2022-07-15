import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../CSS/viewQuestionPage.css'


import UserContext from '../JS/userContext';
import AnswerForm from "../JS/answerForm";
import Answer from "./answers";


const ViewQuestionPage = (props) => {
    let { id } = useParams()
    id = id.split(':')[1]

    const logged = useContext(UserContext)

    const [question, setQuestion] = useState(null)
    const [showComment, setshowForm] = useState(false)
    const [showAnswer, setshowAnswer] = useState(false)
    const [Answers, setAnswer] = useState(null)


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

    useEffect(() => {
        getQuestion()
        getAnswers()
    }, [])

    return (<>
        {question ?
            <>
                <section className="viewQuestion">
                    <h1>{question.title}</h1>
                    <hr />
                    <section>
                        <div className="viewQuesitonStats">
                            <div className="VoteArrows">
                                <button>&#9650;</button>
                                <div>{question.postStatus.votes}</div>
                                <button>&#9660;</button>
                            </div>
                        </div>
                        <div>
                            <div className="viewQuestionContent">
                                <ReactMarkdown Plugins={[remarkGfm]} children={question.content} />
                            </div>
                        </div>
                    </section>
                    <hr />
                    <button className="AddAnAnswer" onClick={() => setshowForm(showComment === true ? false : true)}>Answer</button>
                    <div className="ViewQuestionUserInfo">{question.postStatus.eddited ? `modified ${question.postStatus.edditDate}` : `asked on  ${question.postTime} by ${question.posterName} `}</div>
                    <hr />
                </section>
                {showComment && (
                    logged.user ? 
                    <>
                    <section className="CommentForm">
                        <AnswerForm id={{
                            id,
                            setshowForm
                        }} />
                    </section>
                    </>:
                     <h4 style={{textAlign: 'center', margin: '5px 5px', backgroundColor: 'red'}}><Link to={'/login'}>Log-in </Link> is needed to post the Answer </h4>
                    
                )}


                <section className="ViewQuestionAnswers">
                    {showAnswer && (
                        Answers.map((answer, i) => <Answer props={answer} key={i} />)
                    )}
                </section>

            </>
            :
            <>Loading </>
        }
    </>);
}

export default ViewQuestionPage;