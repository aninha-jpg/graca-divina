import { WhatsAppOutlined } from "@ant-design/icons";
import "./whatsAppButton.css";

function WhatsAppButton({texto}) {
    return (
        <a
            className="whatsappButton"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entrse em contato pelo WhatsApp"
        >
            <WhatsAppOutlined />
            {texto}
        </a>
    );
}

export default WhatsAppButton;