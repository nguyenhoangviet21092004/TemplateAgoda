import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "./sidebar/sidebar";
import { da } from "date-fns/locale";
import moment from "moment";
import Footer from "./Footer";

function History() {
    const [order, setOrder] = useState([]);
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const role = sessionStorage.getItem('role');
    const idAccount = sessionStorage.getItem('account_id');
    const [today, setToday] = useState(new Date());
    const [day, setDay] = useState();
    // const moment = moment();

    console.log(order)

    async function getHistory() {
        const res = await axios.get(`http://localhost:8080/api/order/${idAccount}`);
        setOrder(res.data);
        setToday(new Date());
        console.log(order);
    }

    // function DateParser({ date }) {

    //     const moments = moment(date);
    //     setDay(moments.toDate().getDate());
    //     // const [year, month, day] = date.split('-');
    //     // console.log(day)
    //     // setDay(day);
    // }

    useEffect(() => {
        getHistory();
    }, [])

    async function cancelOrder(item) {
        const response = await axios.put(`http://localhost:8080/api/order/${item.id}`, {
            timeStart: item.timeStart,
            timeEnd: item.timeEnd,
            revenue: item.revenue,
            total: item.total,
            idHouse: item.house.id,
            idAccount: idAccount
        });
        if (response.data) {
            // Cập nhật lại danh sách đơn hàng sau khi hủy thành công
            getHistory();
        }
    }
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPage, setItemsPage] = useState(10);
    const totalPages = Math.ceil(order.length / itemsPage);

    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPage;
        const endIndex = startIndex + itemsPage;
        return order.slice(startIndex, endIndex);
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
    return (
        <div style={{ height: '100vh' }}>

            <div className="header" style={{ position: "sticky", top: "0", zIndex: "1000" }}>
                <nav className="navbar navbar-expand-lg bg-body-tertiary"
                    style={{ boxShadow: " 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                    <div className="container-fluid">
                        <div className="navbar w-100">
                            <a className="navbar-brand" href="/home">Agoda</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <ul class="nav nav-underline">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/home">Trang chủ</a>
                                </li>

                            </ul>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                <div className="navbar-nav ">
                                    <div className="dropdown" >
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
                                                        <li><a href={`/history/${idAccount}`} className="dropdown-item">Lịch
                                                            sử
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
                                                    <li><a href={`/history/${idAccount}`} class="dropdown-item">Lịch sử
                                                        đặt</a>
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
            </div>
            <body>
                <div className="container" style={{ marginTop: '2%' }}>
                    <h2>Danh sách nhà đang thuê</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Thời gian</th>
                                <th scope="col">Tên nhà</th>
                                <th scope="col">Số ngày thuê</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.reverse().map((item, i) =>
                                <tr>
                                    <td>{i+1}</td>
                                    <td scope="row">{item.timeStart} đến {item.timeEnd}</td>
                                    <td><Link to="/detail" style={{ textDecoration: "none", color: "black" }}>{item.house.name}</Link>
                                    </td>
                                    <td>{item.total}</td>
                                    <td>{formatCurrency(item.revenue)}</td>
                                    <td>{item.house.address}</td>
                                    <td>{item.status.name}</td>
                                    <td>
                                        {moment(item.timeStart).toDate().getDate() > today.getDate() && moment(item.timeStart).toDate().getDate() - today.getDate() >= 1 ? (<button type="button"
                                            onClick={() => cancelOrder(item)}
                                            className="btn btn-danger">Hủy thuê</button>) : moment(item.timeStart).toDate().getDate() < today.getDate() && item.status.name != "Đã thuê" ? (<div>
                                                <p>Quá hạn thuê</p>
                                            </div>) : <div>

                                        </div>
                                        }
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                <div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</a>
                            </li>{renderPageItems()}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </body>
        </div>
    )
}

export default History;