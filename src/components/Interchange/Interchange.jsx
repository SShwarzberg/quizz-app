import './interchange.scss'

export default function Interchange(props) {
    return (
        <div className="interchange">
            <label htmlFor={props.answer}>
                <input
                    type="radio"
                    value={props.answer}
                    name={props.data.question}
                    onChange={props.handleChange}
                />
                {props.answer}
            </label>
            <br />
        </div>
    )
}
