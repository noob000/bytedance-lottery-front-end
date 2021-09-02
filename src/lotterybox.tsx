import React from "react";
import { useState, useEffect } from "react";
import './css/lotterybox.css';
import title from './asset/title.png';
import classNames from "classnames";
import Lottery from "./lottery";
import axios from "axios";
export default function LotteryBox() {
    const [initalAmount, setInitalAmount] = useState<number>(200);
    const [perAmount, setPerAmount] = useState<number>(0)
    const [sign, setSign] = useState<boolean>(false);
    const [giftlist, setGiftList] = useState<string[]>([])

    const handleSign = () => {
        if (!sign) setSign(true);
    }

    const minAmount = () => {
        if (initalAmount >= perAmount) {
            setInitalAmount((prev) => (prev - perAmount))
            return 'success'
        }
        else return 'failed'
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: "https://qco156.fn.thelarkcloud.com/returnAmount"
        }).then((res) => {
            setInitalAmount(res.data.initalAmount);
            setPerAmount(res.data.perAmount)
        })
    }, [])

    const handleChange = (item: any) => {
        if (item == '66矿石') setInitalAmount((prev) => (prev + 66));
        setGiftList((prev: any) => [...prev, item])
    }
    return (
        <div className='lotteryBox'>
            <div className='titleContainer'>
                <img src={title} className='titlePic' />
                <p className='title'>Switch、乐高积木及掘金周边等你来拿</p>
            </div>
            <h3 className='title1'>幸运抽奖</h3>
            <div className='header'>
                <p className='itemAmount'>当前矿石数:  <span>{initalAmount}</span></p>
                <button className={classNames({
                    signState: !sign,
                    signButton: true
                })} onClick={handleSign}>{sign ? '已签到' : '请签到'}</button>
            </div>
            <div className='flexContainer'>
                <div className='leftContainer'>

                    <Lottery amount={initalAmount}
                        perAmount={perAmount}
                        func={minAmount}
                        handleChange={handleChange} />
                </div>
                <div className='rightContainer'>
                    <h3>获得奖品列表</h3>
                    <div className='prizeList'>
                        <ul>
                            {giftlist.map((element: any) =>
                                <li>获得奖品：<span>{element}</span></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

