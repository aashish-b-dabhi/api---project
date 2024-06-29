import { useEffect, useState } from "react";
import { get_api } from "../../api/api";
import { get_product } from "../../constant";

const Product = () => {

    const [productdata, setproductdata] = useState([])

    // get Data
    let GetData = async () => {
        try {

            let result = await get_api(get_product)
            console.log(result);

            setproductdata(result.data)

        } catch (err) {

            console.log(err, "err");

        }
    }

    useEffect(() => {
        GetData()
    }, [])

    return (

        <div className="container my-5">
            <div className="row">
                {productdata.map((val, index) => {

                    return (
                        <>
                            <div className="col-md-3 my-3">
                                <div class="card">
                                    <img style={{ width: "200px", padding: "20px" }} src={val.image} class="mx-auto" alt="Image" />
                                    <div class="card-body">
                                        <h5 class="card-title d-flex justify-content-between">{val.name}<span>{val.price}</span></h5>
                                        <p class="card-text">{val.desc}</p>
                                        <button class="btn btn-primary" style={{marginRight:"20px"}}>View Product</button>
                                        <button class="btn btn-primary">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>

    )

}
export default Product