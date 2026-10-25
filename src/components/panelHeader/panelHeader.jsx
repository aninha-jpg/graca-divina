import "./panelHeader.css";

function PanelHeader() {
    return (
        <header className="panel-header">
            <div>
                <p className="panel-eyebrow">GRAÇA DIVINA</p>
                <h1>Painel administrativo</h1>
                <p className="panel-subtitle">
                    Gerencie seus produtos e estoque.
                </p>
            </div>
        </header>
    );
}

export default PanelHeader;