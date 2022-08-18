import React from 'react'
import './gameplayPage.scss'
import blob1 from '../../assets/blobs.png'
import blob2 from '../../assets/blobs(1).png'
import { nanoid } from 'nanoid'
import Interchange from '../Interchange/Interchange'
import { convert } from 'html-to-text'
import { useLocation } from 'react-router-dom'

export default function Gameplay() {
    const location = useLocation()
    const numOfQuestions = location.state.gameSettings.numOfQuestions
    const difficulty = location.state.gameSettings.difficulty
    const category = location.state.gameSettings.category

    const [trivia, setTrivia] = React.useState([{}])
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(false)

    function getDataUrl() {
        let number = ''
        if (category === 'Any Category') {
            number = ''
        } else if (category === 'General Knowledge') {
            number = 9
        } else if (category === 'Entertainment: Books') {
            number = 10
        } else if (category === 'Entertainment: Film') {
            number = 11
        } else if (category === 'Entertainment: Music') {
            number = 12
        } else if (category === 'Entertainment: Musicals and Theatres') {
            number = 13
        } else if (category === 'Entertainment: Television') {
            number = 14
        } else if (category === 'Entertainment: Video Games') {
            number = 15
        } else if (category === 'Entertainment: Board Games') {
            number = 16
        } else if (category === 'Science and Nature') {
            number = 17
        } else if (category === 'Science: Computers') {
            number = 18
        } else if (category === 'Science: Mathematics') {
            number = 19
        } else if (category === 'Mythology') {
            number = 20
        } else if (category === 'Sports') {
            number = 21
        } else if (category === 'Geography') {
            number = 22
        } else if (category === 'History') {
            number = 23
        } else if (category === 'Politics') {
            number = 24
        } else if (category === 'Art') {
            number = 25
        } else if (category === 'Celebrities') {
            number = 26
        } else if (category === 'Animals') {
            number = 27
        } else if (category === 'Vehicles') {
            number = 28
        } else if (category === 'Entertainment: Comics') {
            number = 29
        } else if (category === 'Science: Gadgets') {
            number = 30
        } else if (category === 'Entertainment: Japanese Anime and Manga') {
            number = 31
        } else if (category === 'Entertainment: Cartoon and Animations') {
            number = 32
        }

        if (difficulty === 'random') {
            return `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${
                number !== undefined && number
            }&&type=multiple`
        } else if (difficulty !== 'random') {
            return `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${
                number !== undefined && number
            }&difficulty=${difficulty}&type=multiple`
        }
    }

    function getTrivia() {
        fetch(getDataUrl())
            .then((res) => res.json())
            .then((data) => {
                console.log(
                    data.results.map((objects) => {
                        return objects.difficulty
                    })
                )
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
                ? localStorage.setItem(
                      'total-gp',
                      JSON.stringify(numOfQuestions)
                  )
                : localStorage.setItem(
                      'total-gp',
                      JSON.parse(totalQuestionsAnswered) +
                          JSON.parse(numOfQuestions)
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
                questions answered all time
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
