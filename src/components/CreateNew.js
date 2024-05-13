import axios from "axios";
import {Button} from "bootstrap";
import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import async from "async";
import {useFormik} from "formik";

function Create() {
    const [typeRooms, setTypeRooms] = useState([])
    async function getList() {
        const rs = await axios.get("http://localhost:8080/api/type-room");
        setTypeRooms(rs.data);

    };

    useEffect(() => {
        getList()
    },[])

    const [houseData, setHouseData] = useState({
        name: '',
        address: '',
        description: '',
        price: 0,
        numberOfBedRoom: 0,
        numberOfBathRoom: 0,
        numberOfRoom: 0,
        image: null,
        rooms: []
    });

    const handleInputChange = (event) => {
        if (event.target.name === 'image') {
            setHouseData({
                ...houseData,
                [event.target.name]: event.target.files[0]
            });
        } else {
            setHouseData({
                ...houseData,
                [event.target.name]: event.target.value
            });
        }
    };

    const handleRoomInputChange = (event, index) => {
        const updatedRooms = [...houseData.rooms];
        updatedRooms[index][event.target.name] = event.target.value;
        setHouseData({
            ...houseData,
            rooms: updatedRooms
        });
    };

    const handleAddRoom = () => {
        setHouseData({
            ...houseData,
            rooms: [...houseData.rooms, { name: '', typeId: 0 }]
        });
    };

    async function createHouse(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', houseData.name);
            formData.append('address', houseData.address);
            formData.append('description', houseData.description);
            formData.append('price', houseData.price);
            formData.append('numberOfBedRoom', houseData.numberOfBedRoom);
            formData.append('numberOfBathRoom', houseData.numberOfBathRoom);
            formData.append('numberOfRoom', houseData.numberOfRoom);
            formData.append('image', houseData.image);
            houseData.rooms.forEach((room, index) => {
                formData.append(`rooms[${index}].name`, room.name);
                formData.append(`rooms[${index}].typeId`, room.typeId);
            });
            const response = await axios.post('http://localhost:8080/api/house', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            } );
            console.log(response.data); // Thực hiện các xử lý sau khi thêm nhà thành công
            // Reset form
            setHouseData({
                name: '',
                address: '',
                description: '',
                price: 0,
                numberOfBedRoom: 0,
                numberOfBathRoom: 0,
                numberOfRoom: 0,
                image: null,
                rooms: []
            });
        } catch (error) {
            console.error(error);
            // Xử lý lỗi nếu có
        }
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
                <form className="row g-3" onSubmit={createHouse}>
                    <div className="col-md">
                        <label htmlFor="inputName" className="form-label">Tên nhà</label>
                        <input className="form-control"
                               type="text"
                               id="name"
                               name="name"
                               value={houseData.name}
                               onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                        <input className="form-control"
                               type="text"
                               id="address"
                               name="address"
                               value={houseData.address}
                               onChange={handleInputChange}
                               placeholder="1234 Main St"
                        />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Số phòng</span>
                        <input aria-label="numberOfBedRoom" className="form-control"
                               type="number"
                               id="numberOfBedRoom"
                               name="numberOfBedRoom"
                               value={houseData.numberOfBedRoom}
                               onChange={handleInputChange}
                               placeholder="Phòng ngủ"/>
                        <input aria-label="numberOfBathRoom" className="form-control"
                               type="number"
                               id="numberOfBathRoom"
                               name="numberOfBathRoom"
                               value={houseData.numberOfBathRoom}
                               onChange={handleInputChange}
                               placeholder="Phòng tắm"/>
                    </div>
                    <div className="mb-3">
                        <label for="formFileMultiple" className="form-label">Thêm ảnh</label>
                        <input className="form-control" type="file"
                               id="image"
                               name="image"
                               onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Giá</span>
                        <input className="form-control" type="number"
                               id="price"
                               name="price"
                               value={houseData.price}
                               onChange={handleInputChange}
                               aria-label="Amount (to the nearest dollar)"/>
                        <span className="input-group-text">.00</span>
                    </div>
                    <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here" id="description"
                              name="description"
                              value={houseData.description}
                              onChange={handleInputChange}
                              style={{height: "100px"}}></textarea>
                        <label for="floatingTextarea2">Mô tả</label>
                    </div>

                    <div>
                        <label className="form-label">Các phòng:</label>
                        {houseData.rooms.map((room, index) => (
                            <div key={index}>
                                <label
                                    className="form-label"
                                    htmlFor={`roomName${index}`}>Tên phòng:</label>
                                <input
                                    type="text"
                                    id={`roomName${index}`}
                                    name="name"
                                    value={room.name}
                                    onChange={(event) => handleRoomInputChange(event, index)}
                                />
                                <label className="form-label" htmlFor={`roomType${index}`}>Loại phòng:</label>
                                <select
                                    className="form-select"
                                    id={`roomType${index}`}
                                    name="typeId"
                                    value={room.typeId}
                                    onChange={(event) => handleRoomInputChange(event, index)}
                                >
                                    {
                                        typeRooms.map(typeRoom => (
                                            <option key={typeRoom.id} value={typeRoom.id}>
                                                {typeRoom.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddRoom}>Thêm phòng</button>
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