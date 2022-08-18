import './start.scss'
import blob1 from '../../assets/blobs.png'
import blob2 from '../../assets/blobs(1).png'
import { Link } from 'react-router-dom'

export default function Start({ handleChange, gameSettings }) {
    const styles = {
        textDecoration: 'none',
    }
    return (
        <div className="start">
            <img className="blob blob1" src={blob1} alt="" />
            <img className="blob blob2" src={blob2} alt="" />
            <h2 className="title">Quizzical</h2>
            <form>
                <h4 className="subtitle">Choose your game settings</h4>
                <hr />
                <div className="selects">
                    <label>
                        Number of questions :
                        <select
                            name="numOfQuestions"
                            id="numOfQuestions"
                            value={gameSettings.numOfQuestions}
                            onChange={handleChange}
                        >
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </label>
                    <label>
                        Difficulty:
                        <select
                            name="difficulty"
                            id="difficulty"
                            value={gameSettings.difficulty}
                            onChange={handleChange}
                        >
                            <option value="random">Random</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                    <label>
                        Category:
                        <select
                            name="category"
                            id="category"
                            value={gameSettings.category}
                            onChange={handleChange}
                        >
                            <option value="Any Category">Any Category</option>
                            <option value="General Knowledge">
                                General Knowledge
                            </option>
                            <option value="Entertainment: Books">
                                Entertainment: Books
                            </option>
                            <option value="Entertainment: Film ">
                                Entertainment: Film
                            </option>
                            <option value="Entertainment: Music">
                                Entertainment: Music
                            </option>
                            <option value="Entertainment: Musicals and Theatres ">
                                Entertainment: Musicals &amp; Theatres
                            </option>
                            <option value="Entertainment: Television">
                                Entertainment: Television
                            </option>
                            <option value="Entertainment: Video Games">
                                Entertainment: Video Games
                            </option>
                            <option value="Entertainment: Board Games">
                                Entertainment: Board Games
                            </option>
                            <option value="Entertainment: Comics">
                                Entertainment: Comics
                            </option>
                            <option value="Entertainment: Japanese Anime and Manga">
                                Entertainment: Japanese Anime &amp; Manga
                            </option>
                            <option value="Entertainment: Cartoons and Animation">
                                Entertainment: Cartoons &amp; Animation
                            </option>
                            <option value="Science and Nature ">
                                Science &amp; Nature
                            </option>
                            <option value="Science: Computers">
                                Science: Computers
                            </option>
                            <option value="Science: Mathematics">
                                Science: Mathematics
                            </option>
                            <option value="Science: Gadgets">
                                Science: Gadgets
                            </option>
                            <option value="Mythology">Mythology</option>
                            <option value="Sports">Sports</option>
                            <option value="Geography">Geography</option>
                            <option value="History">History</option>
                            <option value="Politics">Politics</option>
                            <option value="Art">Art</option>
                            <option value="Celebrities">Celebrities</option>
                            <option value="Animals">Animals</option>
                            <option value="Vehicles">Vehicles</option>
                        </select>
                    </label>
                    <hr />
                </div>
            </form>
            <Link
                className="start-game-button"
                to="/gameplay"
                state={{ gameSettings }}
                style={styles}
            >
                Start quiz
            </Link>
        </div>
    )
}
