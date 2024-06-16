import axios from "axios";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Footer from "./Footer";

function Edit() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [typeRooms, setTypeRooms] = useState([]);
    const params = useParams();
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const role = sessionStorage.getItem('role');
    const idAccount = sessionStorage.getItem('account_id');

    // Fetch type rooms data
    useEffect(() => {
        async function getTypeRooms() {
            try {
                const response = await axios.get("http://localhost:8080/api/type-room");
                setTypeRooms(response.data);
            } catch (error) {
                console.error("Error fetching type rooms:", error);
            }
        }

        getTypeRooms();
    }, []);

    // Fetch existing data for editing
    useEffect(() => {
        async function getExistingData() {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/house/${params.id}`
                );
                const existingData = response.data;
                // Set the form values for editing
                formEdit.setValues({
                    name: existingData.name,
                    address: existingData.address,
                    description: existingData.description,
                    price: existingData.price,
                    numberOfBedRoom: existingData.numberOfBedRoom,
                    numberOfBathRoom: existingData.numberOfBathRoom,
                    accountId: existingData.accountId,
                    rooms: existingData.rooms.map((room) => ({
                        name: room.name,
                        typeId: room.typeRoom.id,
                    })),
                });
            } catch (error) {
                console.error("Error fetching existing data:", error);
            }
        }

        getExistingData();
    }, [params.id]);

    // Form submission logic using Formik
    const formEdit = useFormik({
        initialValues: {
            name: "",
            address: "",
            description: "",
            price: "",
            numberOfBedRoom: "",
            numberOfBathRoom: "",
            accountId: idAccount, // Set default accountId or handle dynamically
            rooms: [{ name: "", typeId: "" }],
        },
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("address", values.address);
                formData.append("description", values.description);
                formData.append("price", values.price);
                formData.append("numberOfBedRoom", values.numberOfBedRoom);
                formData.append("numberOfBathRoom", values.numberOfBathRoom);

                values.rooms.forEach((room, index) => {
                    formData.append(`rooms[${index}].name`, room.name);
                    formData.append(`rooms[${index}].typeId`, room.typeId);
                });

                formData.append("image", image);

                await axios.put(
                    `http://localhost:8080/api/house/${params.id}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                // Navigate to home page after successful submission
                navigate("/home");
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        },
    });

    // Handle image change
    function handleImageChange(e) {
        const file = e.target.files[0];
        setImage(file);
    }



    return (
        <div>
            <div className="header" style={{ position: "sticky", top: "0", zIndex: "1000" }}>
                <nav className="navbar navbar-expand-lg bg-white shadow-sm">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/home">
                            <img src="https://banner2.cleanpng.com/20181122/xfy/kisspng-logo-house-renting-home-housing-5bf774850ed024.2354280415429438770607.jpg" alt="Agoda" style={{ height: "30px" }} />
                        </a>
                        <a className="nav-link active" aria-current="page" href="/home">Trang chủ</a>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                {role === 'admin' || role === 'host' ? (
                                    <>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {username}
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><a className="dropdown-item" href="/host">Chủ nhà</a></li>
                                                <li><a className="dropdown-item" href="/create">Đăng nhà</a></li>
                                                <li><a href={`/history/${idAccount}`} className="dropdown-item">Lịch sử đặt</a></li>
                                                <li><a className="dropdown-item" href="#">Chi tiết tài khoản</a></li>
                                            </ul>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {username}
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li><a href={`/history/${idAccount}`} className="dropdown-item">Lịch sử đặt</a></li>
                                            <li><a className="dropdown-item" href="#">Chi tiết tài khoản</a></li>
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="container w-50" style={{ alignContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                    <h1>
                        Sửa thông tin nhà đang cho thuê
                    </h1>
                </div>
                {/* <form className="row g-3" style={{marginBottom:'1rem'}} onSubmit={formEdit.handleSubmit}>
                    <div className="col-8">
                        <label htmlFor="inputName" className="form-label">Tên nhà:<span
                            style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                        <input type="text" className="form-control" name="name" id="name"
                            onChange={formEdit.handleChange} />{errors.name &&
                                <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className="col-4" style={{ display: "flex" }}>
                        <div className="col-md">
                            <label className="form-label">Số phòng ngủ:<span
                                style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                            <select
                                aria-label="numberOfBedRoom"
                                id="numberOfBedRoom"
                                name="numberOfBedRoom" className="form-control"
                                onChange={(e) => setNumberOfBedRoom(e.target.value)}
                            >
                                <option value="">Chọn số</option>
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            {errors.numberOfBedRoom && <span className="text-danger">{errors.numberOfBedRoom}</span>}
                        </div>

                        <div className="col-md" style={{ marginLeft: "2%" }}>
                            <label className="form-label">Số phòng tắm:<span
                                style={{ color: 'red', marginLeft: '5px' }}>*</span></label>

                            <select
                                aria-label="numberOfBathRoom"
                                id="numberOfBathRoom"
                                name="numberOfBathRoom"
                                className="form-control"
                                onChange={formEdit.handleChange}
                            >
                                <option value="">Chọn số</option>
                                {Array.from({ length: 3 }, (_, i) => i + 1).map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            {errors.numberOfBathRoom && <span className="text-danger">{errors.numberOfBathRoom}</span>}
                        </div>
                    </div>
                    <div style={{ marginTop: "3%" }}>
                        <label htmlFor="inputName" className="form-label">Địa chỉ :
                            <span
                                style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                        <label htmlFor="inputName" className="form-label" style={{ marginLeft: '62%' }}>Địa chỉ cụ thể:
                            </label>
                        <div>
                            <div className="col-12" style={{ display: "flex" }}>
                                <div style={{ display: "flex", width: "66%" }}>
                                    <div className="col-4">
                                        <select className="form-select form-select-sm mb-3" name="address"
                                            value={selectedCity} onChange={handleCityChange}>
                                            <option value="" selected>Chọn tỉnh thành</option>
                                            {cities.map((city) => (<option key={city.Id} value={city.Name}>
                                                {city.Name}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select className="form-select form-select-sm mb-3" name="address"
                                            onChange={handleDistrictChange}>
                                            <option value="" selected>Chọn quận huyện</option>
                                            {districts.map((district) => (
                                                <option key={district.Id} value={district.Name}>
                                                    {district.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select className="form-select form-select-sm" name="address"
                                            onChange={handleWardChange}>
                                            <option value="" selected>Chọn phường xã</option>
                                            {wards.map((ward) => (
                                                <option key={ward.Id} value={ward.Name}>
                                                    {ward.Name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4" style={{ width: "32%", marginLeft: "1.5%" }}>
                                    <input type="text" className="form-control" style={{ height: "30px" }} name="address"
                                        onChange={(e) => setNumber(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12" style={{ display: "flex" }}>
                        <div className="col-8">
                            <div>
                                <label className="form-label">Giá:<span
                                    style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                                <div style={{ display: "flex" }}>
                                    <div className="input-group ">
                                        <input type="text" className="form-control"
                                            id="price" name="price"
                                            value={price}
                                            onChange={handleChange}
                                            aria-label="Amount (to the nearest dollar)" />
                                        <span className="input-group-text">VNĐ</span></div>
                                </div>
                            </div>
                            <div className="form-floating" style={{ marginTop: "3%" }}>
                                <textarea className="form-control" placeholder="Leave a comment here" name="description"
                                    id="description" onChange={formEdit.handleChange}
                                    style={{ height: "250px" }}></textarea>
                                <label htmlFor="floatingTextarea2">Mô tả</label>
                            </div>

                        </div>
                        <div className="col-4" style={{ width: "32%", marginLeft: "1%", marginTop: "3%" }}>
                            <div className="col-md" style={{ marginLeft: "1%" }}>
                                <div className="file-upload-wrapper">
                                    <input
                                        className="file-upload"
                                        accept="image/*"
                                        name="image"
                                        onChange={handleImageChanges}
                                        type="file"
                                        id="formFileMultiple"
                                        multiple />
                                    <label htmlFor="file-upload">Thêm ảnh</label>
                                </div>
                            </div>
                            {image.length > 0 && (
                                <div>
                                    <div className="row">
                                        {image.map((image, index) => (
                                            <div key={index} className="image">
                                                <div className="position-relative">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Image ${index}`}
                                                        className="img-fluid"
                                                    />

                                                </div>
                                                <div>
                                                    <FontAwesomeIcon icon={faRectangleXmark}
                                                        onClick={() => handleRemoveImage(index)}
                                                        style={{ width: "100%" }} />

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        {(() => {
                            const elements = [];
                            for (let index = 0; index < numberOfBedRoom; index++) {
                                elements.push(
                                    <div key={index} className="row g-2">
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name={`rooms[${index}].name`}
                                                    id={`room.name-${index}`}
                                                    placeholder="Tên phòng"
                                                    onChange={formEdit.handleChange}
                                                />
                                                <label htmlFor={`room.name-${index}`}>Tên phòng:<span
                                                    style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                                                {errors[`rooms[${index}].name`] &&
                                                    <span
                                                        className="text-danger">{errors[`rooms[${index}].name`]}</span>}

                                            </div>
                                        </div>
                                        <div className="col-md">
                                            <div className="form-floating">
                                                <select
                                                    className="form-select"
                                                    name={`rooms[${index}].typeId`}
                                                    id={`rooms.typeId-${index}`}
                                                    onChange={formEdit.handleChange}
                                                >
                                                    <option selected>Loại phòng</option>
                                                    {typeRooms.map((typeRoom) => (
                                                        <option key={typeRoom.id} value={typeRoom.id}>
                                                            {typeRoom.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label htmlFor={`rooms.typeId-${index}`}>Chọn loại phòng:<span
                                                    style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                                                {errors[`rooms[${index}].typeId`] &&
                                                    <span
                                                        className="text-danger">{errors[`rooms[${index}].typeId`]}</span>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return elements;
                        })()}
                    </div>
                    <div>

                        <div class="toast-container position-fixed bottom-0 end-0 p-3">
                            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <img src="..." class="rounded me-2" alt="..." />
                                    <strong class="me-auto">Bootstrap</strong>
                                    <small>11 mins ago</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                                        aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Hello, world! This is a toast message.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ms-10" style={{ display: "flex", justifyContent: "flex-end", paddingRight: "14%" }}>
                        <Link to={"/host"}>
                            <button className="btn btn-outline-secondary"
                                style={{ color: "black", marginRight: "1%" }}>Hủy
                            </button>
                        </Link>
                        <button type="submit" className="btn btn-outline-primary ms-2">Thêm nhà</button>
                    </div>
                </form> */}
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}


export default Edit;
