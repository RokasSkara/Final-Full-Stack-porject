import '../CSS/PostedQuestionTab.css'

const PostedQuestion = () => {
    return (<>
        <div className="QuestionTab">
            <div className="QuestionStatistics">
                <h4>0</h4>
                <span>Votes</span>
            </div>
            <div className="QuestionStatistics">
                <h4>0</h4>
                <span>Answer</span>
            </div>
            <div className="QuestionStatistics">
                <h4>0</h4>
                <span>Views</span>
            </div>
            <section className="QuestionDetails">
                <h3>Title</h3>
                
                <span>javascript</span>
                <span>parsing</span>
                <a href='' className='QuestionDetailsUser'>modified 1 min ago <span>User</span> </a>
            </section>
        </div>
    </>);
}

export default PostedQuestion;