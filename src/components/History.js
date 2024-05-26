import axios from "axios";
import { useEffect, useState } from "react";

function History(){
    const [order,setOrder] = useState([]);

    async function getHistory(){
        const reponse = await axios.get('http://localhost:8080/api/order/1');
        setOrder(reponse.data);

    }
    useEffect(() => {
        getHistory();
    },[])
    return(
        <>
            {order.map(item => 
            <div>
                
            </div>)}
        </>
    )
}

export default History;