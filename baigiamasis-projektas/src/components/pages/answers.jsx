import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../CSS/answers.css'
import UserContext from '../JS/userContext';
import VotingButtons from "../JS/votingButtons";

import { useContext, useState } from 'react';
import EditAnswerForm from "../JS/editAnswerForm";


const Answer = ({ props, getAnswers}) => {
    const [EditAnswer, setEditAnswer] = useState(false)

    const DeleteAnswer = (e) => {
        fetch(`http://localhost:5000/answers/delete/${props.id}/${props.questionID}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    getAnswers()
                    alert(data.msg)
                }
            })
    }

    const logged = useContext(UserContext)

    return (<>
        <div className="Answer-Wrapper">
            <section className="FullAnswer">
                <div className="viewQuesitonStats">
                    <div className="VoteArrows">
                        <VotingButtons votes={props.votes}/>
                    </div>
                </div>
                <div className="ShowAnswer">
                    <ReactMarkdown Plugins={[remarkGfm]} children={props.answerContent} />
                </div>
            </section>
            <div className="AnswerUserInfo">
                <div>
                    {logged.user ?
                        <>
                            {props.answerOwner === logged.user.username ?
                                <>
                                    <button className="AddAnAnswer" onClick={() => { if (window.confirm('Are you sure you wish to edit the answer?')) { EditAnswer === false ? setEditAnswer(true) : setEditAnswer(false) } }} >Edit</button>
                                    <button className="AddAnAnswer" onClick={() => { if (window.confirm('Are you sure you wish to delete this answer?')) { DeleteAnswer() } }}>Delete</button>
                                </>
                                : ''}</>
                        :
                        ''}
                </div>
                <div className="WhoWhenAnswered">{props.eddited === false ? `posted on  ${props.answerTime} by ${props.answerOwner} ` : `eddited on ${props.edditDate} by ${props.answerOwner}`}</div>
            </div>
        </div>
        <div>
            {EditAnswer &&
                <EditAnswerForm props={props} getAnswers={getAnswers} setEditAnswer={setEditAnswer} />
            }
        </div>
    </>);
}

export default Answer;