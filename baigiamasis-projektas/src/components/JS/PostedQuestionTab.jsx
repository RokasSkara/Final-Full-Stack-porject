import { Link } from 'react-router-dom'
import '../CSS/PostedQuestionTab.css'



const PostedQuestion = ({ props }) => {


    return (<>
        <div className="QuestionTab">
            <div className="QuestionStatistics">
                <h4>{props.postStatus.votes}</h4>
                <span>Votes</span>
            </div>
            <div className="QuestionStatistics">
                <h4>{props.postStatus.answers}</h4>
                <span>Answer</span>
            </div>
            <div className="QuestionStatistics">
                <h4>{props.postStatus.views}</h4>
                <span>Views</span>
            </div>
            <section className="QuestionDetails">
                <h3><Link to={`questions/:${props.id}`}>{props.title}</Link></h3>
                <span>Question status: {props.postStatus.answered === false? <span style={{color: 'red'}}>Not Answered</span>: <span style={{color: 'green'}}> Answered &#10003;</span>}</span>
                <Link to={''} className='QuestionDetailsUser'>{props.postStatus.eddited ? `modified ${props.postStatus.edditDate}`: `asked  ${props.postTime} by `}<span>{props.posterName}</span> </Link>
            </section>
        </div>

    </>);
}

export default PostedQuestion;