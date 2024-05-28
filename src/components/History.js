import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import SideBar from "./sidebar/sidebar";
function History() {
    const [order, setOrder] = useState([]);
    const params = useParams();

    // async function getHistory() {
    //     const res = await axios.get(`http://localhost:8080/api/order/${params.id}`);
    //     setOrder(res.data);
    //     console.log(order);
    // }
    // useEffect(() => {
    //     getHistory();
    // }, [])
    return (
        <div style={{ height: '100vh' }}>

            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ boxShadow: " 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                    <div className="container-fluid">
                        <div className="navbar">
                            <a className="navbar-brand" href="/home">Agoda</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <ul class="nav nav-underline">
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" style={{ color: "black" }} href="/home">Về trang chủ</a>
                                </li>

                            </ul>

                        </div>
                    </div>
                </nav>
            </header>
            <body>
                <SideBar />
                <div className="container" style={{ marginTop: '2%' }}>
                    <h2>Danh sách nhà đang thuê</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Thời gian</th>
                                <th scope="col">Tên nhà</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {order.map(item => <tr>
                                <th scope="row">{item.timeStart}</th>
                                <td><Link to="/detail" style={{ textDecoration: "none", color: "black" }}>{item.idHouse.name}</Link></td>
                                <td>{item.total}</td>
                                <td>{item.idHouse.address}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button type="button" class="btn btn-danger">Hủy phòng</button>
                                </td>
                            </tr>)} */}

                            <tr>
                                <td>2024-04-03 đến 2024-04-05 </td>
                                <td>The Reverie Saigon</td>
                                <td>1.000.000 VND</td>
                                <td>Hồ Chí Minh</td>
                                <td>Chờ xác nhận </td>
                                <td><button className="btn btn-secondary">Hủy thuê </button></td>
                            </tr>

                            <tr>
                                <td>2024-05-10 đến 2024-05-15 </td>
                                <td>Vinpearl Luxury Landmark 81</td>
                                <td>2.500.000 VND</td>
                                <td>Hồ Chí Minh</td>
                                <td>Chờ xác nhận </td>
                                <td><button className="btn btn-secondary">Hủy thuê </button></td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </body>
            <div style={{ backgroundColor: "lightgray", bottom: "0", width: "100%", position: 'fixed' }}><Footer /></div>

        </div>
    )
}

export default History;