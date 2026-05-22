import { Link } from "react-router-dom";

export default function SellerBadge({ vendedor }) {
  if (!vendedor?.uid) return null;

  return (
    <Link to={`/seller/${vendedor.uid}`}>
      IR AL PERFIL
    </Link>
  );
}