import React from 'react'
import { GrApps } from "react-icons/gr";

const Blocks = ["Label", "Input", "Button"];
export const Sidebar = () => {
    function handleOnDrag(e, type) {
        e.dataTransfer.setData("type", type);
        e.dataTransfer.setData("sideFlag", true);
        const rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        e.dataTransfer.setData("offset_x", x);
        e.dataTransfer.setData("offset_y", y);
    }
    return (
        <div className='bg-black w-1/4 h-full'>
            <p className='text-white mt-2 ml-2'>Blocks</p>
            <div className='flex flex-col gap-2 mt-2 ml-2 mr-3'>
                {
                    Blocks.map((item, index) => (
                        <div
                            draggable
                            onDragStart={(e) => {
                                handleOnDrag(e, item);
                            }}
                            key={index}
                            className='bg-white rounded-sm p-2 flex flex-row gap-2 items-center'>
                            <GrApps />
                            <p>{item}</p></div>
                    ))
                }
            </div>
        </div>
    )
}
