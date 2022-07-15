import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../CSS/answers.css'
const Answer = ({ props }) => {
    return (<>
        <div className="Answer-Wrapper">
            <section className="FullAnswer">
                <div className="viewQuesitonStats">
                    <div className="VoteArrows">
                        <button>&#9650;</button>
                        <div>0</div>
                        <button>&#9660;</button>
                    </div>
                </div>
                <div className="ShowAnswer">
                    <ReactMarkdown Plugins={[remarkGfm]} children={props.answerContent} />
                </div>
            </section>
            <div className="AnswerUserInfo">
                <div className="WhoWhenAnswered">{`posted on  ${props.answerTime} by ${props.answerOwner} `}</div>
            </div>
        </div>
    </>);
}

export default Answer;