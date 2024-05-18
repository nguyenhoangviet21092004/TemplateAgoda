import {useEffect, useState} from "react";
import async from "async";
import axios from "axios";
import {useParams} from "react-router-dom";

function ViewHouse() {

    const [house, setHouse] = useState({});

    const params = useParams();

    async function getHouse() {
        const res = await axios.get(`http://localhost:8080/api/house/${params.id}`)
        setHouse(res.data);
    }

    useEffect(() => {
        getHouse()
    }, []);
    const handleViewDirections = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(house.address)}`;
        window.open(googleMapsUrl, '_blank');
    };

    return <>
        {house.address}
        <a href="#" onClick={handleViewDirections}>Xem chỉ dẫn</a>
    </>
}

export default ViewHouse;