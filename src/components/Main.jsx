import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';

export const Main = () => {
    const [draggedElements, setDraggedElements] = useState(localStorage.getItem('elements') ? JSON.parse(localStorage.getItem('elements')) : []);
    const [openModal, setOpenModal] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [editFlag, setEditFlag] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const storedElements = JSON.parse(localStorage.getItem('elements'));
        if (storedElements) {
            setDraggedElements(storedElements);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('elements', JSON.stringify(draggedElements))
    }, [draggedElements]);

    const [data, setData] = useState({
        text: "",
        x: "",
        y: "",
        fontSize: "",
        fontWeight: "",
        type: "",
        id: ""
    });

    function handleOnDrop(e) {
        e.preventDefault();
        const sideFlag = e.dataTransfer.getData("sideFlag");
        let x = e.clientX;
        let y = e.clientY;

        if (sideFlag) {
            const type = e.dataTransfer.getData("type");
            const offset_x = e.dataTransfer.getData("offset_x");
            const offset_y = e.dataTransfer.getData("offset_y");
            x = x - offset_x;
            y = y - offset_y;
            setData({ text: "", fontSize: "", fontWeight: "", x, y, type });
            setOpenModal(true);
            return;
        }

        const id = e.dataTransfer.getData("id");
        const filteredDraggedElements = draggedElements.filter((item) => item.id != id);
        const ele = draggedElements.find((element) => element.id == id);

        ele.x = x - dragOffset.x;
        ele.y = y - dragOffset.y;
        setDraggedElements([...filteredDraggedElements, ele]);
    }

    function enterHandler(id) {
        console.log("enter pressed");
        const ele = draggedElements.find((element) => element.id == id);
        setData(ele);
        setEditFlag(true);
        setOpenModal(true);
    }

    function deleteHandler(id) {
        const filteredDraggedElements = draggedElements.filter((item) => item.id != id);
        setDraggedElements(filteredDraggedElements);
    }

    function handleDragStart(e, id) {
        const rect = e.target.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        e.dataTransfer.setData("id", id);
    }

    function handleInputChange(e, id) {
        const newDraggedElements = draggedElements.map((item) => {
            if (item.id === id) {
                return { ...item, text: e.target.value };
            }
            return item;
        });
        setDraggedElements(newDraggedElements);
    }

    return (
        <div
            onDrop={handleOnDrop}
            onDragOver={(e) => e.preventDefault()}
            className='bg-blue-100 w-full h-full relative'
            onClick={() => setSelectedElement(null)}
        >
            {draggedElements && draggedElements.map((item, index) => (
                <div
                    key={index}
                    tabIndex="0"
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            enterHandler(item.id);
                        } else if (e.key === 'Delete') {
                            deleteHandler(item.id);
                        }
                    }}
                    style={{
                        position: 'absolute',
                        left: item.x,
                        top: item.y,
                        fontSize: item.fontSize + "px",
                        fontWeight: item.fontWeight
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedElement(item.id);
                    }}
                    className={` ${selectedElement == item.id && "border-[4px] border-red-600"}`}
                >
                    {item.type === "Label" && <div>{item.text}</div>}
                    {item.type === "Input" && <input
                        onChange={(e) => handleInputChange(e, item.id)}
                        className="outline-none border-2 p-2 border-slate-300"
                        defaultValue={item.text}
                        type="text"
                    />}
                    {item.type === 'Button' && <button
                        className="text-white bg-blue-800 rounded-md p-2 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        {item.text}
                    </button>}
                </div>
            ))}
            {openModal && <Modal data={{ editFlag, setEditFlag, setData, setOpenModal, draggedElements, setDraggedElements, data }} />}
        </div>
    );
};