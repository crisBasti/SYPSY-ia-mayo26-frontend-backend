import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function ProductsChart({
  products,
  dataKey,
  title,
  color
}) {

  const data = products.map(product => ({
    nombre: product.nombre,
    valor: product[dataKey]
  }));

  

  return (

    <div
      style={{
        width: "100%",
        height: 350,
        marginTop: 40
      }}
    >

      <h2>{title}</h2>

      <ResponsiveContainer>

        <BarChart
          data={data}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="nombre"
            angle={-45}
            textAnchor="end"
            interval={2}
            height={100}
          />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="valor"
            maxBarSize={5}
            fill={color}
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ProductsChart;