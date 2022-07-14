import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import '../CSS/viewQuestionPage.css'

const ViewQuestionPage = (props) => {
    let { id } = useParams()
    id = id.split(':')[1]
    console.log(id)

    const [question, setQuestion] = useState(null)

    const getInfo = () => [
        fetch(`http://localhost:5000/question/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log('fetch data', data)
                data.length === 0 ? setQuestion(null) :
                    setQuestion(data)
            })
            .catch(err => setQuestion(null))
    ]

    useEffect(() => {
        getInfo()
    }, [])

    return (<>
        {question ?
            <section className="viewQuestion">
                <h1>{question.title}</h1>
                <hr />
                <section>
                    <div className="viewQuesitonStats">

                    </div>
                    <div className="viewQuestionContent">
                        <ReactMarkdown Plugins={[remarkGfm]} children={question.content} />
                    </div>
                </section>
            </section>
            :
            <>Loading </>
        }
    </>);
}

export default ViewQuestionPage;