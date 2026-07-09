function StatCard({
    title,
    value,
    icon
}) {

    return (

        <div className="stat-card">

            <div className="stat-icon">

                {icon}

            </div>

            <div className="stat-info">

                <span className="stat-title">
                    {title}
                </span>

                <span className="value">
                    {value}
                </span>

            </div>

        </div>

    );

}

export default StatCard;