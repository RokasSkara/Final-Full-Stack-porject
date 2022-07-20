import '../CSS/Questions.css'
import HomeScreenQuestionTab from './HomeScreenQuestionTab';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';

/*
    Questions homescreen shows all posted questions with their stats, has an ability to sort/filter orders per select options shown above questions.
*/

const QuestionsComp = () => {

    const [questions, setQuestions] = useState(null)
    const [Filter, setFilter] = useState(null)
    const [Sort, setSort] = useState(null)
    const [SortOrder, setSortOrder] = useState(null)

    const edditButton = (id) => {
        let x = document.getElementById(id)
        if (x.textContent === 'Asc') {
            x.textContent = "Desc"
            setSortOrder('Desc')
        } else {
            x.textContent = 'Asc'
            setSortOrder('Asc')
        }

    }

    const sortChange = () => {
        const sortBy = document.getElementById('sortBy').value
        setSort(sortBy)
    }

    const filterChange = () => {
        const filterAnswerStatus = document.getElementById('selectFilter').value

        const filter = () => {
            switch (filterAnswerStatus) {
                case 'answered':
                    setFilter(true)
                    break;
                case 'Not-answered':
                    setFilter(false)
                    break;
                default:
                    setFilter(null);
            }
            getInfo()
        }
        filter()
    }

    //Sorting 
    const SortData = (data) => {
        if (Sort === 'views') {
            if (SortOrder === 'Desc') {
                let temp = data.sort((a, b) => b.views - a.views)
                return temp;
            }
            let temp = data.sort((a, b) => a.views - b.views)
            return temp;

        }
        if (Sort === null || Sort === 'null') {
            if (SortOrder === 'Desc') {
                let temp = data.sort((a, b) => b.id - a.id)
                return temp;
            }
            let temp = data.sort((a, b) => a.id - b.id)
            return temp;
        }
        if (Sort === 'answer') {
            if (SortOrder === 'Desc') {
                let temp = data.sort((a, b) => b.answer - a.answer)
                return temp;
            }
            let temp = data.sort((a, b) => a.answer - b.answer)
            return temp;

        }

        return data;
    }

    const filterData = (data) => {
        if (Filter === null) {
            return data;
        }
        if (Filter === true) {
            let temp = data.filter((item, i) => item.answered === true)
            return temp
        }
        if (Filter === false) {
            let temp = data.filter((item, i) => item.answered === false)
            return temp
        }
    }

    const getInfo = () => [
        fetch('http://localhost:5000/question')
            .then(res => res.json())
            .then(data => {
                if(data.length !== 0){
                    let info = filterData(data)
                    info = SortData(info)
                    setQuestions(info)
                } else {
                    setQuestions(null)
                }

            })
            .catch(err => setQuestions(null))
    ]

    useEffect(() => {
        getInfo()
    }, [Filter, Sort, SortOrder])

    return (
        <main>
            <section className="TopBarQuestionsComp">
                <div className='TopBarQuestionsTitle'>
                    <h1>Top Questions</h1>
                    <div className='HomePageFilters'>
                        <div>
                            <label htmlFor="sortBy">Order by</label>
                            <select name="sortBy" onChange={() => sortChange()} id='sortBy'>
                                <option value="null">Date</option>
                                <option value="views">Views</option>
                                <option value="answer">Answers</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sortOrder">Sort Order</label>
                            <span style={{ textAlign: 'center' }} onClick={() => edditButton('views')} name='sortOrder' id='views'>Asc</span>
                        </div>
                        <div>
                            <label htmlFor="questionStatus">Question Status</label>
                            <select name="questionStatus" onChange={() => filterChange()} id='selectFilter'>
                                <option value="all">Both</option>
                                <option value="answered">Answered</option>
                                <option value="Not-answered">Not Answered</option>
                            </select>
                        </div>
                    </div>
                    <Link to={'/askquestion'}>Ask Question</Link>
                </div>
            </section>
            <section className='QuestionMain'>
                {questions ? questions.map((question, id) => <HomeScreenQuestionTab props={question} key={id} />) : <h1>No questions posted yet</h1>}
            </section>
        </main>
    );
}

export default QuestionsComp;