import React from "react";

const Legend = ({ data, selectedItems, onChange }) => (
    <div className="legendContainer">
        {data.map((d) => (
            <div className="checkbox" style={{ color: d.color }} key={d.name}>
                {d.name !== "Portfolio" && (
                    <>
                        <div style={{ color: d.color, height: '10px', width: '10px' }} />
                        <input
                            type="checkbox"
                            value={d.name}
                            style={{ color: d.color }}
                            checked={selectedItems.includes(d.name)}
                            onChange={() => onChange(d.name)}
                        />
                    </>
                )}
                <label>{d.name}</label>
            </div>
        ))}
    </div>
);

export default Legend;
