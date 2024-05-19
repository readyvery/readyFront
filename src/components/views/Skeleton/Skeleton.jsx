import "./Skeleton.css";

export const Skeleton = ({size}) => {
    return (
        <div className={`skeleton-item ${size === 'sm' && size}`}>
            {size === "sm" ? (
                <div className={`skeleton-info element ${size === 'sm' && size}`}>
                    <span className={`skeleton-email element ${size === 'sm' && size}`}></span>
                </div>
            ) : (
                <div className="skeleton-info element">
                    <div className="skeleton-name"></div>
                    <div className="skeleton-email"></div>
                </div>
            )}
        </div>
    )
}