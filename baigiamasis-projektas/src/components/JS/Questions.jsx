import '../CSS/Questions.css'
import PostedQuestion from './PostedQuestionTab';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';



const QuestionsComp = () => {

    const [questions, setQuestions] = useState(null)

    const getInfo = () => [
        fetch('http://localhost:5000/question')
        .then(res => res.json())
        .then(data => {
            setQuestions(data)})
        .catch(err => setQuestions(null))
    ]

    useEffect(() => {
        getInfo()
    },[])

    return (
        <main>
            <section className="TopBarQuestionsComp">
                <div className='TopBarQuestionsTitle'>
                    <h1>Top Questions</h1>
                    <Link to={'/askquestion'}>Ask Question</Link> 
                </div>
            </section>
            <section className='QuestionMain'>
                {questions ? questions.map((question,id) => <PostedQuestion props={question} key={id} />): <h1>No questions posted yet</h1>}
            </section>
        </main>
    );
}

export default QuestionsComp;