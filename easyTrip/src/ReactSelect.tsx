import Select, { OptionTypeBase, ValueType, ActionMeta } from 'react-select'
import React from 'react'

export interface IReactSelectProps {

    value: ValueType<OptionTypeBase>
    handleSingleChange:(value: ValueType<OptionTypeBase>, actionMeta: ActionMeta) => void;

}

export function ReactSelect(props: IReactSelectProps) {


    const options = [
        { value: 'hongkong', label: 'Hong Kong' },
        { value: 'london', label: 'London' },
        { value: 'singapore', label: 'Singapore' }
    ]


    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            height: '48px',
            borderRadius: "0"
        }),
    };


    return (
        <Select
            className="city"
            value={props.value}
            options={options}
            onChange={props.handleSingleChange}
            isClearable
            isSearchable
            placeholder="Enter destination (Country, City)"
            required
            styles={customStyles}
        />
    )
}