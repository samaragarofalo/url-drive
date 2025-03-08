import { useState } from 'react';
import { Button, Typography, Box, List, ListItem, ListItemText, TextField } from '@mui/material';
import SelectField from '../select/SelectField';


const FileManager = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [selectedUrl, setSelectedUrl] = useState<string>('');
    
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles([...files, ...Array.from(event.target.files)]);
        }
    };

    return (
        <Box 
        p={3}
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        >
            <Typography variant="h4" gutterBottom>File Manager</Typography>
            <div>
                <TextField
                id="new-url"
                variant="standard"
                />
                <label htmlFor='new-url'>
                Insert the path you wish to save your file.
                </label>
            </div>
            <Typography variant="h4" gutterBottom>OR</Typography>
            <div>
                <SelectField
                label='Select an existing URL path'
                apiUrl='http://127.0.0.1:8000/api/urls/'
                onChange={(value) => setSelectedUrl(value)}/>
            </div>
            <div>
                <input
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="file-upload"
                />
                <label htmlFor="file-upload">
                <Button variant="contained" component="span">Upload Files</Button>
                </label>
            </div>
            <List>
            {files.map((file, index) => (
            <ListItem key={index}>
            <ListItemText primary={file.name} />
            </ListItem>
            ))}
            </List>
        </Box>
    );
};

export default FileManager;
