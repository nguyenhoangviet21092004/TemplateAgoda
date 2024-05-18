import axios from "axios";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useFormik} from "formik";

function Edit() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [typeRooms, setTypeRooms] = useState([]);
    const params = useParams();

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
                        typeId: room.typeId,
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
            accountId: "3", // Set default accountId or handle dynamically
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
                formData.append("accountId", 3);

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
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar">
                        <a className="navbar-brand" href="/home">Agoda</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <ul className="nav nav-underline">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="/home">Trang chủ</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container w-50" style={{alignContent: "center"}}>
                <form className="row g-3" onSubmit={formEdit.handleSubmit}>
                    <div className="col-md">
                        <label htmlFor="inputName" className="form-label">Tên nhà</label>
                        <input type="text" className="form-control" name="name" id="name"
                               value={formEdit.values.name}
                               onChange={formEdit.handleChange}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control" id="address" name="address"
                               value={formEdit.values.address}
                               onChange={formEdit.handleChange} placeholder="1234 Main St"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Số phòng</span>
                        <input type="number" aria-label="numberOfBedRoom" id="numberOfBedRoom" name="numberOfBedRoom"
                               className="form-control" onChange={formEdit.handleChange}
                               value={formEdit.values.numberOfBedRoom}
                               placeholder="Phòng ngủ"/>

                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Số phòng</span>

                        <input type="number" aria-label="numberOfBathRoom" id="numberOfBathRoom" name="numberOfBathRoom"
                               className="form-control" onChange={formEdit.handleChange}
                               value={formEdit.values.numberOfBathRoom}
                               placeholder="Phòng tắm"/>
                    </div>
                    <div className="mb-3">
                        <label for="formFileMultiple" className="form-label">Thêm ảnh</label>
                        <input className="form-control" name="image" onChange={handleImageChange} type="file"
                               id="formFileMultiple" multiple/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Giá</span>
                        <input type="text" className="form-control" id="price" name="price"
                               value={formEdit.values.price}
                               onChange={formEdit.handleChange} aria-label="Amount (to the nearest dollar)"/>
                        <span className="input-group-text">.00</span>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" name="description"
                                  id="description" onChange={formEdit.handleChange}
                                  value={formEdit.values.description}
                                  style={{height: "100px"}}></textarea>
                        <label for="floatingTextarea2">Mô tả</label>
                    </div>
                    <div>
                        <button style={{float: "right"}} type="button" className="btn btn-primary col-2"
                                data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Sửa phòng
                        </button>
                    </div>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Sửa phòng</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                {formEdit.values.rooms.map((room, index) => (
                                <div className="row g-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" name="rooms[0].name"
                                                   id="room.name" placeholder="Tên phòng"
                                                   value={room.name}
                                                   onChange={formEdit.handleChange}/>
                                            <label htmlFor="room.name">Tên phòng</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select" name="rooms[0].typeId" id="rooms.typeId"
                                                    value={room.typeId}
                                                    onChange={formEdit.handleChange}>
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
                                    ))}
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-outline-primary">Sửa nhà</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Edit;