function DashboardSkeleton() {

    return (

        <div className="dashboard">

            <div className="skeleton skeleton-title"></div>

            <div className="stats-grid">

                {[1,2,3,4].map((item)=>(

                    <div
                        key={item}
                        className="stat-card"
                    >

                        <div className="skeleton skeleton-icon"></div>

                        <div className="skeleton skeleton-text"></div>

                        <div className="skeleton skeleton-number"></div>

                    </div>

                ))}

            </div>

            <div className="summary-box">

                <div className="skeleton skeleton-subtitle"></div>

                <div className="skeleton skeleton-line"></div>

                <div className="skeleton skeleton-line"></div>

                <div className="skeleton skeleton-line"></div>

            </div>

        </div>

    );

}

export default DashboardSkeleton;