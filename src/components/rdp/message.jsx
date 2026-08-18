import "../../style/components/rdp/message.css";

function Message({ derniereTransition }) {
    // Méthode pour obtenir le message selon la dernière transition exécutée
    const getMessageTransition = (code) => {
        switch (code) {
            case "T1":
                return "T1 : Un client s'installe à la caisse";
            case "T2":
                return "T2 : Payer et encaisser le client";
            case "T3":
                return "T3 : Bloquer la caisse (problème décelé)";
            case "T4":
                return "T4 : Commencer l'intervention d'un agent";
            case "T5":
                return "T5 : Valider l'intervention et payer le client";
            case "T6":
                return "T6 : Le client sort du magasin";
            default:
                return "Debut du processus ";
        }
    };

    return (
        <div className="message">
            <h1>{getMessageTransition(derniereTransition)}</h1>
        </div>
    );
}

export default Message;