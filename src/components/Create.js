import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useFormik, validateYupSchema} from "formik";

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
                console.log(image)

                for(let i = 0; i < image.length; i++){
                    formData.append('image', image[i]);
                }
                // formData.append("image", image);

                await axios.post("http://localhost:8080/api/house", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                // Navigate to home page after successful submission
                navigate('/home');}


    });

    // Handle image change
    function handleImageChange(e) {
        
        const file = e.target.files;
        setImage(file);
        console.log(image)
    }
    const [rooms, setRooms] = useState([{ name: '', typeId: '' }]);
    const handleAddRoom = () => {
        setRooms([...rooms, { name: '', typeId: '' }]);
    };


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
                                        <a className="nav-link" aria-current="page" href="/home"
                                           style={{color: "black"}}>Trang chủ</a>
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
            <div className="container w-50" style={{alignContent: "center"}}>
                <div style={{textAlign:"center"}}>
                    <h1>
                        Thêm nhà muốn cho thuê
                    </h1>
                </div>
                <form className="row g-3" onSubmit={formAdd.handleSubmit}>

                    <div className="col-md">
                        <label htmlFor="inputName" className="form-label">Tên nhà</label>
                        <input type="text" className="form-control" name="name" id="name"
                               onChange={formAdd.handleChange}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control" id="address" name="address"
                               onChange={formAdd.handleChange} placeholder="1234 Main St"/>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">Số phòng</span>
                        <input type="number" aria-label="numberOfBedRoom" id="numberOfBedRoom" name="numberOfBedRoom"
                               className="form-control" onChange={formAdd.handleChange} placeholder="Phòng ngủ"/>
                        <input type="number" aria-label="numberOfBathRoom" id="numberOfBathRoom" name="numberOfBathRoom"
                               className="form-control" onChange={formAdd.handleChange} placeholder="Phòng tắm"/>
                    </div>

                    <div className="mb-3">
                        <label for="formFileMultiple" class="form-label">Thêm ảnh</label>
                        <input className="form-control" name="image" onChange={handleImageChange} type="file"
                               id="formFileMultiple" multiple/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Giá</span>
                        <input type="text" className="form-control" id="price" name="price"
                               onChange={formAdd.handleChange} aria-label="Amount (to the nearest dollar)"/>
                        <span className="input-group-text">.00</span>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={handleAddRoom}>
                            Thêm phòng
                        </button>
                    </div>
                    {rooms.map((room, index) => (
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
                                    <label htmlFor={`room.name-${index}`}>Tên phòng</label>
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
                                        {typeRooms.map((typeRoom) => (
                                            <option key={typeRoom.id} value={typeRoom.id}>
                                                {typeRoom.name}
                                            </option>
                                        ))}
                                    </select>
                                    <label htmlFor={`rooms.typeId-${index}`}>Chọn loại phòng</label>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" name="description"
                                  id="description" onChange={formAdd.handleChange} style={{height: "100px"}}></textarea>
                        <label for="floatingTextarea2">Mô tả</label>
                    </div>


                    <div className="col-12">
                        <Link to={"/host"}>
                            <button className="btn btn-outline-secondary" style={{ color: "black", marginRight: "1%" }} >Hủy</button>
                        </Link>
                        <button type="submit" className="btn btn-outline-primary">Thêm nhà</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Create;