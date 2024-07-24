import React from 'react'

export const Modal = ({ data }) => {
    function changeHandler(e) {
        data.setData((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }));
    }
    function submitHandler() {
        data.data.id = new Date().getTime();
        data.setDraggedElements([...data.draggedElements, data.data]);
        console.log(data.draggedElements);
        data.setOpenModal(false);
    }
    return (
        <div className='fixed inset-1 grid place-items-center backdrop-dark'>
            <div className='flex flex-col border-[1px] bg-white p-6 rounded-md'>
                <div className='font-bold text-2xl'>
                    Edit {data.data.type}
                </div>
                <form onSubmit={submitHandler}
                className='flex flex-col border-[1px] bg-white p-6 rounded-md'
                >
                    <label htmlFor="text">Text</label>
                    <input
                        placeholder={`This is ${data.data.type}`}
                        className='outline-none border-2 border-slate-300'
                        onChange={changeHandler}
                        type="text" id='text' name='text'
                        required
                    />

                    <label htmlFor="x">x</label>
                    <input
                        className='outline-none border-2 border-slate-300'
                        onChange={changeHandler}
                        defaultValue={data.data.x}
                        type="text" id='x' name='x' />

                    <label htmlFor="y">y</label>
                    <input
                        className='outline-none border-2 border-slate-300'
                        onChange={changeHandler}
                        defaultValue={data.data.y}
                        type="text" id='y' name='y' />

                    <label htmlFor="fontSize">Font Size</label>
                    <input
                        className='outline-none border-2 border-slate-300'
                        onChange={changeHandler}
                        type="text" id='fontSize' name='fontSize' />

                    <label htmlFor="fontWeight">Font Weight</label>
                    <input
                        className='outline-none border-2 border-slate-300'
                        onChange={changeHandler}
                        type="text" id='fontWeight' name='fontWeight' />

                    <button
                        className='bg-blue-500 rounded-md mt-5 p-2 w-[6/12] text-white'
                        type='submit'
                    >Save Changes</button>
                </form>
            </div>
        </div>
    )
}
