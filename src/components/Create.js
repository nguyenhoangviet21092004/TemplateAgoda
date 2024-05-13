import axios from "axios";
import {Button} from "bootstrap";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import async from "async";
import {useFormik} from "formik";

function Create() {

    const history = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [numberOfBedroom, setNumberOfBedroom] = useState('');
    const [numberOfBathRoom, setNumberOfBathRoom] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [nameRoom, setNameRoom] = useState('');
    const [typeRoom, setTypeRoom] = useState('');
    const [image, setImage] = useState(null);

    const [typeRooms, setTypeRooms] = useState([])

    async function getList() {
        const rs = await axios.get("http://localhost:8080/api/type-room");
        setTypeRooms(rs.data);

    };

    useEffect(() => {
        getList()
    },[])

    async function createHouse(e) {
        e.preventDefault()

        const response = await axios.post("http://localhost:8080/api/house",
            {
                name: name,
                address: address,
                numberOfBedroom: numberOfBedroom,
                numberOfBathRoom: numberOfBathRoom,
                rooms: [
                    {
                        nameRoom: nameRoom,
                        typeId: typeRoom
                    }],
                price: price,
                description: description,
                image: image
            }
        );
        if (response.data) {
            history('/home');
        }
    }


    // const navigate = useNavigate();
    //
    // console.log("da vao")
    // const formAdd = useFormik({
    //     initialValues: {
    //         name: "",
    //         address: "",
    //         description: "",
    //         price: "",
    //         numberOfBedRoom: "",
    //         numberOfBathRoom: "",
    //         rooms: [
    //             {
    //                 name: "",
    //                 typeId: ""
    //             }],
    //         image: ""
    //     }, onSubmit: async (values) => {
    //         const formdata = new FormData();
    //         formdata.append("name", values.name)
    //         formdata.append("address", values.address)
    //         formdata.append("description", values.description)
    //         formdata.append("price", values.price)
    //         formdata.append("numberOfBedRoom", values.numberOfBedRoom)
    //         formdata.append("numberOfBathRoom", values.numberOfBathRoom)
    //         formdata.append("rooms.name", values.rooms.name)
    //         formdata.append("rooms.typeId", values.rooms.typeId)
    //         formdata.append("rooms.image", values.image)
    //         axios.post("http://localhost:8080/api/house/create", formdata
    //         ).then(res => {
    //             console.log(res)
    //             navigate("/")
    //         })
    //     }
    // })


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
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
            <div className="container w-50" style={{alignContent: "center"}}>
                <form className="row g-3" onSubmit={createHouse}>
                    <div className="col-md">
                        <label htmlFor="inputName" className="form-label">Tên nhà</label>
                        <input type="text" className="form-control" name="name" id="name"
                               onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control" id="address" name="address"
                               onChange={(e) => setAddress(e.target.value)}
                               placeholder="1234 Main St"/>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Số phòng</span>
                        <input type="number" aria-label="numberOfBedRoom" class="form-control"
                               onChange={(e) => setNumberOfBedroom(e.target.value)}
                               placeholder="Phòng ngủ"/>
                        <input type="number" aria-label="numberOfBathRoom" class="form-control"
                               onChange={(e) => setNumberOfBathRoom(e.target.value)}
                               placeholder="Phòng tắm"/>
                    </div>
                    <div class="mb-3">
                        <label for="formFileMultiple" class="form-label">Thêm ảnh</label>
                        <input class="form-control" name="image" type="file" id="formFileMultiple" multiple
                               onChange={handleFileChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Giá</span>
                        <input type="text" className="form-control" id="price" name="price"
                               onChange={(e) => setPrice(e.target.value)}
                               aria-label="Amount (to the nearest dollar)"/>
                        <span className="input-group-text">.00</span>
                    </div>
                    <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" name="description"
                              id="description"
                              onChange={(e) => setDescription(e.target.value)}
                              style={{height: "100px"}}></textarea>
                        <label for="floatingTextarea2">Mô tả</label>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="roomDto" placeholder="Tên phòng"
                                   onChange={(e) => setNameRoom(e.target.value)}
                            />
                            <label htmlFor="roomDto">Tên phòng</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select className="form-select" name="roomDto.typeId" id="roomDto.typeID"
                                    onChange={(e) => setTypeRoom(e.target.value)}
                            >
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
                    <div>
                        <button style={{float: "right"}} type="button" class="btn btn-primary col-2"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                            Thêm phòng
                        </button>
                    </div>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm phòng</h1>

                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                {/*<div className="    row g-2">*/}
                                {/*    <div className="col-md">*/}
                                {/*        <div className="form-floating">*/}
                                {/*            <input type="text" className="form-control" id="roomDto" placeholder="Tên phòng"*/}
                                {/*                   onChange={formAdd.handleChange}/>*/}
                                {/*            <label htmlFor="roomDto">Tên phòng</label>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="col-md">*/}{/*        <div className="form-floating">*/}
                                {/*            <select className="form-select" name="roomDto.typeId" id="roomDto.typeID"*/}
                                {/*                    onChange={formAdd.handleChange}>*/}
                                {/*                <option selected>Loại phòng</option>*/}
                                {/*                {*/}
                                {/*                    typeRooms.map(typeRoom => (*/}
                                {/*                        <option key={typeRoom.id} value={typeRoom.id}>*/}
                                {/*                            {typeRoom.name}*/}
                                {/*                        </option>*/}
                                {/*                    ))*/}
                                {/*                }*/}
                                {/*            </select>*/}
                                {/*            <label htmlFor="floatingSelectGrid">Chọn loại phòng</label>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div class="modal-footer">

                                    <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Đóng
                                    </button>
                                    <button type="button" className="btn btn-primary">Thêm</button>
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