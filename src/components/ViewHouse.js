import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function ViewHouse(){
    const [house, setHouse] = useState();
    const params = useParams();
    async function getListHouse() {
        const reponse = await axios.get(`http://localhost:8080/api/house/${params.id}`);
        console.log(reponse.data);
        setHouse(reponse.data)
    }

    useEffect(() => {
        getListHouse()
    }, []);

    return <>

        <section className="top-bar">
            <div className="right-content">
                <img src="" alt="" className="filter"/>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh3r8ECutCMoSnKpB_PA5SLWIJ24vBOtuxXDk7-2oTE1oUQFGe_yw6Yt287rNS8N9AaGU&usqp=CAU"
                    alt="" className="cart"/>
                <div className="profile-img-box">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Microsoft_Account_Logo.svg/1200px-Microsoft_Account_Logo.svg.png"
                        alt=""/>
                </div>
                <img src="/images/menu.png" alt="" className="menu"/>
            </div>
        </section>
    </>

}

export default ViewHouse();