import { useState } from 'react';
import './app.scss';
import ThinTemplate from './templates/ThinTemplate/thin-template';
import ReactMarkdown from 'react-markdown';
import objective from './objective.js';
import rehypeRaw from 'rehype-raw';
import FilterSelection from './FilterSelection.js'; // Import the FilterSelection component


const options = [
    { value: null, label: 'All' },
    { value: 100, label: '$100' },
    { value: 200, label: '$200' },
    { value: 300, label: '$300' },
    { value: 400, label: '$400' },
    { value: 500, label: '$500' },
]


function App() {
    const [selected, setSelected] = useState([]);

    const handleButtonClick = (value) => {
        const allSelected = selected.includes(null);
      
        if (value === null) {
            // Toggle "All" button only if it's not already selected
            if (allSelected) {
                setSelected([]);
            } else {
                setSelected([null]);
            }
        } else if (selected.includes(value)) {
            // Deselect the option
            const updatedSelection = selected.filter((item) => item !== value);
            setSelected(updatedSelection);
        } else {
            // Handle range selection
            let start = Math.min(...selected, value);
            let end = Math.max(...selected, value);
      
            const rangeValues = [];
            for (let i = start; i <= end; i += 100) {
                if (i !== 0) {
                    rangeValues.push(i);
                }
            }
      
            // If "All" was previously selected, deselect "All" and restore the previous selection
            if (allSelected) {
                const restoredSelection = selected.filter((item) => item !== null && item !== value);
                setSelected([...restoredSelection, ...rangeValues]);
            } else {
                setSelected((prevSelected) => {
                    const newSelected = [...prevSelected, ...rangeValues];
                    return [...new Set(newSelected)]; // Remove duplicates
                });
            }
        }
    };
    
    const isButtonSelected = (value) => {
        if (value === null) {
            return selected.includes(null);
        }
        return selected.includes(value);
    };

    return (
        <ThinTemplate instructionTitle="Front-end Interview">
            <FilterSelection
                options={options}
                selected={selected}
                handleButtonClick={handleButtonClick}
                isButtonSelected={isButtonSelected}
            />

            <ReactMarkdown rehypePlugins={[rehypeRaw]} className='markdown' children={objective} />

            <h2>Selected State</h2>
            <pre>
                {JSON.stringify(selected.sort((a, b) => a - b), 0, 2)}
            </pre>
        </ThinTemplate>
    );
}

export default App;
