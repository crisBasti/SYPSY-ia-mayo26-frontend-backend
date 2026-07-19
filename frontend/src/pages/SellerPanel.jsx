import ProductFormSeller from "../components/seller/ProductFormSeller";
import MyProducts from "./MyProducts";

function SellerPanel({ section }) {

    return (

        <>

            {

                section === "publish" &&

                <ProductFormSeller />

            }

            {

                section === "products" &&

                <MyProducts />

            }

        </>

    );

}

export default SellerPanel;