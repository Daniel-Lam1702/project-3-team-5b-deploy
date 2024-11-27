import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import prop-types for validation
import {
    Box,
    Typography,
    TextField,
    Button,
    Switch,
} from "@mui/material";
import "./MenuItemEditForm.css";

const MenuItemEditForm = ({
    rowData,
    onSave,
    onCancel,
    onChange,
    title,
    newImage,
    setNewImage,
    handleImageUpload,
}) => {
    const [imagePreview, setImagePreview] = useState(null);
    useEffect(() => {
        if (newImage) {
            const previewUrl = URL.createObjectURL(newImage); // Create a temporary URL for the file
            setImagePreview(previewUrl); // Save the URL in state
        }
    }, [newImage]);

    const handleRemoveImage = () => {
        setImagePreview(null);
        setNewImage(null);
        onChange({ ...rowData, image: null }); // Clear the image in rowData
    };

    return (
        <Box
            className="edit-container"
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                bgcolor: "background.paper",
                boxShadow: 4,
                padding: 3,
                zIndex: 5,
            }}
        >
            <h2>{title}</h2>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={rowData.name}
                onChange={(e) => onChange({ ...rowData, name: e.target.value })}
            />
            <TextField
                label="Base Price"
                fullWidth
                margin="normal"
                value={rowData.base_price}
                onChange={(e) =>
                    onChange({ ...rowData, base_price: e.target.value })
                }
            />
            <TextField
                label="Description"
                fullWidth
                margin="normal"
                value={rowData.description}
                onChange={(e) =>
                    onChange({ ...rowData, description: e.target.value })
                }
            />
            <Box mt={2}>
                <Typography>Upload New Image:</Typography>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ marginTop: "8px" }}
                />
                <Box mt={2}>
                    {newImage ? (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                                marginTop: "8px",
                                width: "150px",
                                height: "100px",
                                objectFit: "cover",
                                border: "1px solid #ccc",
                            }}
                        />
                    ) : rowData.image ? (
                        <img
                            src={rowData.image}
                            alt="Current"
                            style={{
                                marginTop: "8px",
                                width: "150px",
                                height: "100px",
                                objectFit: "cover",
                                border: "1px solid #ccc",
                            }}
                        />
                    ) : (
                        <Typography style={{ marginTop: "8px" }}>
                            No Image Available
                        </Typography>
                    )}
                    {(imagePreview || rowData.image) && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleRemoveImage}
                            sx={{ mt: 1 }}
                        >
                            Remove Image
                        </Button>
                    )}
                </Box>
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography>Max Entrees:</Typography>
                <Button
                    className="plus"
                    variant="outlined"
                    sx={{
                        bgcolor: "green",
                        color: "white",
                        "&:hover": {
                            bgcolor: "darkgreen",
                        },
                    }}
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxentrees: (rowData.maxentrees || 0) + 1,
                        })
                    }
                >
                    +
                </Button>
                <Typography>{rowData.maxentrees ?? "None"}</Typography>
                <Button
                    className="minus"
                    variant="outlined"
                    sx={{
                        bgcolor: "red",
                        color: "white",
                        "&:hover": {
                            bgcolor: "darkred",
                        },
                    }}
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxentrees: Math.max(
                                0,
                                (rowData.maxentrees || 0) - 1
                            ),
                        })
                    }
                >
                    -
                </Button>
                <Button
                    variant="outlined"
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxentrees: null,
                        })
                    }
                >
                    None
                </Button>
            </Box>

            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Typography>Max Sides:</Typography>
                <Button
                    className="plus"
                    variant="outlined"
                    sx={{
                        bgcolor: "green",
                        color: "white",
                        "&:hover": {
                            bgcolor: "darkgreen",
                        },
                    }}
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxsides: (rowData.maxsides || 0) + 1,
                        })
                    }
                >
                    +
                </Button>
                <Typography>{rowData.maxsides ?? "None"}</Typography>
                <Button
                    variant="outlined"
                    className="minus"
                    sx={{
                        bgcolor: "red",
                        color: "white",
                        "&:hover": {
                            bgcolor: "darkred",
                        },
                    }}
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxsides: Math.max(
                                0,
                                (rowData.maxsides || 0) - 1
                            ),
                        })
                    }
                >
                    -
                </Button>
                <Button
                    variant="outlined"
                    onClick={() =>
                        onChange({
                            ...rowData,
                            maxsides: null,
                        })
                    }
                >
                    None
                </Button>
            </Box>

            <Box mt={2} display="flex" alignItems="center">
                <Typography>Has Drink:</Typography>
                <Switch
                    checked={rowData.hasdrink}
                    onChange={(event) =>
                        onChange({
                            ...rowData,
                            hasdrink: event.target.checked,
                        })
                    }
                />
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
                <Button className="plus" variant="contained" color="primary" onClick={onSave}>
                    Save
                </Button>
                <Button className="minus" variant="outlined" color="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

MenuItemEditForm.propTypes = {
    rowData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        base_price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        description: PropTypes.string,
        maxentrees: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        maxsides: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        hasdrink: PropTypes.bool,
        image: PropTypes.string,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    newImage: PropTypes.string,
    handleImageUpload: PropTypes.func.isRequired,
};

export default MenuItemEditForm;
