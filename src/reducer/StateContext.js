
import React, { useState, createContext, useContext, useEffect } from "react";
import { authApi, endpoints } from "../configs/Api";


const Context = createContext();
export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    // const [thongbao, setThongbao] = useState([])

    // const loadThongBao = async () => {


    //     const res = await authApi().get(endpoints['thongbao'])
    //     setThongbao(res.data)
    //     console.log(res.data)
    //     console.log(thongbao)


    // }

    // if (showCart == true) {

    //     loadThongBao()


    // }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,

            }}
        >
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context);