import '../CSS/Questions.css'
import PostedQuestion from './PostedQuestionTab';
import { Link } from 'react-router-dom'

const QuestionsComp = () => {
    return (
        <main>
            <section className="TopBarQuestionsComp">
                <div className='TopBarQuestionsTitle'>
                    <h1>Top Questions</h1>
                    <Link to={'/askquestion'}>Ask Question</Link> 
                </div>
            </section>
            <section className='QuestionMain'>
                <PostedQuestion />
            </section>
        </main>
    );
}

export default QuestionsComp;