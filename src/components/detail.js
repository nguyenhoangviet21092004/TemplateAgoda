import Navbar from "./navbar";
import "../css/detail.css"
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import Swal from "sweetalert2"; // theme css file
import { DatePicker, Space, message } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
function Detail() {
    const navigate = useNavigate();
    const [house, setHouse] = useState({});
    const idAccount = sessionStorage.getItem('account_id');
    const price = house.price;

    const a = Number(house.price);
    const formattedNumber = a.toLocaleString();
    // console.log(house.price)
    const params = useParams();

    const [dateRange, setDateRange] = useState([]);
    const [numDays, setNumDays] = useState(0);

    const [dayStart, setDayStart] = useState(null);
    const [monthStart, setMonthStart] = useState(null);
    const [yearStart, setYearStart] = useState(null);

    const [dayEnd, setDayEnd] = useState(null);
    const [monthEnd, setMonthEnd] = useState(null);
    const [yearEnd, setYearEnd] = useState(null);

    const [currentDate, setCurrentDate] = useState(moment());
    const [datesDB, setDates] = useState([]);
    const [timeStarts, setTimeStarts] = useState([]);
    const [timeEnds, setTimeEnds] = useState([]);

    const [allDates, setAllDates] = useState([]);

    const [errorMessages, setErrorMessages] = useState([]);
    const formattedErrorMessages = errorMessages.map(dateString => {
        return moment(dateString).format('DD-MM-YYYY');
    });

    console.log(errorMessages)

    const handleDateRangeChange = (dates, dateStrings) => {
        setDateRange(dateStrings);
        const newErrorMessages = [];
        if (dates && moment(dateStrings[0], 'DD-MM-YYYY').isValid() && moment(dateStrings[1], 'DD-MM-YYYY').isValid()) {
            const startDate = moment(dateStrings[0], 'DD-MM-YYYY');
            const endDate = moment(dateStrings[1], 'DD-MM-YYYY');

            setYearStart(startDate.year());
            setMonthStart(startDate.month() + 1); // Tháng trong moment.js bắt đầu từ 0
            setDayStart(startDate.date());

            setYearEnd(endDate.year());
            setMonthEnd(endDate.month() + 1);
            setDayEnd(endDate.date());
            const daysDiff = endDate.diff(startDate, 'days') + 1;
            setNumDays(daysDiff);

            // Tạo mảng chứa tất cả các ngày từ startDate đến endDate
            const allDates = [];
            let currentDate = startDate.clone();
            while (currentDate.diff(endDate, 'days') <= 0) {
                allDates.push(currentDate.format('YYYY-MM-DD'));
                currentDate.add(1, 'days');
            }
            setAllDates(allDates);
            for (let i = 0; i < allDates.length; i++) {
                for (let j = 0; j < datesDB.length; j++) {
                    if (allDates[i] === datesDB[j]) {
                        newErrorMessages.push(allDates[i]);
                        setDateRange([])
                        setNumDays(0);
                        setAllDates([]);
                    }
                }

            }
            setErrorMessages(newErrorMessages)
        } else {
            setNumDays(0);
            setAllDates([]);
        }
    };

    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    async function getHouse() {
        const res = await axios.get(`http://localhost:8080/api/house/${params.id}`)
        setHouse(res.data);
    }

    useEffect(() => {
        getHouse();
        ListTime();
    }, []);
    const handleViewDirections = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(house.address)}`;
        window.open(googleMapsUrl, '_blank');
    };


    async function BookHouse(e) {
        e.preventDefault();

        const date = `${yearStart}-${monthStart}-${dayStart} -- ${yearEnd}-${monthEnd}-${dayEnd}`;
        const response = await axios.post('http://localhost:8080/api/order', {
            date: date,
            idHouse: params.id,
            total: numDays,
            revenue: numDays * price,
            idAccount: idAccount,
        })

        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Đặt thành công"
        }).then(() => {
            navigate("/home")
            // Navigate to home page after successful submission
        });
    }

    function formatPrice(price) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }

    async function ListTime() {

        const res = await axios.get(`http://localhost:8080/api/order/time/${params.id}`);

        const newDates = [];
        const newTimeStarts = [];
        const newTimeEnds = [];

        if (res.data.length > 0) {
            res.data.forEach(item => {
                const timeStart = new Date(item.timeStart);
                const timeEnd = new Date(item.timeEnd);

                newTimeStarts.push(timeStart.toISOString().slice(0, 10));
                newTimeEnds.push(timeEnd.toISOString().slice(0, 10));

                let currentDates = timeStart;
                while (currentDates <= timeEnd) {
                    newDates.push(currentDates.toISOString().slice(0, 10));
                    currentDates.setDate(currentDates.getDate() + 1);
                }
            });

        }
        setDates(newDates);
        setTimeStarts(newTimeStarts);
        setTimeEnds(newTimeEnds);
    }

    const disabledDate = (current) => {
        return current && (current.isBefore(currentDate, 'day') || datesDB.includes(current.format('YYYY-MM-DD')));
    };
    return (
        <div>
            <header>
                <Navbar />
            </header>

            <div class="blog-single">
                <div class="container-fluid " >

                    <div class="row justify-content-center">

                        <div class="col-lg-8 m-15px-tb">
                            <h1>{house.name}</h1>
                            <article style={{ overflow: "visible" }} className="article">
                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {house.images?.map((item, index) => (
                                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                                style={{ height: '500px' }}>
                                                <img src={process.env.PUBLIC_URL + '/img/' + (item.nameImage)}
                                                    className="d-block w-100 h-100 object-fit-cover"
                                                    alt={`Carousel Image ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>

                                    <button className="carousel-control-prev" type="button"
                                        data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button"
                                        data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <div className="test" style={{ display: "flex" }} >
                                    <div className="test1" style={{ marginTop: '4%' }}>
                                        <h1>{house.name}</h1>

                                        <h2>Giá: {formattedNumber}(VND)</h2>
                                        <div className="article-content">
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <h5 style={{ marginRight: '8px' }}>Địa chỉ: {house.address}</h5>
                                                <a style={{ marginBottom: '13px', marginLeft: '13px' }}
                                                    onClick={handleViewDirections}>Xem chỉ dẫn</a>
                                            </div>
                                            <h5>Số phòng ngủ: {house.numberOfBedRoom}</h5>
                                            <h5>Số phòng tắm: {house.numberOfBathRoom}</h5>
                                        </div>
                                    </div>
                                    <div className="test2" style={{ paddingLeft: '14%', paddingTop: '2%', borderRadius: '10px' }}>
                                        <p>Ngày bắt đầu | Ngày kết thúc </p>
                                        <Space direction="vertical" size={12}>
                                            <RangePicker onChange={handleDateRangeChange}
                                                disabledDate={disabledDate}
                                                format="DD-MM-YYYY"
                                                value={dateRange.length > 0 ? [moment(dateRange[0], 'DD-MM-YYYY'), moment(dateRange[1], 'DD-MM-YYYY')] : []}
                                                style={{
                                                    padding: '8px 12px',
                                                }}
                                            />

                                        </Space>
                                        <p>Số ngày thuê: {numDays}</p>
                                        <p>Tổng tiền: {formatCurrency(numDays * price)} </p>
                                        {formattedErrorMessages.length > 0 && <div>
                                            <span style={{ color: 'red' }}>Ngày </span>
                                            {formattedErrorMessages.map((mess, index) => (
                                                <span key={index} style={{ color: 'red' }}>
                                                    {mess}
                                                    {index < formattedErrorMessages.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                            <span style={{ color: 'red' }}> đã được đặt</span>
                                        </div>}


                                        <form onSubmit={BookHouse}>
                                            <input type="submit" value="Đặt nhà" />
                                        </form>


                                    </div>
                                </div>
                            </article>
                            <div class="contact-form article-comment">
                                <h4>Nhận xét</h4>
                                <form id="contact-form" method="POST">
                                    <div class="row">

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <textarea name="message" id="message"
                                                    placeholder="Để lại nhật xét của bạn" rows="4"
                                                    class="form-control"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-12" style={{ marginTop: "4%" }}>
                                            <button type="button" class="btn btn-outline-success">Đăng</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Detail;