import ProductFormSeller from "../components/seller/ProductFormSeller";
import MyProducts from "./MyProducts";

import MonetizationCenter from "./MonetizationCenter";

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

            {
               section==="monetization" &&

              <MonetizationCenter />
            }

        </>

    );

}

export default SellerPanel;