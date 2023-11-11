import React from "react";
import { Link } from "react-router-dom";
import "./OrderStorage.css";

import Header from "../../components/views/Header/Header2";
import StateBox from "../../components/views/StateBox/StateBox";

import empty from "../../assets/images/storage_empty.svg";


function OrderStatus () {

    const storageList = [
        {
            id: 1,
            date: "2023.05.11 (수) 11:37",
            name: "카페 오르다",
            menu: "(ICE)아메리카노 외 4잔 13,700원",
            state: 1
        },
        {
            id: 2,
            date: "2023.10.01 (월) 19:37",
            name: "카페 오르다",
            menu: "(ICE)아메리카노 외 4잔 13,700원",
            state: 2
        },
        {
            id: 3,
            date: "2023.09.01 (월) 16:36",
            name: "이디야커피(가톨릭대점)",
            menu: "(ICE)아메리카노 외 4잔 13,700원",
            state: 0
        },
        {
            id: 4,
            date: "2023.05.11 (수) 11:37",
            name: "카페 오르다",
            menu: "(ICE)아메리카노 외 4잔 13,700원",
            state: 2
        }
    ];

    // const storageList = [];

    return(
        <section className="main-container">
            <Header pageName={"주문내역"} isClose={false}/>
            <main className="content-container">
                {storageList.length ? (
                    storageList.map((e) => (
                    <Link to="/status">
                        <StateBox 
                            id={e.id}
                            date={e.date}
                            name={e.name}
                            menu={e.menu}
                            state={e.state}
                        />
                    </Link>
                ))) : (
                    <div className="empty-order-wrapper">
                        <div className="empty-img-wrapper">
                            <img src={empty} className="empty-img" alt={empty}/>
                        </div>
                        <span className="empty-text">주문 내역이 없습니다</span>
                    </div>
                )}
                
            </main>
        </section>
    );
}

export default OrderStatus;