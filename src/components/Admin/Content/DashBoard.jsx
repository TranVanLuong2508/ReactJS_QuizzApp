import React, { useEffect, useState } from 'react'
import apiService from '../../../services/apiService';
import {
    Bar, BarChart, CartesianGrid, Legend,
    Line, Tooltip, XAxis, YAxis,
    ResponsiveContainer
} from 'recharts';

import './DashBoard.scss'

function DashBoard() {


    const [dataOverView, setDataOverView] = useState({})
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fetchDataOverView()
    }, [])

    const fetchDataOverView = async () => {
        let res = await apiService.getOverView()
        if (res && res.EC === 0) {
            setDataOverView(res.DT)
            //process chart data
            let Qz = 0, Qs = 0, As = 0
            Qz = res?.DT?.others?.countQuiz ?? 0
            As = res?.DT?.others?.countAnswers ?? 0
            Qs = res?.DT?.others?.countQuestions ?? 0

            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz,
                },
                {
                    "name": "Questions",
                    "Qs": As,
                },
                {
                    "name": "Answers",
                    "As": Qs,
                }
            ]

            setDataChart(data)

        }
    }
    console.log('check over', dataOverView)
    return (
        <div className='dashboard-container'>
            <div className="title">
                Analytics Dashboard
            </div>
            <div className="content">
                <div className="left-content">
                    <div className="child-content">
                        <span className='text-1'>Total users</span>
                        <span className="text-2">
                            {dataOverView && dataOverView.users && dataOverView.users.total ?
                                <>{dataOverView.users.total}</>
                                :
                                <></>
                            }</span>
                    </div>
                    <div className="child-content">
                        <span className='text-1'>Total Quizzes</span>
                        <span className="text-2">
                            {dataOverView && dataOverView.others && dataOverView.others.countQuiz ?
                                <>{dataOverView.others.countQuiz}</>
                                :
                                <></>
                            }</span>
                    </div>
                    <div className="child-content">
                        <span className='text-1'>Total Questios</span>
                        <span className="text-2">
                            {dataOverView && dataOverView.others && dataOverView.others.countQuestions ?
                                <>{dataOverView.others.countQuestions}</>
                                :
                                <></>
                            }
                        </span>
                    </div>
                    <div className="child-content">
                        <span className='text-1'>Total Answer</span>
                        <span className="text-2">
                            {dataOverView && dataOverView.others && dataOverView.others.countAnswers
                                ?
                                <>{dataOverView.others.countAnswers}
                                </>
                                :
                                <></>
                            }
                        </span>
                    </div>
                </div>
                <div className="right-content">
                    <ResponsiveContainer width={"95%"} height={"100%"}>
                        <BarChart data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#fcb122" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div >
    )
}

export default DashBoard