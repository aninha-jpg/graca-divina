import { useNavigate } from "react-router-dom";
import "./notFound.css";

function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="notFound">
            <div className="notFoundContent">
                <span className="notFoundLabel">GRAÇA DIVINA</span>

                <h1>404</h1>

                <div className="notFoundDivider">
                    <span></span>
                    <span className="notFoundHeart">♡</span>
                    <span></span>
                </div>

                <h2>Ops! Página não encontrada.</h2>

                <p>
                    Parece que este caminho não existe.
                    Mas não se preocupe, vamos encontrar o caminho de volta.
                </p>

                <button onClick={() => navigate("/")}>
                    Voltar para o início
                </button>
            </div>
        </main>
    );
}

export default NotFound;