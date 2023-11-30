import React from "react";
import Select from "react-select";

type optionProp = {
    label: string;
    value: string | number;
};

type DropDownProps = {
    options: optionProp[];
    value?: string;
    id?: string;
    name?: string;
    handleChange?: (e: any) => void;
    handleInputChange?: (e: any) => void;
    placeholder?: string;
    handleBlur?: (e: any) => void;
    isError?: boolean;
    error?: string;
    isLoading?: boolean;
};

const DropDown:React.FC<DropDownProps> = ({options,value,id,name,handleChange,handleInputChange,placeholder,handleBlur,isError,error,isLoading}) => {
    return (
        <div className="mb-2 w-full">
            <Select
                isClearable
                options={options}
                id={id}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                onBlur={handleBlur}
                isLoading={isLoading}
                defaultValue={isLoading ? null : options.map((option) => option.value === value ? option : null)}   
                onInputChange={handleInputChange}
            />
            {isError && <p className="text-red-500 ml-4">{error}</p>}
        </div>
    );
};

export default DropDown;
