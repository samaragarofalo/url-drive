import { useState, useEffect } from 'react';
import { Button, Typography, List, ListItem, ListItemText, Select, MenuItem, InputLabel, FormControl, TextField, Paper, Container } from '@mui/material';

interface UrlItem {
    id: number;
    url_path: string;
}

const FileManager = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [urls, setUrls] = useState<UrlItem[]>([]);
    const [selectedUrl, setSelectedUrl] = useState<string>('');
    const [newUrl, setNewUrl] = useState<string>('');

    useEffect(() => {
        const fetchUrls = async () => {
            try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:8000/api/urls/', {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch URLs');
            }

            const data = await response.json();
            setUrls(data);

            } catch (error) {
                console.error('Error fetching URLs:', error);
            }
        };
        fetchUrls();
    }, []);

    const handleNewUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9-_/]/g, '');
        setNewUrl(sanitizedValue);
    };
    
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles([...files, ...Array.from(event.target.files)]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!newUrl && !selectedUrl) {
            alert('Please insert or select a URL');
            return;
        }

        if (files.length === 0) {
            alert('Please select at least one file');
            return;
        }

        const formData = new FormData();
        files.forEach((file) => formData.append('file', file));
        formData.append('url', newUrl || selectedUrl);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:8000/upload/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`

                },
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            alert('Upload successful!');

            setFiles([]);
            setNewUrl('');
            setSelectedUrl('');
        } catch (error) {
            alert('Upload failed, please try again.');
        }
    };

    return (
        <Container 
        maxWidth="sm"
        sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '100vh' 
        }}
        >
            <Paper 
            elevation={3} 
            sx={{ p: 4, mt: 4 }}
            >
                <Typography 
                variant="h4" 
                gutterBottom
                >
                    File Manager
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                    label="Insert URL" 
                    fullWidth 
                    margin="normal" 
                    value={newUrl} 
                    onChange={handleNewUrlChange} 
                    />
                    <Typography 
                    variant="body1" 
                    align="center" 
                    sx={{ my: 2 }}
                    >
                        OR
                    </Typography>
                    <FormControl 
                    fullWidth 
                    margin="normal"
                    >
                        <InputLabel 
                        id="url-select-label"
                        >
                            Choose from an existing URL
                        </InputLabel>
                        <Select
                            labelId="url-select-label"
                            value={selectedUrl}
                            onChange={(e) => setSelectedUrl(e.target.value)}
                        >
                            <MenuItem value="">Select...</MenuItem>
                            {urls.map((url) => (
                                <MenuItem key={url.id} value={url.url_path}>{url.url_path}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="file-upload"
                    />
                    <label 
                    htmlFor="file-upload"
                    >
                        <Button 
                        variant="contained" 
                        component="span" 
                        fullWidth
                        >
                            Upload Files
                        </Button>
                    </label>
                    <List>
                    {files.map((file, index) => (
                        <ListItem key={index}>
                        <ListItemText primary={file.name} />
                        </ListItem>
                    ))}
                    </List>
                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default FileManager;