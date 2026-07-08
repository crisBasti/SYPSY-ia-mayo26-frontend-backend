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

            <h3>{title}</h3>

            <h2>{value}</h2>

        </div>

    );

}

export default StatCard;