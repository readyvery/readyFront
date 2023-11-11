import "./ProgressBar.css";

const Progressbar = ({degree}) => {
    const percent = [0.1, 0.37, 0.685, 1];
    const statusList = ["주문요청", "주문확인", "제조완료", "픽업완료"];

    return(
        <div className="status-progressbar-wrapper">
            <div className="progressbar-wrapper">
                <div className="status-progressbar">
                    <span className="status-progressbar-circle"></span>
                    <span className="status-progressbar-circle"></span>
                    <span className="status-progressbar-circle"></span>
                    <span className="status-progressbar-circle"></span>
                </div>
                <div className="status-progressbar-degree-wrapper">
                    <div className="status-progressbar-degree" style={{ width: `calc(95% * ${percent[degree]})`}}></div>
                </div>
            </div>
            <div className="status-explain-wrapper">
            {statusList.map((e, i) => (
                <div key={i} className={`status-explain ${i <= degree ? 'selected' : ''}`}>
                    {e}
                </div>
            ))}
            </div>
        </div>
    )
}

export default Progressbar;
