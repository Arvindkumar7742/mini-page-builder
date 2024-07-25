import React from 'react'
import { RxCross2 } from "react-icons/rx";

export const Modal = ({ data }) => {
    const editFlag = data.editFlag;
    function changeHandler(e) {
        data.setData((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }));
    }
    function submitHandler(e) {
        e.preventDefault();
        if (editFlag) {
            const id = data.data.id;
            console.log(data?.draggedElements);
            const filteredDraggedElements = data?.draggedElements.filter((item) => (item.id !== id));
            data.setDraggedElements([...filteredDraggedElements, data.data]);
            data.setEditFlag(false);
            data.setOpenModal(false);
            return;
        }
        data.data.id = new Date().getTime();
        data.setDraggedElements([...data?.draggedElements, data?.data]);
        data.setOpenModal(false);
    }
    return (
        <div className='fixed inset-0 grid place-items-center backdrop-dark'>
            <div className='flex flex-col gap-1 border-[1px] bg-white rounded-md w-[450px]'>
                <div className='flex flex-row justify-between items-center p-5'>
                    <div className='font-semibold text-xl'>
                        Edit {data.data.type}
                    </div>
                    <div className='text-xl'>
                        <button
                            onClick={() => {
                                data.setOpenModal(false);
                                data.setEditFlag(false);
                            }}><RxCross2 /></button>
                    </div>
                </div>
                <div className='w-full h-[1px] bg-[#AFB2BF]'></div>
                <form onSubmit={submitHandler}
                    className='flex flex-col gap-5 bg-white rounded-md p-5'
                >
                    <div className='flex flex-col'>
                        <label htmlFor="text">Text</label>
                        <input
                            placeholder={`Enter is text`}
                            className='outline-none border-2 border-slate-300'
                            onChange={changeHandler}
                            defaultValue={editFlag ? data.data.text : ""}
                            type="text" id='text' name='text'
                            required
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="x">x</label>
                        <input
                            className='outline-none border-2 border-slate-300'
                            onChange={changeHandler}
                            defaultValue={data.data.x}
                            type="number" id='x' name='x' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="y">y</label>
                        <input
                            className='outline-none border-2 border-slate-300'
                            onChange={changeHandler}
                            defaultValue={data.data.y}
                            type="number" id='y' name='y' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="fontSize">Font Size</label>
                        <input
                            className='outline-none border-2 border-slate-300'
                            onChange={changeHandler}
                            defaultValue={editFlag ? data.data.fontSize : ""}
                            type="number" id='fontSize' name='fontSize' />

                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="fontWeight">Font Weight</label>
                        <input
                            className='outline-none border-2 border-slate-300'
                            onChange={changeHandler}
                            defaultValue={editFlag ? data.data.fontWeight : ""}
                            type="number" id='fontWeight' name='fontWeight' />
                    </div>
                    <button
                        className='bg-blue-500 rounded-md mt-5 p-1 w-[150px] text-white'
                        type='submit'
                    >Save Changes</button>
                </form>
            </div>
        </div>
    )
}
