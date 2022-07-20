import { Link } from 'react-router-dom'
import '../CSS/HomeScreenQuestionTab.css'

/*
    HomeScreenQuestionTab is a question tab componenet that is used to generate quesiton table unit in homapage.
*/

const PostedQuestion = ({ props }) => {

    const addView = () => {
         fetch(`http://localhost:5000/question/views/${props.id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                views: props.views+1,
            }),
        })
    }


    return (<>
        <div className="QuestionTab">
{/*             <div className="QuestionStatistics">
                <h4>{props.votes}</h4>
                <span>Votes</span>
            </div> */}
            <div className="QuestionStatistics">
                <h4>{props.answer}</h4>
                <span>Answers</span>
            </div>
            <div className="QuestionStatistics">
                <h4>{props.views}</h4>
                <span>Views</span>
            </div>
            <section className="QuestionDetails">
                <h3><Link onClick={ () =>addView()} to={`questions/:${props.id}`}>{props.title} </Link></h3>
                <span>Question status: {props.answered === false? <span style={{color: 'red'}}>Not Answered</span>: <span style={{color: 'green'}}> Answered &#10003;</span>}</span>
                <h4 to={`/questions/:${props.id}`} className='QuestionDetailsUser'>{props.postStatus.eddited ? `modified ${props.postStatus.edditDate} by `: `asked  ${props.postTime} by `}<span>{props.posterName}</span> </h4>
            </section>
        </div>

    </>);
}

export default PostedQuestion;