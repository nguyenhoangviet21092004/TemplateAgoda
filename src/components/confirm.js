import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {set} from "date-fns";

function Confirm() {

    const navigate = useNavigate();

    const [orders, setOrder] = useState([]);
    const [getid, setid] = useState('');

    const idAccount = sessionStorage.getItem('account_id');

    const [isHidden, setIsHidden] = useState(false)
    // const [search, setSearch] = useState('');


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPage, setItemsPage] = useState(10);
    const totalPages = Math.ceil(orders.length / itemsPage);

    const params = useParams();
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPage;
        const endIndex = startIndex + itemsPage;
        return orders.slice(startIndex, endIndex);
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


    async function getOrder() {
        const res = await axios.get(`http://localhost:8080/api/order/host/${idAccount}`);
        setOrder(res.data);
    };


    useEffect(() => {
        getOrder();

    }, [])

    async function yes(order) {
        const response = await axios.put(`http://localhost:8080/api/order/yes/${idAccount}`, {
            total: "1",
            id: order.id
        });
        getOrder()
    }

    async function no(order) {
        const response = await axios.put(`http://localhost:8080/api/order/yes/${idAccount}`, {
            total: "2",
            id: order.id
        });
        getOrder()
    }

    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
    }

    return (
        <>
            <div>
                <header>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <div className="navbar">
                                <a className="navbar-brand" href="/home">Agoda</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"/></button>
                                <ul className="nav nav-underline">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" style={{color: "black"}}
                                           href="/home">Về
                                            trang chủ</a>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </nav>
                </header>
                <body>
                <div className="container">
                    <Link to="/host">
                        <button type="button" className="btn btn-primary" style={{marginRight: "2%"}}>Quay lại
                        </button>
                    </Link>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên nhà</th>
                            <th>Địa chỉ</th>
                            <th>Giá</th>
                            <th>Chức năng</th>
                        </tr>
                        </thead>
                        {

                            orders.reverse().map(order =>
                                <tbody>


                                {order.status.id === 3 &&
                                    <tr>
                                        <td scope="row">{order.id}</td>
                                        <td><a href={`detail/${order.house.id}`} style={{
                                            textDecoration: "none",
                                            color: "black"
                                        }}>{order.house.name}</a>
                                        </td>
                                        <td>{order.house.address}</td>
                                        <td>{formatCurrency(order.revenue)} </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => yes(order)}>Chấp
                                                nhận
                                            </button>

                                            <button className="btn btn-danger" onClick={() => no(order)}>Từ
                                                chối
                                            </button>

                                        </td>
                                    </tr>
                                }

                                </tbody>
                            )
                        }
                    </table>
                </div>
                </body>
                {/*<div>*/}
                {/*    <nav aria-label="Page navigation example">*/}
                {/*        <ul className="pagination justify-content-center">*/}
                {/*            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>*/}
                {/*                <a className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</a>*/}
                {/*            </li>*/}
                {/*            {renderPageItems()}*/}
                {/*            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>*/}
                {/*                <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</a>*/}
                {/*            </li>*/}

                {/*        </ul>*/}
                {/*    </nav>*/}
                {/*</div>*/}

            </div>

        </>
    )
}

export default Confirm;