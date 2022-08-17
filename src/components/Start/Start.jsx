import './start.scss'
import blob1 from '../../assets/blobs.png'
import blob2 from '../../assets/blobs(1).png'
import { Link } from 'react-router-dom'

export default function Start({ startGame }) {
    const styles = {
        textDecoration: 'none',
        color: 'inherit',
    }
    return (
        <div className="start">
            <img className="blob blob1" src={blob1} alt="" />
            <img className="blob blob2" src={blob2} alt="" />
            <h2 className="title">Quizzical</h2>
            <h4 className="subtitle">Some description if needed</h4>
            <Link to="/gameplay" style={styles}>
                <button onClick={startGame}>Start quiz</button>
            </Link>
        </div>
    )
}
