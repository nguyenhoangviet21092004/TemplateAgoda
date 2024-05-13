import axios from "axios";
import {Button} from "bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Home() {
    const [houses, setHouses] = useState([]);
    const [search, setSearch] = useState('');

    // async function deleteClothe(id) {
    //     if (window.confirm("Bạn muốn xóa sản phẩm này chứ???")) {
    //         const response = await axios.delete(`http://localhost:3001/products/${id}`)
    //         if (response.data) {
    //             await getList();
    //         } else {
    //             console.error("Không thể xóa")
    //         }
    //     }
    // }

    async function getList() {
        const response = await axios.get(`http://localhost:8080/api/house?name=${search}`);
        console.log(response.data)
        setHouses(response.data)

    };

    useEffect(() => {
        getList()
    },[search])

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar">
                        <a className="navbar-brand" href="/home">Agoda</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <ul className="nav nav-underline">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/home">Trang chủ</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                                    </li>
                                </ul>
                                <a className="nav-link" href="#" style={{marginLeft: "75em"}}>Login</a>
                                <p style={{marginTop: '0.40em'}}>|</p>
                                <a className="nav-link" href="#">Sign in</a>
                                <div className="dropdown">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
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
            <div className="search" style={{marginBottom: "10em", marginTop: "2em"}}>
                <div className="container">
                    <input className="form-control my-sm-0" style={{width: "1100.5px"}} type="search"
                           placeholder="Tìm nhà cho thuê" aria-label="Search"
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            {houses.map(house => <div className="container">
                <div className="card mb-3" style={{maxWidth: '1198.5px'}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={process.env.PUBLIC_URL + '/' + (house.image?.nameImage || '')}
                                 className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{house.name}</h5>
                                <p className="card-text"></p>
                                <p className="card-text"><small className="text-body-secondary">Mô
                                    tả: {house.description}</small></p>
                            </div>
                        </div>
                        {/*<Link to={"/#"}>*/}
                        {/*    <button className="btn btn-info" style={{position: "fixed", left: "1430px"}}>Chi tiết*/}
                        {/*    </button>*/}
                        {/*</Link>*/}
                        {/*<Link to={"/#"}>*/}
                        {/*    <button className="btn btn-success" style={{position: "fixed", left: "1360px"}}>Thuê*/}
                        {/*    </button>*/}
                        {/*</Link>*/}
                    </div>
                </div>
            </div>)}


        </div>


    )
}

