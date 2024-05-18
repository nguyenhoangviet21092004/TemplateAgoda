import { Link } from "react-router-dom";

function HostList() {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <div className="navbar">
                            <a className="navbar-brand" href="/home">Agola</a>
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
                <div className="container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tên nhà</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Giá</th>
                                <th scope="col">chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td><Link to="/detail" style={{ textDecoration: "none", color: "black" }}>Nhà 1</Link></td>
                                <td>Hà Nội</td>
                                <td>120000/Ngày</td>
                                <td>
                                    <Link to="/create"><button type="button" class="btn btn-primary" style={{ marginRight: "2%" }}>Thêm </button></Link>
                                    <Link to="/edit"><button type="button" class="btn btn-secondary" style={{ marginRight: "2%" }}>Chỉnh sửa</button></Link>
                                    <button type="button" class="btn btn-danger">Xóa</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td><Link to="/detail" style={{ textDecoration: "none", color: "black" }}>Nhà 2</Link></td>
                                <td>Hải Phòng</td>
                                <td>32000/ngày</td>
                                <td>
                                    <Link to="/create"><button type="button" class="btn btn-primary" style={{ marginRight: "2%" }}>Thêm </button></Link>
                                    <Link to="/edit"><button type="button" class="btn btn-secondary" style={{ marginRight: "2%" }}>Chỉnh sửa</button></Link>
                                    <button type="button" class="btn btn-danger">Xóa</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td><Link to="/detail" style={{ textDecoration: "none", color: "black" }}>Nhà 3</Link></td>
                                <td>Hải Phòng</td>
                                <td>22000/ngày</td>
                                <td>
                                    <Link to="/create"><button type="button" class="btn btn-primary" style={{ marginRight: "2%" }}>Thêm </button></Link>
                                    <Link to="/edit"><button type="button" class="btn btn-secondary" style={{ marginRight: "2%" }}>Chỉnh sửa</button></Link>
                                    <button type="button" class="btn btn-danger">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
        </div>
    )
}
export default HostList; 