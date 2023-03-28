

const Friend = (props) => {
    const {text, uid } = props.message;
    return (
        <div>
            <h3>{text}</h3>
        </div>
    )
}

export default Friend;