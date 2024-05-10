import axios from "axios";
import { Button } from "bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

function Create() {

    // const history = useNavigate();
    // const [name, setName] = useState([]);
    // const [price, setPrice] = useState([]);
    // const [stock, setStock] = useState([]);
    // const [description, setDescription] = useState([]);

    // async function createClothe(e) {
    //     e.preventDefault()
    //     const response = await axios.post("http://localhost:3001/products",
    //         {
    //             name: name,
    //             price: price,
    //             stock: stock,
    //             description: description
    //         }
    //     );
    //     if (response.data) {
    //         history('/home');
    // }
    // }
    return (
        // <div className="container">
        //     <h1>Them san pham</h1>
        //     <form onSubmit={createClothe}>
        //         <div class="mb-3">
        //             <label for="name" class="form-label">Ten san pham</label>
        //             <input type="text" class="form-control" id="name" onChange={(e) => setName(e.target.value)} />
        //         </div>
        //         <div class="mb-3">
        //             <label for="price" class="form-label">Gia</label>
        //             <input type="number" class="form-control" id="price" onChange={(e) => setPrice(e.target.value)} />
        //         </div>
        //         <div class="mb-3">
        //             <label for="stock" class="form-label">Ton kho</label>
        //             <input type="text" class="form-control" id="stock" onChange={(e) => setStock(e.target.value)} />
        //         </div>
        //         <div class="mb-3">
        //             <label for="description" class="form-label">Mo ta</label>
        //             <input type="text" class="form-control" id="desciption" onChange={(e) => setDescription(e.target.value)} />
        //         </div>
        //         <button type="submit" class="btn btn-primary">Submit</button>
        //     </form>
        // </div>
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar">
                        <a className="navbar-brand" href="/home"    >Agola</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <ul class="nav nav-underline">
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/home">Trang chủ</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Link</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Link</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container w-50" style={{ alignContent: "center" }}>
                <form className="row g-3" >
                    <div className="col-md">
                        <label htmlFor="inputName" className="form-label">Tên nhà</label>
                        <input type="text" className="form-control" id="inputName" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Số phòng</span>
                        <input type="number" aria-label="Bedroom" class="form-control" placeholder="Phòng ngủ" />
                        <input type="number" aria-label="Bathroom" class="form-control" placeholder="Phòng tắm"/>
                    </div>
                    <div class="mb-3">
                        <label for="formFileMultiple" class="form-label">Thêm ảnh</label>
                        <input class="form-control" type="file" id="formFileMultiple" multiple />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Giá</span>
                        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                        <span className="input-group-text">.00</span>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                        <label for="floatingTextarea2">Mô tả</label>
                    </div>
                    <div>
                        <button style={{ float: "right" }} type="button" class="btn btn-primary col-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Thêm phòng
                        </button>
                    </div>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm phòng</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="row g-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="floatingInputGrid" placeholder="Tên phòng" />
                                            <label htmlFor="floatingInputGrid">Tên phòng</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" id="floatingSelectGrid">
                                                <option selected>Loại phòng</option>
                                                <option value={1}>Đơn</option>
                                                <option value={2}>Vip</option>
                                                <option value={3}>Tổng thống</option>
                                            </select>
                                            <label htmlFor="floatingSelectGrid">Chọn loại phòng</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                    <button type="button" class="btn btn-primary">Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-outline-primary">Thêm nhà</button>
                    </div>
                </form>

            </div>


        </div>
    )

}


export default Create;