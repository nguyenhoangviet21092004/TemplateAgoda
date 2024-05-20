import axios from "axios";
import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
        const [houses, setHouses] = useState([]);
        const [search, setSearch] = useState('');

        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPage, setItemsPage] = useState(5);
        const totalPages = Math.ceil(houses.length / itemsPage);

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
            setHouses(response.data)

        };

        useEffect(() => {
            getList()
        }, [search])


        return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="navbar w-100">
                            <a className="navbar-brand" href="/home">Agoda</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <ul className="nav nav-underline">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/home">Trang chủ</a>
                                </li>
                            </ul>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                <div className="navbar-nav "  >
                                    <a className="nav-link" href="#" style={{ Left: "420%" }}>Login</a>
                                    <p style={{ marginTop: '0.40em' }}>|</p>
                                    <a className="nav-link" href="#">Sign in</a>
                                    <div className="dropdown">
                                        <div className="btn-group dropstart">
                                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Chức năng
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="/host">Chủ nhà</a></li>
                                                <li><a className="dropdown-item" href="#">Chi tiết tài khoản</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="search" style={{ marginBottom: "10em", marginTop: "2em" }}>
                <div className="container">
                    <form className="form-inline d-flex" >
                        <input className="form-control my-sm-0" style={{ width: "1198px" }} type="search"
                               value={search}
                               onChange={(e) => setSearch(e.target.value)}
                               placeholder="Tìm nhà cho thuê" aria-label="Search" />
                        <button className="btn btn-danger  my-2 my-sm-0" type="submit">Tìm kiếm</button>
                    </form>
                </div>
            </div>

            <div className="container" style={{ borderTop: "1px solid lightgray" }} >
                <h2>Danh sách các nhà đang cho thuê</h2>
                {currentPageData.map(house => <div className="container">

                <div className="card mb-3" style={{ maxWidth: '100%' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={process.env.PUBLIC_URL + '/img/' + (house.images[0]?.nameImage || '')} alt="..." />
                        </div>
                        <div className="col-md-8">
                            <Link to={`/detail/${house.id}`} style={{ textDecoration: "none", color: "black" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{house.name}</h5>
                                    <p className="card-text">{house.price}(vnd)</p>
                                    <p className="card-text"><small className="text-body-secondary">{house.description}</small></p>
                                </div>
                            </Link>
                        </div>
                        <div className="card-footer text-body-secondary" style={{ display: "flex" }}>
                            <a href="/hostInfo" style={{ textDecoration: "none", color: "black" }}>{house.account.name}</a>
                            <p className="btn btn-outline-info" style={{ marginLeft: "79%", color: "black" }}>{house.status.name}</p>
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
            <footer>

            </footer>
        </div>

        )
}