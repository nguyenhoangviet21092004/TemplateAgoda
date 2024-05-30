import axios from "axios";
import {Button} from "bootstrap";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Footer from "./Footer";

export default function Home() {
    const [houses, setHouses] = useState([]);
    const [search, setSearch] = useState('');
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const role = sessionStorage.getItem('role');
    const idAccount = sessionStorage.getItem('account_id');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPage, setItemsPage] = useState(5);
    const totalPages = Math.ceil(houses.length / itemsPage);
    const [price, setPrice] = useState(0);


    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    }

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPage;
        const endIndex = startIndex + itemsPage;
        return houses.slice(startIndex, endIndex);
    };
    const currentPageData = getCurrentPageData();

    const renderPageItems = () => {
        const pageItems = [];
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === currentPage ? 'active' : '';

            pageItems.push(
                <li className={`page-item ${isActive}`} key={i}>
                    <a className="page-link" onClick={() => currentPage + 1}>{i}</a>
                </li>
            );
        }
        return pageItems;
    };

    async function getList() {
        const response = await axios.get(`http://localhost:8080/api/house?name=${search}`);
        // console.log(response.data)
        setHouses(response.data);

    }

    useEffect(() => {
        getList()
    }, [search])


    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary"
                     style={{boxShadow: " 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                    <div className="container-fluid">
                        <div className="navbar w-100">
                            <a className="navbar-brand" href="/home">Agoda</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <ul class="nav nav-underline">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/home">Trang chủ</a>
                                </li>

                            </ul>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                <div className="navbar-nav ">

                                    {/* <a className="nav-link" href="#" style={{ Left: "420%" }}>Login</a>
                                    <p style={{ marginTop: '0.40em' }}>|</p>
                                    <a className="nav-link" href="#">Sign in</a> */}

                                    <div className="dropdown">

                                        {role === 'admin' || role === 'host' ? (
                                            <div className="btn-group dropstart">
                                                <div>

                                                    <button type="button" className="btn btn-secondary dropdown-toggle"
                                                            data-bs-toggle="dropdown" aria-expanded="false">
                                                        {username}
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item" href="/host">Chủ nhà</a></li>
                                                        <li><a className="dropdown-item" href="/create">Đăng nhà</a>
                                                        </li>
                                                        <li><a href={`/history/3`} className="dropdown-item">Lịch sử
                                                            đặt</a></li>
                                                        <li><a className="dropdown-item" href="#">Chi tiết tài khoản</a>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        ) : (
                                            <div>
                                                <button type="button" className="btn btn-secondary dropdown-toggle"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                    {username}
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a href={`/history/3`} class="dropdown-item">Lịch sử đặt</a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="#">Chi tiết tài khoản</a></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

            </header>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e874107714719.5fad336f21e5b.png"
                            className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/945451107714719.5fad336f20b9c.png"
                            className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/873875107714719.5fad336f1fe85.png"
                            className="d-block w-100" alt="..."/>
                    </div>
                </div>
            </div>

            <div className="search" style={{marginBottom: "5em", marginTop: "2em"}}>
                <div className="container">
                    <form className="form-inline d-flex">

                        <input className="form-control my-sm-0"
                               style={{width: "400px", borderRadius: '20px', marginRight: "1%", borderColor: 'black'}}
                               type="search" placeholder="Tìm nhà cho thuê" aria-label="Search"/>
                        <select className="form-select" aria-label="Default select example"
                                style={{width: "160px", marginRight: '0.5%', borderColor: 'black'}}>
                            <option selected>Số phòng ngủ</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select className="form-select" aria-label="Default select example"
                                style={{width: "160px", borderColor: 'black'}}>
                            <option selected>Số phòng tắm</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select className="form-select" aria-label="Default select example"
                                style={{width: "160px", marginLeft: '0.5%', borderColor: 'black'}}>
                            <option selected>Giá</option>
                            <option value="1">1 - 3 triệu</option>
                            <option value="2">2 - 5 triệu</option>
                            <option value="3">5 - 7 triệu</option>
                            <option value="4">7 - 9 triệu</option>
                        </select>
                        <select className="form-select" aria-label="Default select example"
                                style={{width: "160px", marginLeft: '0.5%', borderColor: 'black'}}>
                            <option selected>Trạng thái</option>
                            <option value="1">Còn trống</option>
                            <option value="2">Đã cho thuê</option>
                            <option value="3">Đang nâng cấp</option>
                        </select>
                        <div style={{marginLeft: '4%'}}>
                            <button className="btn btn-danger  my-2 my-sm-0" type="submit" style={{left: "20%"}}>Tìm
                                kiếm
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container" style={{borderTop: "1px solid lightgray"}}>
                <h2>Danh sách các nhà đang cho thuê</h2>
                {currentPageData.map(house =>
                    <div className="container">
                        <div className="card mb-3" style={{maxWidth: '100%'}}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img
                                        src={process.env.PUBLIC_URL + '/img/' + (house.images[0]?.nameImage || '')}
                                        alt="..."/>
                                </div>
                                <div className="col-md-8">
                                    <Link to={`/detail/${house.id}`}
                                          style={{textDecoration: "none", color: "black"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">{house.address}</h5>
                                            <p className="card-text">{formatCurrency(house.price)}</p>
                                            <p className="card-text"><small
                                                className="text-body-secondary">{house.description}</small></p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="card-footer text-body-secondary" style={{display: "flex"}}>
                                    <a href="/hostInfo"
                                       style={{textDecoration: "none", color: "black"}}>{house.account.name}</a>
                                    <p className="btn btn-outline-info"
                                       style={{marginLeft: "79%", color: "black"}}>{house.status.name}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</a>
                        </li>
                        {renderPageItems()}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a>
                        </li>

                    </ul>
                </nav>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>

    )
}
