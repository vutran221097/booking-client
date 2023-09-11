
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import './Booking.css'
import { DateRangePicker } from "react-date-range"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toastNoti } from "../../utils/utils"
import { useSelector } from "react-redux"
import Axios from "../../api/Axios"
import validate from "../../utils/validation"
import { checkDate } from "../../utils/utils"

const Booking = () => {
    const user = useSelector((state) => state.auth.currentUser)
    const initFormData = {
        fullname: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        identityCardNumber: ""
    }

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });
    const { state } = useLocation();
    const [paymentMethod, setPaymentMethod] = useState("default")
    const [showSelectRoom, setShowSelectRoom] = useState(false)
    const [totalRoom, setTotalRoom] = useState([])
    const [totalBill, setTotalBill] = useState(0)
    const [formData, setFormData] = useState(initFormData)
    const [unavailableRoom, setUnavailableRoom] = useState([])
    const navigate = useNavigate()

    const getUnavailableRoom = async (startDate, endDate) => {
        try {
            const res = await Axios.post('/transactions/unavailable-rooms', {
                hotel: state.hotel._id,
                dateStart: startDate,
                dateEnd: endDate,
            })
            if (res.status === 200) {
                setUnavailableRoom(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleDate = (date) => {
        // Set date for date range
        setSelectionRange({
            startDate: date.selection.startDate,
            endDate: date.selection.endDate,
            key: "selection",
        });
        if (date.selection.startDate !== date.selection.endDate) {
            getUnavailableRoom(date.selection.startDate, date.selection.endDate)
            setShowSelectRoom(true)
        } else {
            setShowSelectRoom(false)
        }

    };


    const onCheckRoom = (e, item, v) => {
        const durationDays = checkDate(selectionRange.startDate, selectionRange.endDate)
        if (e.target.checked === false) {
            const room = [...totalRoom]
            const roomIndex = totalRoom.findIndex(room => room.room === v)
            const bill = totalBill - (item.price * room[roomIndex].days)
            setTotalBill(bill)
            room.splice(roomIndex, 1)
            setTotalRoom(room)
        } else {
            const newOrder = [...totalRoom]
            newOrder.push({
                roomId: item._id,
                room: v,
                days: durationDays
            })
            setTotalRoom(newOrder)
            const bill = totalBill + (item.price * durationDays)
            setTotalBill(bill)
        }
    }

    const onBooking = async () => {
        try {
            const data = {
                user: user.username,
                hotel: state.hotel._id,
                room: totalRoom,
                dateStart: selectionRange.startDate,
                dateEnd: selectionRange.endDate,
                price: totalBill,
                payment: paymentMethod,
                status: "Booked",
                formData: formData
            }

            const objectVal = Object.values(data)
            if (objectVal.includes("")) return toastNoti("All fields are required!", "error")
            const validateEmail = validate(formData.email, "email")
            if (validateEmail) return toastNoti(validateEmail, "error")
            if (!totalRoom.length) return toastNoti("You must select room!", "error")
            if (paymentMethod === "default") return toastNoti("You must select payment method!", "error")


            const res = await Axios.post('/transactions/create', data)
            if (res.status === 200) {
                toastNoti("Reserve success!", "success")
                navigate('/')
            }
        } catch (e) {
            console.error(e);
        }
    }

    const onChangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onCheckAvailable = (roomId, roomValue) => {
        let check = false
        unavailableRoom.forEach((item) => {
            if (item.roomId === roomId && item.room === roomValue) {
                check = true
            }
        })
        return check
    }

    return (<div>
        <Navbar />
        <div className="container booking-page">
            <div className="booking-info">
                <div className="booking-dates">
                    <h2>Dates</h2>
                    <DateRangePicker
                        className="date-range-picker"
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        onChange={handleDate}
                        showPreview={false}
                    />
                </div>

                <div className="booking-reserve-info">
                    <h2>Reserve Info</h2>
                    <div className="form-control">
                        <label>Your Full Name</label>
                        <input type="text" placeholder="Full Name" name="fullname" value={formData.fullname} onChange={onChangeInput} />
                    </div>
                    <div className="form-control">
                        <label>Your Email</label>
                        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={onChangeInput} />
                    </div>
                    <div className="form-control">
                        <label>Your Phone Number</label>
                        <input type="number" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={onChangeInput} />
                    </div>
                    <div className="form-control">
                        <label>Your Identity Card Number</label>
                        <input type="number" placeholder="Card Number" name="identityCardNumber" value={formData.identityCardNumber} onChange={onChangeInput} />
                    </div>
                </div>
            </div>
            {showSelectRoom && (
                <>
                    <div className="booking-rooms">
                        <h2>Select Rooms</h2>
                        <div className="room-container">
                            {!state.hotel.rooms.length && <h2>No room to select!</h2>}
                            {state.hotel.rooms.map((item, index) => {
                                return (
                                    <div className="selected-room" key={index}>
                                        <div className="room-info" >
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                            <small>Max people: <b>{item.maxPeople}</b></small>
                                            <p><b>${item.price}</b></p>
                                        </div>
                                        <div className="room-status">
                                            {item.roomNumbers.map((v, i) => {
                                                return (
                                                    <div className="room-check" key={i}>
                                                        <small>{v}</small>
                                                        <input type="checkbox" value={v} onChange={(e) => onCheckRoom(e, item, v)} disabled={onCheckAvailable(item._id, v)} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h2>Total Bill: ${totalBill}</h2>

                        <div className="booking-total">
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="booking-payment"
                            >
                                <option value="default" disabled>Selecte Payment Method</option>
                                <option value="cash">Cash</option>
                                <option value="credit-card">Credit Card</option>
                            </select>

                            <div className="booking-payment-action">
                                <button onClick={() => onBooking()}>Reserve Now</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
        <Footer />
    </div>)
}

export default Booking