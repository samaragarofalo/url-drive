import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useState, useEffect } from 'react';

interface Option {
    id: number;
    name: string;
}

interface SelectDropdownProps {
    label: string;
    apiUrl: string;
    onChange: (value: string) => void;
}

const SelectField: React.FC<SelectDropdownProps> = ({ label, apiUrl, onChange }) => {
    const [options, setOptions] = useState<Option[]>([])
    const [selected, setSelected] = useState<string>('')

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setOptions(data);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, [apiUrl]);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelected(value);
        onChange(value);
    };

      return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>{label}</InputLabel>
            <Select
            value={selected}
            onChange={handleChange}
            label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                        <em>{option.name}</em>
                    </MenuItem>
                ))}
                
            </Select>
        </FormControl>
      )
}

export default SelectField;