import '../CSS/Questions.css'
import PostedQuestion from './PostedQuestionTab';

const QuestionsComp = () => {
    return (
        <main>
            <section className="TopBarQuestionsComp">
                <div className='TopBarQuestionsTitle'>
                    <h1>Top Questions</h1>
                    <button>Ask Question</button>    
                </div>
            </section>
            <section className='QuestionMain'>
                <PostedQuestion />
            </section>
        </main>
    );
}

export default QuestionsComp;