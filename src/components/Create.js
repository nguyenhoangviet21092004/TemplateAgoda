import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, validateYupSchema } from "formik";
import Footer from "./Footer";

function Create() {
    const navigate = useNavigate();
    const [image, setImage] = useState([]);
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
    const [errors, setErrors] = useState({}); // State to store validation errors

    const validateForm = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Tên nhà là bắt buộc";
        }

        if (!values.address) {
            errors.address = "Địa chỉ là bắt buộc";
        }

        if (!values.price || isNaN(values.price)) {
            errors.price = "Giá phải là một số";
        }


        values.rooms.forEach((room, index) => {
            if (!room.name) {
                errors[`rooms[${index}].name`] = "Tên phòng là bắt buộc";
            }
            if (!room.typeId) {
                errors[`rooms[${index}].typeId`] = "Loại phòng là bắt buộc";
            }
        });

        return errors;
    };
    const [numberOfBedRoom, setNumberOfBedRoom] = useState(0);


    // Form submission logic using Formik
    const formAdd = useFormik({
        initialValues: {
            name: "",
            address: "",
            description: "",
            price: "",
            numberOfBedRoom: numberOfBedRoom,
            numberOfBathRoom: "",
            accountId: "1", // Set default accountId or handle dynamically
            rooms: [{ name: "", typeId: "" }],
        },
        onSubmit: async (values) => {
            const validationErrors = validateForm(values);
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("address", values.address);
                formData.append("description", values.description);
                formData.append("price", values.price);
                formData.append("numberOfBedRoom", numberOfBedRoom);
                formData.append("numberOfBathRoom", values.numberOfBathRoom);
                formData.append("accountId", values.accountId);

                values.rooms.forEach((room, index) => {
                    formData.append(`rooms[${index}].name`, room.name);
                    formData.append(`rooms[${index}].typeId`, room.typeId);
                });

                for (let i = 0; i < image.length; i++) {
                    formData.append("image", image[i]);
                }

                await axios.post("http://localhost:8080/api/house", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                // Navigate to home page after successful submission
                navigate('/home');
            }

        },
    });

    // Handle image change
    function handleImageChange(e) {
        const file = e.target.files;
        setImage(file);
    }



    return (
        <div style={{}}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="navbar">
                        <a className="navbar-brand" href="/home">Agoda</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <ul className="nav nav-underline">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="/home"
                                            style={{ color: "black" }}>Trang chủ</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">On going</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">On going</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container w-50" style={{ alignContent: "center" }}>
                <div style={{ textAlign: "center", marginTop:"5%" }}>
                    <h1>
                        Thêm nhà muốn cho thuê
                    </h1>
                </div>
                <form className="row g-3" onSubmit={formAdd.handleSubmit}>

                    <div className="col-md" >
                        <label htmlFor="inputName" className="form-label">Tên nhà:<span
                            style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                        <input type="text" className="form-control" name="name" id="name" style={{height:"60px"}}
                            onChange={formAdd.handleChange} />{errors.name && <span className="text-danger">{errors.name}</span>}
                    </div >
                    <div className="col-6">
                        <label htmlFor="address" className="form-label">Địa chỉ:<span
                            style={{ color: 'red', marginLeft: '5px' ,}}>*</span></label>
                        <input type="text" className="form-control" id="address" name="address" style={{height:"60px"}}
                            onChange={formAdd.handleChange} placeholder="1234 Main St" />
                        {errors.address && <span className="text-danger">{errors.address}</span>}
                    </div>
                    <div className="col-12" style={{ display: "flex" }}>
                        <div className="col-md">
                            <label className="form-label">Số phòng ngủ:<span
                                style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                            <select style={{height:"60px"}}
                                aria-label="numberOfBedRoom"
                                id="numberOfBedRoom"
                                name="numberOfBedRoom"
                                className="form-control"
                                onChange={(e) => setNumberOfBedRoom(e.target.value)}
                            >
                                <option value="">Chọn số phòng ngủ</option>
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            {errors.numberOfBedRoom && <span className="text-danger">{errors.numberOfBedRoom}</span>}
                        </div>

                        <div className="col-md" style={{ marginLeft: "2%" }}>
                            <label className="form-label" >Số phòng tắm:<span
                                style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                            <select style={{height:"60px"}}
                                aria-label="numberOfBathRoom"
                                id="numberOfBathRoom"
                                name="numberOfBathRoom"
                                className="form-control"
                                onChange={formAdd.handleChange}
                            >
                                <option value="">Chọn số phòng tắm</option>
                                {Array.from({ length: 3 }, (_, i) => i + 1).map((value) => (
                                    <option key={value} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                            {errors.numberOfBathRoom && <span className="text-danger">{errors.numberOfBathRoom}</span>}
                        </div>
                    </div>
                    <div className="col-12" style={{ display: "flex" }}>
                        <div className="col-6"> 
                        <label className="form-label">Giá:<span
                                style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                            <div className="input-group ">                               
                                <input type="text" className="form-control" id="price" name="price" 
                                    onChange={formAdd.handleChange} aria-label="Amount (to the nearest dollar)" />
                                <span className="input-group-text">VNĐ</span>
                            </div>
                        </div>

                        <div className="col-md" style={{marginLeft:"1%"}}>
                            <label for="formFileMultiple" class="form-label" > Thêm ảnh:<span
                                style={{ color: 'red', marginLeft: '5px' }} >*</span></label><input className="form-control"  accept="image/*" name="image"  onChange={handleImageChange} type="file"
                                    id="formFileMultiple" multiple />
                        </div>

                    </div>
                    {errors.price && <span className="text-danger">{errors.price}</span>}

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
                                                onChange={formAdd.handleChange}
                                            />
                                            <label htmlFor={`room.name-${index}`}>Tên phòng:<span
                                                style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                                            {errors[`rooms[${index}].name`] &&
                                                <span className="text-danger">{errors[`rooms[${index}].name`]}</span>}

                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select
                                                className="form-select"
                                                name={`rooms[${index}].typeId`}
                                                id={`rooms.typeId-${index}`}
                                                onChange={formAdd.handleChange}
                                            >
                                                <option selected>Loại phòng</option>
                                                {typeRooms.map((typeRoom) => (<option key={typeRoom.id} value={typeRoom.id}>
                                                    {typeRoom.name}
                                                </option>
                                                ))}
                                            </select>
                                            <label htmlFor={`rooms.typeId-${index}`}>Chọn loại phòng:<span
                                                style={{ color: 'red', marginLeft: '5px' }}>*</span></label>
                                            {errors[`rooms[${index}].typeId`] &&
                                                <span className="text-danger">{errors[`rooms[${index}].typeId`]}</span>}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return elements;
                    })()}


                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" name="description"
                            id="description" onChange={formAdd.handleChange} style={{ height: "100px" }}></textarea>
                        <label for="floatingTextarea2">Mô tả</label>
                    </div>


                    <div className="col-12">
                        <Link to={"/host"}>
                            <button className="btn btn-outline-secondary"
                                style={{ color: "black", marginRight: "1%" }}>Hủy
                            </button>
                        </Link>
                        <button type="submit" className="btn btn-outline-primary">Thêm nhà</button>
                    </div>
                </form>
            </div>
            <footer style={{marginTop:"20%"}}>
                <Footer/>
            </footer>
        </div>

    )

}


export default Create;