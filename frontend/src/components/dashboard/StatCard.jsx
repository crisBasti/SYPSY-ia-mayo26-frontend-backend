function StatCard({
    title,
    value,
    icon,
    subtitle = ""
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

                {
                    subtitle && (
                        <span className="stat-subtitle">
                            {subtitle}
                        </span>
                    )
                }

            </div>

        </div>

    );

}

export default StatCard;