import { useEffect, useRef, useState } from 'react';

import PieChart from './PieChart';

const Feature = () => {
    const [data, setData] = useState([]);
    const svgLargeRef = useRef();
    const svgMediumRef = useRef();
    const svgSmallRef = useRef();

    const randomNumber = (start = 100000, end = 999999) => {
        return Math.floor(Math.random() * end) + start;
    };

    useEffect(() => {
        const makeRandomData = () => {
            setData([]);
            ['JS', 'Python', '.Net', 'Java', 'GoLang', 'UI/UX']?.map((label) => {
                setData((prevData) => [
                    ...prevData,
                    { label, value: randomNumber(10, 99), fillColor: `#${randomNumber()}` }
                ]);
            });

            setTimeout(() => {
                makeRandomData();
            }, 1000 * 10);
        };

        makeRandomData();
    }, []);

    return (
        <div className="relative px-5 py-2">
            <div className="flex justify-center">
                <div className="w-[90vw] h-full">
                    <div className="flex w-full h-[75vh] justify-center items-start border border-dashed border-black text-white p-4 space-x-2">
                        <div ref={svgLargeRef} className="w-5/12 h-72 border border-gray-300 p-1">
                            <PieChart data={data} svgWrapperRef={svgLargeRef} padding={40} />
                        </div>
                        <div ref={svgMediumRef} className="w-4/12 h-72 border border-gray-300 p-1">
                            <PieChart data={data} svgWrapperRef={svgMediumRef} padding={50} />
                        </div>
                        <div ref={svgSmallRef} className="w-3/12 h-72 border border-gray-300 p-1">
                            <PieChart data={data} svgWrapperRef={svgSmallRef} padding={60} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;