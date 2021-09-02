import { useState, useEffect, useRef } from "react";
import './css/lottery.css';
import axios from "axios";
import classNames from "classnames";
import { message, Modal } from "antd";
import 'antd/dist/antd.css';
export default function Lottery(props: any) {

    const giftListEL: any = useRef(null);
    let time1: any = useRef(null);
    const [giftList, setGiftList] = useState<any>([]);
    const [prize, setPrize] = useState<string | null>(null);
    const [turnNum, setTurnNum] = useState<number | null>(null);
    const [lotteryState, setLotteryState] = useState<boolean>(false);
    const [map, setMap] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://qco156.fn.thelarkcloud.com/returnUsingPlan'
        }).then((res) => {
            setGiftList(res.data.data)
            let map = new Map()
            for (let i = 0, l = res.data.data.length; i < l; i++) {
                map.set(res.data.data[i].giftname, i)
            }
            setMap(map)
        })
    }, [])

    const lottery = () => {
        setTurnNum(null)
        axios({
            method: "get",
            url: 'https://qco156.fn.thelarkcloud.com/lottery'
        }).then((res) => {
            const mes = props.func();
            if (mes == 'success') {
                setPrize(res.data);
            }
            else message.warn('抱歉您的矿石不足')
        })
    }

    useEffect(() => {

        if (prize != null && !lotteryState) setLotteryState(true)
    }, [prize])

    useEffect(() => {
        if (turnNum !== null) {

            if (turnNum == 7) time1.current = setTimeout(() => {
                setTurnNum(0)

            }, 100);
            else time1.current = setTimeout(() => setTurnNum((prev: any) => ++prev
            ), 100);
        }
    }, [turnNum])

    useEffect(() => {

        if (lotteryState) turn();
    }, [lotteryState])

    const turn = () => {

        let promise = new Promise(function (resolve, reject) {
            setTurnNum(0);
            setTimeout(function () {
                clearTimeout(time1.current);
                resolve(1)
            }, 4000)

        })
        promise.then(() => {
            const item = document.querySelector('.darkItem')?.children[1].innerHTML;
            secondTurn(item)
        })

    }

    function secondTurn(giftname: any) {
        setLotteryState(false)
        const index = map.get(giftname);
        if (index == 6) {
            setTurnNum(6);
            setTimeout(() => {
                clearTimeout(time1.current);
                setModalVisible(true);
            }, getTime(index))
        }
        else if (index == 7) {
            setTurnNum(6);
            setTimeout(() => {
                clearTimeout(time1.current);
                setModalVisible(true);
            }, getTime(index))
        }
    }

    const getTime = (index: any) => {
        const pos = map.get(prize)
        if (index == 7) {
            switch (pos) {
                case 0:
                    return 300
                case 1:
                    return 400
                case 2:
                    return 500
                case 3:
                    return 200
                case 4:
                    return 600
                case 5:
                    return 0
                case 6:
                    return 800
                case 7:
                    return 700
            }
        }
        else if (index == 6) {
            switch (pos) {
                case 0:
                    return 300
                case 1:
                    return 400
                case 2:
                    return 500
                case 3:
                    return 200
                case 4:
                    return 600
                case 5:
                    return 0
                case 6:
                    return 800
                case 7:
                    return 700
            }
        }

    }


    function prodItem() {
        if (giftList.length >= 0) {
            let result: any = [];
            giftList.map((element: any, index: any) => {
                const { giftname, url } = element
                if (index == 4)
                    result.push(
                        <div className='prizeItem startButton' onClick={lottery}>
                            <p>抽奖</p>
                        </div>
                    )
                if (index <= 2)
                    result.push(<div className={classNames({
                        prizeItem: true,
                        darkItem: turnNum == index
                    })}>
                        <img src={url} className='prizePic' />
                        <span>{giftname}</span>
                    </div>)
                if (index == 3)
                    result.push(<div className={classNames({
                        prizeItem: true,
                        darkItem: turnNum == 7
                    })}>
                        <img src={url} className='prizePic' />
                        <span>{giftname}</span>
                    </div>)
                if (index == 4)
                    result.push(<div className={classNames({
                        prizeItem: true,
                        darkItem: turnNum == 3
                    })}>
                        <img src={url} className='prizePic' />
                        <span>{giftname}</span>
                    </div>)
                if (index == 5)
                    result.push(<div className={classNames({
                        prizeItem: true,
                        darkItem: turnNum == 6
                    })}>
                        <img src={url} className='prizePic' />
                        <span>{giftname}</span>
                    </div>)
                if (index == 6)
                    result.push(<div className={classNames({
                        prizeItem: true,
                        darkItem: turnNum == 5
                    })}>
                        <img src={url} className='prizePic' />
                        <span>{giftname}</span>
                    </div>)
                if (index == 7)
                    result.push(<div className={classNames({
                        prizeItem: true,
                        darkItem: turnNum == 4
                    })}>
                        <img src={url} className='prizePic' />
                        <span>{giftname}</span>
                    </div>)

            })
            return result;
        }
    }

    return (
        <div className='lotteryContainer'>

            <div className='dotContainer'>
                <div className='dotOrange'></div>
                <div className='dotTransparent'></div>
                <div className='dotWhite'></div>
                <div className='dotTransparent'></div>
                <div className='dotOrange'></div>
            </div>

            <div className='mainContainer'>
                <div className='dotSideContainer '>
                    <div className='dotTransparent'></div>
                    <div className='dotWhite'></div>
                    <div className='dotTransparent'></div>
                </div>
                <div className='turnContainer' ref={giftListEL}>
                    {prodItem()}
                </div>
                <div className='dotSideContainer'>
                    <div className='dotTransparent'></div>
                    <div className='dotWhite'></div>
                    <div className='dotTransparent'></div>
                </div>
            </div>

            <div className='dotContainer'>
                <div className='dotOrange'></div>
                <div className='dotTransparent'></div>
                <div className='dotWhite'></div>
                <div className='dotTransparent'></div>
                <div className='dotOrange'></div>
            </div>
            <Modal title='中奖提示' visible={modalVisible} okText={'再抽奖一次'} onCancel={() => {
                setModalVisible(false);
                props.handleChange(prize);
            }}
                onOk={() => {
                    setModalVisible(false);
                    lottery();
                    props.handleChange(prize);
                }}
            >
                <img src={prize !== null ? giftList[map.get(prize)].url : null} style={{ width: '80px', height: '80px' }} />
                <p>恭喜您获得奖品:{prize}</p>
            </Modal>
        </div>
    )
}