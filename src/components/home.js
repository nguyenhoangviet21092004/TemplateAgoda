import axios from "axios";
import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    //     const [clothe, setClothe] = useState([]);
    //     async function deleteClothe(id){
    //         if(window.confirm("Bạn muốn xóa sản phẩm này chứ???")){
    //             const response = await axios.delete(`http://localhost:3001/products/${id}`)
    // if(response.data){
    //     await getList();
    // }else{
    //     console.error("Không thể xóa")
    // }
    //         }
    //     } 
    //     async function getList(){
    //         const response = await axios.get("http://localhost:3001/products")
    //                 console.log(response.data)
    //                 setClothe(response.data)

    //     };

    //     useEffect(() =>{
    //         getList()
    //     }, [] )

    return (
        <div>
            {/* <h1>Danh sách sản phẩm</h1>
            <Link to={"/create"} className="btn btn-primary">Thêm sản phẩm</Link>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Tồn kho</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {clothe.map(item => (
                    <>
                    <tr>
                    <td scope="row">{item.name}</td>
                    <td scope="row">{item.price}</td>
                    <td scope="row">{item.stock}</td>
                    <td><Link to={`/edit/${item.id}`} className="btn btn-info">Cập nhật</Link></td>
                    <td><Link className="btn btn-danger ml-2" onClick={()=> deleteClothe(item.id)}>Xóa</Link></td>
                    </tr>
                    </>
                ))}
            </tbody>
        </table> */}

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar">
                        <a className="navbar-brand" href="/home">Agola</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <ul class="nav nav-underline">
                                    <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="/home">Trang chủ</a>
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
                                <a className="nav-link" href="#" style={{ marginLeft: "75em" }}>Login</a>
                                <p style={{ marginTop: '0.40em' }}>|</p>
                                <a className="nav-link" href="#">Sign in</a>
                                <div className="dropdown">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Chức năng
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/create">Thêm</a></li>
                                        <li><a className="dropdown-item" href="/edit">Sửa</a></li>
                                        <li><a className="dropdown-item" href="#">Chi tiết</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="search" style={{ marginBottom: "10em", marginTop: "2em" }}>
                <div className="container" >
                    <form class="form-inline d-flex">
                        <input class="form-control my-sm-0" style={{ width: "1100.5px" }} type="search" placeholder="Tìm nhà cho thuê" aria-label="Search" />
                        <button class="btn btn-primary  my-2 my-sm-0" type="submit">Tìm kiếm</button>
                    </form>
                </div>
            </div>

            <div className="container">
                <div className="card mb-3" style={{ maxWidth: '1198.5px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="https://tienganhikun.com/upload/images/house_ikun.jpg" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Tên nhà</h5>
                                <p className="card-text"></p>
                                <p className="card-text"><small className="text-body-secondary">Mô tả</small></p>
                            </div>
                        </div>
                        <Link to={"/#"}><button class="btn btn-info" style={{ position: "fixed", left: "1430px" }}>Chi tiết</button></Link>
                        <Link to={"/#"}><button class="btn btn-success" style={{ position: "fixed", left: "1360px" }}>Thuê</button></Link>
                    </div>
                </div>
            </div>

        </div>


    )
}

