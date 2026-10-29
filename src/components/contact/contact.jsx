import {
    WhatsAppOutlined,
    InstagramOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";

import "./contact.css";

function Contact() {
    return (
        <section className="contact" id="contact">
            <div className="contact-content">
                <span className="contact-label">Estamos aqui para você</span>

                <h2>Vamos conversar?</h2>

                <p>
                    Ficou interessada em alguma peça ou precisa de ajuda?
                    Entre em contato com a gente!
                </p>

                <a href="https://wa.me/5543996213920?text=Oi%21%20Vim%20pelo%20site%20da%20Gra%C3%A7a%20Divina%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20pe%C3%A7as%20dispon%C3%ADveis%21" target="_blank" rel="noopener noreferrer" className="contact-whatsapp"
                >
                    <WhatsAppOutlined />
                    Fale conosco
                </a>
            </div>

            <div className="contact-info">
                <a href="https://www.instagram.com/use.gracadivina/?hl=pt" target="_blank" rel="noopener noreferrer"
                    className="contact-item"
                >
                    <InstagramOutlined />
                    <div>
                        <h3>Instagram</h3>
                        <p>@use.gracadivina</p>
                    </div>
                </a>

                <a
                    href="https://wa.me/5543991135330?text=Oi%21%20Vim%20pelo%20site%20da%20Gra%C3%A7a%20Divina%20e%20gostaria%20de%20saber%20mais%20sobre%20as%20pe%C3%A7as%20dispon%C3%ADveis%21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item"
                >
                    <WhatsAppOutlined />
                    <div>
                        <h3>WhatsApp</h3>
                        <p>Entre em contato com a gente</p>
                    </div>
                </a>
            </div>
        </section>
    );
}

export default Contact;