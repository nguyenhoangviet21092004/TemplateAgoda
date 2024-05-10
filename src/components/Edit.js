import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
function Edit() {
    const history = useNavigate();
    const [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    const [stock, setStock] = useState([]);
    const [description, setDescription] = useState([]);
    const params = useParams();

    async function getDetail() {
        const response = await axios.get(
            `http://localhost:3001/products/${params.id}`
        );
        setName(response.data.name)
        setPrice(response.data.price)
        setStock(response.data.stock)
        setDescription(response.data.description)
    }

    useEffect(() => {
        getDetail();
    }, []);

    async function editClothe(e) {
        e.preventDefault()
        const response = await axios.put(`http://localhost:3001/products/${params.id}`,
            {
                name: name,
                price: price,
                stock: stock,
                description: description
            }
        );
        if (response.data) {
            history('/home');
        }
    }
    return (
        <div className="container">
            <h1>Cap nhat san pham</h1>
            <form onSubmit={editClothe}>
                <div class="mb-3">
                    <label for="name" class="form-label">Ten san pham</label>
                    <input type="text" class="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Gia</label>
                    <input type="number" class="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="stock" class="form-label">Ton kho</label>
                    <input type="text" class="form-control" id="stock" value={stock}onChange={(e) => setStock(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Mo ta</label>
                    <input type="text" class="form-control" id="desciption" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}

export default Edit;