import { WhatsAppOutlined } from "@ant-design/icons";
import "./whatsAppButton.css";

function WhatsAppButton({texto}) {
    return (
        <a
            className="whatsappButton"
            href="https://wa.me/5543991135330"
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