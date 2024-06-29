import React, { useEffect, useState } from 'react'
import { Delete_api, Update_api, get_api, post_api } from '../../api/api'
import { add_product, delete_product, get_product, update_product } from '../../constant'
import { FormControlLabel, Switch } from '@mui/material'

export const Manage = () => {

  const [productdata, setproductdata] = useState([])
  const [product, setproduct] = useState({})
  const [view, setview] = useState({})


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

  // post data
  let handle = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value })
  }

  let AddData = async () => {
    try {

      let result = await post_api(add_product, product)
      console.log(result.data);

      setproductdata([...productdata, result.data])

    } catch (err) {

      console.log(err, "err");

    }
  }

  // delete data
  let DeleteData = async (id) => {
    try {

      let result = await Delete_api(`${delete_product}/${id}`)
      console.log(result);

      setproductdata(productdata.filter((val) => val.id != result.data.id))

    } catch (err) {

      console.log(err, "err");

    }
  }


  // Update Data
  let ViewData = (val) => {

    console.log(val);
    setview(val)

  }

  let handleView = (e) => {

    setview({ ...view, [e.target.name]: e.target.value })

  }

  let UpdateData = async () => {

    try {

      let result = await Update_api(`${update_product}/${view.id}`, view)
      console.log(result);

      setproductdata(

        productdata.map((val, index) => (val.id == result.data.id ? { ...view } : val))

      )

    } catch (err) {

      console.log(err, "err");

    }

  }


  useEffect(() => {
    GetData()
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Available</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
                {productdata.map((val, index) => {
                  return (
                    <tr>
                      <th scope="row">{val.id}</th>
                      <td><img src={val.image} alt="" style={{ width: "50px" }} /></td>
                      <td>{val.name}</td>
                      <td>{val.price}</td>
                      <td>{val.desc}</td>
                      <td>{val.isActive == true ? <FormControlLabel control={<Switch defaultChecked />} />: <FormControlLabel control={<Switch/>} />}</td>
                      <td><button onClick={() => DeleteData(val.id)}>Delete</button></td>
                      <td><button type="button" onClick={() => ViewData(val)} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Update</button></td>
                    </tr>
                  )
                })}

              </tbody>
            </table>
          </div>

          <div className="col-md-4">
            <label>Image : </label>
            <input type="text" name='image' onChange={handle} />
            <label>Name : </label>
            <input type="text" name='name' onChange={handle} />
            <label>Price : </label>
            <input type="text" name='price' onChange={handle} />
            <label>Description : </label>
            <input type="text" name='desc' onChange={handle} />
            <button onClick={AddData}>Add Product</button>
          </div>
        </div>
      </div>

      {/* modal */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Update Product Data</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label>Image : </label>
                  <input type="text" name='image' value={view.image} onChange={handleView}/>
                </div>
                <div class="mb-3">
                  <label >Name : </label>
                  <input type="text" name='name' value={view.name} onChange={handleView}/>
                </div>
                <div class="mb-3">
                  <label >Price : </label>
                  <input type="text" name='price' value={view.price} onChange={handleView}/>
                </div>
                <div class="mb-3">
                  <label >Description : </label>
                  <input type="text" name='desc' value={view.desc} onChange={handleView}/>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" onClick={UpdateData}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Manage