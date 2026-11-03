import { WhatsAppOutlined } from "@ant-design/icons";
import "./whatsAppButton.css";

function WhatsAppButton({texto}) {
    const mensagem = "Olá! Vim pelo site e gostaria de saber mais sobre as T-shirts.";
    return (
        <a
            className="whatsappButton"
            href={`https://wa.me/5543991135330?text=${encodeURIComponent(mensagem)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entre em contato pelo WhatsApp"
        >
            <WhatsAppOutlined />
            {texto}
        </a>
    );
}

export default WhatsAppButton;