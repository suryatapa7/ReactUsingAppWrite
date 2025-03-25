import React, {forwardRef, useId} from 'react';
//forwardRef: It is a utility in react that allow a component to forward it's reference to a children component

const Input = forwardRef(function Input({ label, type = "text", className = "", ...props }, ref) {
    const id = useId();
    return (
        <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>}

          <input className='w-full p-2 border border-gray-300 rounded' type={type} ref={ref} {...props} id={id} />
        </div>
    );

})

export default Input;
