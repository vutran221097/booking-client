import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import './Hotel.css'
import HotelList from "../../components/HotelList/HotelList"
import Axios from "../../api/Axios"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

const Hotel = () => {
    const [data, setData] = useState([])
    const location = useLocation()
    const { state } = location

    const getData = async () => {
        try {
            const res = await Axios.post('hotels/hotel-list', {
                type: !state ? "all" : state.type,
                param: !state ? 'all' : state.param
            })
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
        <>
            <Navbar />
            <div className="hotel-list-page">
                <HotelList title={!state ? 'All Hotels' : state.title} data={data}/>
            </div>
            <Footer />
        </>

    )
}

export default Hotel