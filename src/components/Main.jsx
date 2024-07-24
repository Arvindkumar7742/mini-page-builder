import React, { useState } from 'react'
import { Modal } from './Modal';

export const Main = () => {

    const [draggedElements, setDraggedElements] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const [selectedElement, setSelectedElemnt] = useState(null);
    const [editFlag, setEditFlag] = useState(false);
    const [data, setData] = useState({
        text: "",
        x: "",
        y: "",
        fontSize: "",
        fontWeight: "",
        type: "",
        id: ""
    })

    function handleOnDrop(e) {
        const sideFlag = e.dataTransfer.getData("sideFlag");
        let x = e.clientX;
        let y = e.clientY;
        if (sideFlag) {
            const type = e.dataTransfer.getData("type");
            setData({ x, y, type });
            setOpenModal(true);
            return;
        }
        const id = e.dataTransfer.getData("id");

        const filteredDraggedElements = draggedElements.filter((item) => (item.id !== id));
        const ele = draggedElements.find((element) =>element.id == id);

        ele.x = x;
        ele.y = y;
        setDraggedElements([...filteredDraggedElements, ele]);
        return;
    }
    function handleOnDrogOver(e) {
        e.preventDefault();
    }

    function handleOnDrag(e, id) {
        e.dataTransfer.setData("id", id);
        
    }

    function clickHandler(id) {
        setSelectedElemnt(id);
    }

    function enterHandler(id) {
        const ele = draggedElements.find((element) => element.id === id);
        setData(ele);
        setEditFlag(true);
        setOpenModal(true);
    }

    function deleteHandler(id) {
        const filteredDraggedElements = draggedElements.filter((item) => (item.id !== id));
        setDraggedElements(filteredDraggedElements);
        return;
    }
    return (
        <div
            onDrop={handleOnDrop}
            onDragOver={handleOnDrogOver}
            className='bg-blue-100  w-full h-full relative'>
            {
                draggedElements.map((item, index) =>
                (<div
                    tabIndex="0"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            enterHandler(item.id);
                        } else if (e.key === 'Delete') {
                            deleteHandler(item.id);
                        }
                    }}
                    key={index}
                    draggable
                    onDragStart={(e) => {
                        handleOnDrag(e, item.id);
                    }}
                    style={{
                        position: 'absolute', left: item.x, top: item.y,
                        "font-size": item.fontSize + "px", "fontWeight": item.fontWeight
                    }}
                    onClick={() => {
                        clickHandler(item.id);
                    }}
                    className={`${selectedElement == item.id && "border-2 border-red-400"}`}
                >
                    {item.type == "Label" && <div
                    >{item.text}</div>}

                    {item.type == "Input" && <input
                        className={`outline-none border-2 p-2 border-slate-300`}
                        defaultValue={item.text}
                        type="text" />}

                    {item.type === 'Button' && <button
                        className={`text-white bg-black h-[40px] rounded-md pl-3 pr-3 shadow-md hover:bg-gray-800
                             active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105`}>
                        {item.text}
                    </button>}
                </div>)
                )
            }
            {
                openModal && <Modal data={{ editFlag, setEditFlag, setData, setOpenModal, draggedElements, setDraggedElements, data }}></Modal>
            }
        </div>
    )
}
