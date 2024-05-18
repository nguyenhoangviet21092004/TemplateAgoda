import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

function Create() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [typeRooms, setTypeRooms] = useState([]);

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

    // Form submission logic using Formik
    const formAdd = useFormik({
        initialValues: {
            name: "",
            address: "",
            description: "",
            price: "",
            numberOfBedRoom: "",
            numberOfBathRoom: "",
            accountId: "1", // Set default accountId or handle dynamically
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
                formData.append("accountId", values.accountId);

                values.rooms.forEach((room, index) => {
                    formData.append(`rooms[${index}].name`, room.name);
                    formData.append(`rooms[${index}].typeId`, room.typeId);
                });

                formData.append("image", image);

                await axios.post("http://localhost:8080/api/house", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                // Navigate to home page after successful submission
                navigate('/');
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
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar">
                        <a className="navbar-brand" href="/home">Agola</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <ul class="nav nav-underline">
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/home">Trang chủ</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Link</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Link</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container w-50" style={{ alignContent: "center" }}>

                <form className="row g-3" onSubmit={formAdd.handleSubmit}>

                    <div className="col-md">
                        <label htmlFor="inputName" className="form-label">Tên nhà</label>
                        <input type="text" className="form-control" name="name" id="name" onChange={formAdd.handleChange} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control" id="address" name="address" onChange={formAdd.handleChange} placeholder="1234 Main St" />
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Số phòng</span>
                        <input type="number" aria-label="numberOfBedRoom" id="numberOfBedRoom" name="numberOfBedRoom" class="form-control" onChange={formAdd.handleChange} placeholder="Phòng ngủ" />
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Số phòng</span>

                        <input type="number" aria-label="numberOfBathRoom" id="numberOfBathRoom" name="numberOfBathRoom" class="form-control" onChange={formAdd.handleChange} placeholder="Phòng tắm" />
                    </div>
                    <div class="mb-3">
                        <label for="formFileMultiple" class="form-label">Thêm ảnh</label>
                        <input class="form-control" name="image" onChange={handleImageChange} type="file" id="formFileMultiple" multiple />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Giá</span>
                        <input type="text" className="form-control" id="price" name="price" onChange={formAdd.handleChange} aria-label="Amount (to the nearest dollar)" />
                        <span className="input-group-text">.00</span>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" name="description" id="description" onChange={formAdd.handleChange} style={{ height: "100px" }}></textarea>
                        <label for="floatingTextarea2">Mô tả</label>
                    </div>
                    <div>
                        <button style={{ float: "right" }} type="button" class="btn btn-primary col-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Thêm phòng
                        </button>
                    </div>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm phòng</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="    row g-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" name="rooms[0].name" id="room.name" placeholder="Tên phòng" onChange={formAdd.handleChange} />
                                            <label htmlFor="room.name">Tên phòng</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" name="rooms[0].typeId" id="rooms.typeId" onChange={formAdd.handleChange}>
                                                <option selected>Loại phòng</option>
                                                {
                                                    typeRooms.map(typeRoom => (
                                                        <option key={typeRoom.id} value={typeRoom.id}>
                                                            {typeRoom.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                            <label htmlFor="floatingSelectGrid">Chọn loại phòng</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-outline-primary">Thêm nhà</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Create;
