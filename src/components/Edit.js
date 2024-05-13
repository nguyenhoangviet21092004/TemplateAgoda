import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
function Edit() {
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
        const response = await axios.get(`http://localhost:8080/api/city/${params.id}`)

        setName(response.data.name)
        setDescription(response.data.description)
        setAddress(response.data.address)
        setNumberOfBedroom(response.data.numberOfBedroom)
        setNumberOfBathRoom(response.data.numberOfBathRoom)
        setPrice(response.data.price)
        setNameRoom(response.data.nameRoom)
        setTypeRoom(response.data.typeRoom)
        setImage(response.data.image)

    };


    const params = useParams();


    useEffect(() => {
        getList()
    },)

    async function createHouse(e) {
        e.preventDefault()


        const response = await axios.put(`http://localhost:8080/api/house/${params.id}`,
            {
                name: name,
                address: address,
                numberOfBedroom: numberOfBedroom,
                numberOfBathRoom: numberOfBathRoom,
                nameRoom: nameRoom,
                typeRoom: typeRoom,
                price: price,
                description: description,
                image: image
            }
        );

        if (response.data) {
            history('/home');
        }
    }

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
                        <input type="text" className="form-control"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               id="inputName"/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Địa chỉ</label>
                        <input type="text" className="form-control"
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                               id="inputAddress" placeholder="1234 Main St"/>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Số phòng</span>
                        <input type="number" aria-label="Bedroom"
                               value={numberOfBedroom}
                               onChange={(e) => setNumberOfBedroom(e.target.value)}
                               class="form-control" placeholder="Phòng ngủ"/>
                        <input type="number" aria-label="Bathroom"
                               value={numberOfBathRoom}
                               onChange={(e) => setNumberOfBathRoom(e.target.value)}
                               class="form-control" placeholder="Phòng tắm"/>
                    </div>
                    <div class="mb-3">
                        <label for="formFileMultiple" class="form-label">Thêm ảnh</label>
                        <input class="form-control" type="file" id="formFileMultiple" multiple
                               value={image}
                               onChange={handleFileChange}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Giá</span>
                        <input type="text" className="form-control"
                               value={price}
                               onChange={(e) => setPrice(e.target.value)}
                               aria-label="Amount (to the nearest dollar)"/>
                        <span className="input-group-text">.00</span>
                    </div>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                  id="floatingTextarea2"
                                  style={{height: "100px"}}></textarea>
                        <label for="floatingTextarea2">Mô tả</label>
                    </div>
                    <div>
                        <button style={{float: "right"}} type="button" class="btn btn-primary col-2"
                                data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                <div className="row g-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="text" className="form-control"
                                                   value={nameRoom}
                                                   onChange={(e) => setNameRoom(e.target.value)}
                                                   id="floatingInputGrid"
                                                   placeholder="Tên phòng"/>
                                            <label htmlFor="floatingInputGrid">Tên phòng</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select className="form-select"
                                                    value={typeRoom}
                                                    onChange={(e) => setTypeRoom(e.target.value)}
                                                    id="floatingSelectGrid">
                                                <option selected>Loại phòng</option>
                                                {typeRooms.map(typeRoom => (
                                                    <option key={typeRoom.id} value={typeRoom.id}>
                                                        {typeRoom.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <label htmlFor="floatingSelectGrid">Chọn loại phòng</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng
                                    </button>
                                    <button type="button" class="btn btn-primary">Thêm</button>
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