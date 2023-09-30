// FilterSelection.js
import React from 'react';

const FilterSelection = ({ options, selected, handleButtonClick, isButtonSelected }) => {
    return (
        <div className='options'>
            {options.map((option) => (
                <button
                    type='button'
                    key={option.value}
                    onClick={() => handleButtonClick(option.value)}
                    className={isButtonSelected(option.value) ? 'selected' : ''}
                    value={option.value}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default FilterSelection;
