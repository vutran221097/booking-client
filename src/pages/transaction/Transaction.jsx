import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import './Transaction.css'
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Axios from "../../api/Axios";

const Transaction = () => {
    const [data, setData] = useState([])
    const userId = useSelector((state) => state.auth.currentUser._id)

    const getData = async () => {
        try {
            const res = await Axios.get(`/transactions/user/${userId}`)
            if (res.status === 200) {
                setData(res.data.results)
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container transaction-container">
                <h2>Your Transactions</h2>
                {!data.length ? (<h1>You dont have any transaction</h1>) : (
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th className="w-4">#</th>
                                <th className="w-42">Hotel</th>
                                <th className="w-8">Room</th>
                                <th className="w-15">Date</th>
                                <th className="w-8">Price</th>
                                <th className="w-15">Payment Method</th>
                                <th className="w-8">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                const rooms = item.room.map(item => {
                                    return item.room
                                })
                                return (
                                    <tr key={index} className="transaction-items">
                                        <th>{index < 10 ? `0${index + 1}` : `${index + 1}`}</th>
                                        <th>{item.hotelName}</th>
                                        <th>{rooms.join(",")}</th>
                                        <th>{`${new Date(item.dateStart).toLocaleDateString("vn-VN")} - ${new Date(item.dateEnd).toLocaleDateString("vn-VN")}`}</th>
                                        <th>${item.price}</th>
                                        <th className="payment">{item.payment.replace("-", " ")}</th>
                                        <th><div className={`${item.status?.toLowerCase()} status`}>{item.status}</div></th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Transaction;
