import React, { useState } from "react";

import MultilineChart from "./views/MultilineChart";
import Legend from "./views/Legend";
import schc from "./SCHC.json";
import vcit from "./VCIT.json";
import portfolio from "./portfolio.json";

import "./styles.css";
import Feature from "./views/PieChart/Feature";
import BarChart from "./views/BarChart/BarChart";
import { ScarletPlotWrapper } from "./views/ScarletPlot/ScarletPlotWrapper";

const portfolioData = {
    name: "Fixed Organization Value",
    color: "#ffffff",
    items: portfolio.map((d) => ({ ...d, date: new Date(d.date) }))
};
const schcData = {
    name: "First Organization",
    color: "#a29e4f",
    items: schc.map((d) => ({ ...d, date: new Date(d.date) }))
};
const vcitData = {
    name: "Second Organization",
    color: "#1e4fa7",
    items: vcit.map((d) => ({ ...d, date: new Date(d.date) }))
};

const dimensions = {
    width: 1310,
    height: 900,
    margin: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 60
    }
};

export const App = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const legendData = [portfolioData, schcData, vcitData];
    const chartData = [
        portfolioData,
        ...[schcData, vcitData].filter((d) => selectedItems.includes(d.name))
    ];
    const onChangeSelection = (name) => {
        const newSelectedItems = selectedItems.includes(name)
            ? selectedItems.filter((item) => item !== name)
            : [...selectedItems, name];
        setSelectedItems(newSelectedItems);
    };

    return (
        <div className="wrapper">
            <div className="App">
                <Legend
                    data={legendData}
                    selectedItems={selectedItems}
                    onChange={onChangeSelection}
                />
                <MultilineChart data={chartData} dimensions={dimensions} />
            </div>
            <div className="wrapperPie">
                <Feature />
            </div>
            <div className="wrapperBar">
                <BarChart />
            </div>
            <div className="wrapperBar">
                <ScarletPlotWrapper />
            </div>
        </div>
    );
}
