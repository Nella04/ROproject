import "../../style/components/rdp/message.css";

function Message({ message, somme }) {
    return (
        <div className="message">
            <h1>{message}</h1>

            <p>
                Somme de la matrice : <strong>{somme}</strong>
            </p>
        </div>
    );
}

export default Message;