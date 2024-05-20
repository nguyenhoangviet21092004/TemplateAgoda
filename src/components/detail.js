import "../css/detail.css"
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
function Detail() {

    const [house, setHouse] = useState({});

    const params = useParams();

    async function getHouse() {
        const res = await axios.get(`http://localhost:8080/api/house/${params.id}`)
        setHouse(res.data);
    }

    useEffect(() => {
        getHouse()
    }, []);
    const handleViewDirections = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(house.address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="navbar">
                            <a className="navbar-brand" href="/home">Agoda</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <ul className="nav nav-underline">
                                        <li className="nav-item">
                                            <a className="nav-link" aria-current="page" style={{color: "black"}}
                                               href="/home">Về trang chủ</a>
                                        </li>

                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div class="blog-single gray-bg">
                <div class="container">
                    <div>
                        <div className="container">
                            <article class="article">
                                <div class="article-img">
                                    <img src="https://tienganhikun.com/upload/images/house_ikun.jpg" title="" alt="" />
                                </div>
                                <div class="article-title">
                                    <h2>{house.name}</h2>
                                </div>
                                <h2>{house.price}(VND)</h2>
                                <div class="article-content">
                                    <h5>Địa chỉ: {house.address} </h5><a onClick={handleViewDirections}>Xem chỉ
                                    dẫn</a>
                                    <h5>Số phòng ngủ: {house.numberOfBedRoom}</h5>
                                    <h5>Số phòng tắm: {house.numberOfBathRoom}</h5>
                                </div>
                            </article>
                            <div class="contact-form article-comment">
                                <h4>Mô tả: </h4>
                                <h5>{house.description}</h5>
                                <form id="contact-form" method="POST">
                                    <div class="row">

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <textarea name="message" id="message"
                                                          placeholder="Để lại nhật xét của bạn" rows="4"
                                                          class="form-control"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-12" style={{marginTop: "1%"}}>
                                            <button type="button" class="btn btn-outline-success">Đăng</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <div class="col-lg-4 m-15px-tb blog-aside">

                                <div class="widget widget-author">
                                    <div class="widget-title">
                                        <h3>Author</h3>
                                    </div>
                                    <div class="widget-body">
                                        <div class="media align-items-center">
                                            <div class="avatar">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" title="" alt="" />
                                            </div>
                                            <div class="media-body">
                                                <h5>Tên người cho thuê </h5>
                                            </div>
                                        </div>
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-primary" type="button">Số liên hệ:</button>
                                            <button class="btn btn-outline-dark" type="button">Chat với chủ nhà</button>
                                            <button class="btn btn-outline-dark" type="button">Yêu cầu liên lạc lại</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Detail;