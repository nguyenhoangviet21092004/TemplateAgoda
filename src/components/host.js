import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import Footer from "./Footer";

function HostList() {
    const [houses, setHouses] = useState([]);
    // const [search, setSearch] = useState('');
    const idAccount = sessionStorage.getItem('account_id');
    const filteredData = houses.filter(house => house.account.id === parseInt(idAccount));

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPage, setItemsPage] = useState(10);
    const totalPages = Math.ceil(filteredData.length / itemsPage);

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPage;
        const endIndex = startIndex + itemsPage;
        const reversedData = [...filteredData].reverse();
        return reversedData.slice(startIndex, endIndex);
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
        const response = await axios.get(`http://localhost:8080/api/house`);
        setHouses(response.data)
        console.log(idAccount)
    };

    useEffect(() => {
        getList()
    }, [])
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="navbar">
                            <a className="navbar-brand" href="/home">Agoda</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <ul className="nav nav-underline">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" style={{color: "black"}} href="/home">Về
                                        trang chủ</a>
                                </li>

                            </ul>

                        </div>
                    </div>
                </nav>
            </header>
            <body>
            <div className="container">
                <Link to="/create">
                    <button type="button" className="btn btn-primary" style={{marginRight: "2%"}}>Đăng nhà
                    </button>
                </Link>
                <button type="button" className="btn btn-primary" style={{marginRight: "2%"}}>
                    <a className="dropdown-item" href={`/order/${idAccount}`}>Danh sách đăng kí thuê</a>
                </button>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên nhà</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Chức năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPageData.map((house, index) =>
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <a href={`detail/${house.id}`} style={{textDecoration: "none", color: "black"}}>
                                    {house.name}
                                </a>
                            </td>
                            <td>{house.address}</td>
                            <td>{formatCurrency(house.price)}</td>
                            <td>
                                <a href={`edit/${house.id}`} type="button" className="btn btn-secondary"
                                   style={{marginRight: "2%"}}>
                                    Sửa nhà
                                </a>
                                <button type="button" className="btn btn-danger">Xóa nhà</button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            </body>
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

        </div>
    )
}

export default HostList;