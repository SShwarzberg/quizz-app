import React from 'react'
import './gameplayPage.scss'
import blob1 from '../../assets/blobs.png'
import blob2 from '../../assets/blobs(1).png'
import { nanoid } from 'nanoid'
import Interchange from '../Interchange/Interchange'
import { convert } from 'html-to-text'

export default function Gameplay() {
    const [trivia, setTrivia] = React.useState([{}])
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(false)
    const [totlaCorrectAnswers, setTotalCorrectAnswers] = React.useState({
        correct: 0,
        incorrect: 0,
    })

    function getTrivia() {
        fetch('https://opentdb.com/api.php?amount=4&type=multiple')
            .then((res) => res.json())
            .then((data) => {
                setTrivia((prevData) => {
                    return data.results.map((result, i) => {
                        let answers = result.incorrect_answers
                        answers.push(result.correct_answer)
                        answers.sort(() => Math.random() - 0.5)
                        let newData = Object.assign({}, result)
                        newData = {
                            question: result.question,
                            answers: answers,
                            selectedAnswer: '',
                            correct_answer: result.correct_answer,
                            id: nanoid(),
                        }
                        return newData
                    })
                })
            })
    }
    React.useEffect(() => {
        getTrivia()
    }, [])

    function handleChange(e) {
        const { name, value } = e.target
        setTrivia((prevData) => {
            return prevData.map((data) => {
                if (data.question === name) {
                    let newData = Object.assign({}, data)
                    newData = {
                        ...newData,
                        selectedAnswer: value,
                    }
                    return newData
                } else return data
            })
        })
    }

    const interchange = trivia.map((data, i) => {
        return (
            <>
                <legend key={data.id}>{convert(data.question)}</legend>
                {data.answers &&
                    data.answers.map((answer, index) => {
                        return (
                            <Interchange
                                key={answer}
                                answer={convert(answer)}
                                data={data}
                                handleChange={(e) =>
                                    handleChange(e, data.question)
                                }
                            />
                        )
                    })}
                <br />
                <hr style={{ height: '0.1px' }} />
            </>
        )
    })

    function handleSubmit(e) {
        e.preventDefault()

        let selectedAnswers = []
        trivia.map((question) => selectedAnswers.push(question.selectedAnswer))
        const answeredAllQuestions = selectedAnswers.every(
            (answer) => answer !== ''
        )

        if (gameOver && answeredAllQuestions) {
            getTrivia(), setGameOver(!gameOver), setCorrectAnswers(0)
        } else if (gameOver === false && answeredAllQuestions) {
            let correctAnswersArr = []
            trivia.map((question) => {
                if (question.correct_answer === question.selectedAnswer) {
                    correctAnswersArr.push('correct')
                } else {
                    return
                }
            })
            setCorrectAnswers(correctAnswersArr.length)
            let totalWins = localStorage.getItem('correct-answers')
            totalWins === null
                ? localStorage.setItem(
                      'correct-answers',
                      correctAnswersArr.length
                  )
                : localStorage.setItem(
                      'correct-answers',
                      JSON.parse(totalWins) + correctAnswersArr.length
                  )
            let totalQuestionsAnswered = localStorage.getItem('total-gp')
            totalQuestionsAnswered === null
                ? localStorage.setItem('total-gp', 4)
                : localStorage.setItem(
                      'total-gp',
                      JSON.parse(totalQuestionsAnswered) + 4
                  )
            setGameOver(true)
        }
    }

    let gameOverText
    if (correctAnswers === 1) {
        gameOverText = 'You got ' + correctAnswers + ' answer correct'
    } else {
        gameOverText = 'You got ' + correctAnswers + ' answers correct'
    }

    const totalWins = localStorage.getItem('correct-answers')
    const totalGP = localStorage.getItem('total-gp')

    return (
        <div className="gameplay">
            <div className="total-wins">
                You have gotten a total of {totalWins !== null ? totalWins : 0}{' '}
                answers correct out of {totalGP !== null ? totalGP : 0}{' '}
                questions answered
            </div>
            <img className="blob blob1" src={blob1} alt="" />
            <img className="blob blob2" src={blob2} alt="" />
            <form onSubmit={handleSubmit}>
                <fieldset>{interchange}</fieldset>
                <button className="submit">
                    {!gameOver ? 'Submit' : 'Play again'}
                </button>
            </form>
            {gameOver && correctAnswers !== undefined && gameOverText}
        </div>
    )
}
