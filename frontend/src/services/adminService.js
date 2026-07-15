export const getDashboardStatsService = async (token) => {

    const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    if (!response.ok) {

        throw new Error("Error obteniendo Dashboard");

    }

    return await response.json();

};