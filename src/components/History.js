import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Footer from "./Footer";
import SideBar from "./sidebar/sidebar";

function History() {
    const [order, setOrder] = useState([]);
    const idAccount = sessionStorage.getItem('account_id');

    console.log(order)

    async function getHistory() {
        const res = await axios.get(`http://localhost:8080/api/order/${idAccount}`);
        setOrder(res.data);
        console.log(order);
    }

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
            idAccount : idAccount
        });
        if (response.data) {
            // Cập nhật lại danh sách đơn hàng sau khi hủy thành công
            getHistory();
        }
    }
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    }
    return (
        <div style={{height: '100vh'}}>

            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary"
                     style={{boxShadow: " 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                    <div className="container-fluid">
                        <div className="navbar">
                            <a className="navbar-brand" href="/home">Agoda</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <ul class="nav nav-underline">
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" style={{color: "black"}} href="/home">Về
                                        trang chủ</a>
                                </li>

                            </ul>

                        </div>
                    </div>
                </nav>
            </header>
            <body>
            <SideBar/>
            <div className="container" style={{marginTop: '2%'}}>
                <h2>Danh sách nhà đang thuê</h2>
                <table class="table">
                    <thead>
                    <tr>
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
                    {order.reverse().map(item => <tr>
                        <td scope="row">{item.timeStart} đến {item.timeEnd}</td>
                        <td><Link to="/detail" style={{textDecoration: "none", color: "black"}}>{item.house.name}</Link>
                        </td>
                        <td>{item.total}</td>
                        <td>{formatCurrency(item.revenue)}</td>
                        <td>{item.house.address}</td>
                        <td>{item.status.name}</td>
                        <td>
                            {item.total > 1 && item.status.id !== 6 && item.status.id !== 5 && item.status.id !== 2  && (
                                <button type="button"
                                        onClick={() => cancelOrder(item)}
                                        className="btn btn-danger">Hủy thuê</button>
                            )}
                        </td>
                    </tr>)}

                    </tbody>
                </table>
            </div>

            </body>
        </div>
    )
}

export default History;