import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormHelperText,
    Autocomplete,
    Chip,
    Box,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';
import { Edit, Delete, Upload, Cancel } from '@mui/icons-material';
import { useFetchData } from '../../../api/useFetchData';

/**
 * MenuChoicesEditForm Component
 *
 * This component provides a dialog to create or edit a menu choice, including:
 * - Managing basic information such as name, category, allergens, and image.
 * - Adding, editing, and removing ingredients with their associated quantities.
 * - Validating numeric fields to ensure they are positive values.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Controls the visibility of the dialog.
 * @param {function} props.onClose - Function to call when the dialog is closed.
 * @param {function} props.onSave - Function to call when saving the form data.
 * @param {Object} props.initialData - Initial data used to pre-fill the form fields.
 * @param {boolean} props.isEdit - Indicates whether the form is for editing an existing menu choice.
 * @returns {JSX.Element} A rendered React component for managing menu choices.
 */
export default function MenuChoicesEditForm({ open, onClose, onSave, initialData, isEdit }) {
    const [formData, setFormData] = useState(initialData || {});

    const [errors, setErrors] = useState({});
    const [currentIngredient, setCurrentIngredient] = useState(null);
    const [quantityRequired, setQuantityRequired] = useState('');
    const [ingredientError, setIngredientError] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(formData.image || null);

    const {
        data: availableIngredients = [],
        loading: loadingIngredients,
        error: fetchIngredientsError,
    } = useFetchData('inventory');

    /**
     * Handles image upload and preview.
     * @param {Object} event - The event object triggered by the file input.
     */
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setUploadedImage(e.target.result);
            reader.readAsDataURL(file);

            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    /**
     * Handles removal of the uploaded image.
     */
    const handleRemoveImage = () => {
        setUploadedImage(null);
        setFormData((prev) => ({ ...prev, image: null }));
    };

    /**
     * Handles changes in input fields, including validation for numeric fields.
     * @param {Object} e - The change event triggered by input fields.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors((prev) => ({ ...prev, [name]: false })); // Clear errors
        // Ensure that numeric fields are positive
        if (numericFields.includes(name)) {
            if (parseFloat(value) >= 0) {
                setFormData((prev) => ({ ...prev, [name]: value })); // Update form data only if value is valid
            } else if (value === ''){
                setFormData((prev) => ({ ...prev, [name]: null }));
            } else {
                setErrors((prev) => ({ ...prev, [name]: `${name.replace(/_/g, ' ')} must be positive or zero.` }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value })); // Update form data for non-numeric fields
        }
    };

    /**
     * Handles adding a new ingredient to the list of ingredients for the menu item.
     */
    const handleAddIngredient = () => {
        if (!currentIngredient || !quantityRequired) {
        setIngredientError('Ingredient and quantity are required.');
        return;
        }

        if (isNaN(quantityRequired) || parseFloat(quantityRequired) <= 0) {
        setIngredientError('Quantity must be a positive number.');
        return;
        }

        setIngredientError('');

        const newIngredient = {
            ingredient_id: currentIngredient.id,
            ingredient_name: currentIngredient.name,
            unit: currentIngredient.unit,
            quantity_required: parseFloat(quantityRequired),
        };

        setFormData((prev) => ({
        ...prev,
        ingredients: [...(prev.ingredients || []), newIngredient],
        }));

        setCurrentIngredient(null);
        setQuantityRequired('');
    };

    /**
     * Handles editing an existing ingredient in the list.
     * @param {number} index - The index of the ingredient to be edited.
     */
    const handleEditIngredient = (index) => {
        const ingredient = formData.ingredients[index];
        setCurrentIngredient({ id: ingredient.ingredient_id, unit: ingredient.unit, name: ingredient.ingredient_name });
        setQuantityRequired(ingredient.quantity_required);
        setEditingIndex(index);
    };

    /**
     * Handles updating an ingredient that is currently being edited.
     */
    const handleUpdateIngredient = () => {
        if (!currentIngredient || !quantityRequired) {
        setIngredientError('Ingredient and quantity are required.');
        return;
        }

        if (isNaN(quantityRequired) || parseFloat(quantityRequired) <= 0) {
        setIngredientError('Quantity must be a positive number.');
        return;
        }

        setIngredientError('');

        const updatedIngredient = {
            ingredient_id: currentIngredient.id,
            ingredient_name: currentIngredient.name,
            quantity_required: parseFloat(quantityRequired),
        };

        setFormData((prev) => {
        const updatedIngredients = [...prev.ingredients];
        updatedIngredients[editingIndex] = updatedIngredient;
        return { ...prev, ingredients: updatedIngredients };
        });

        setCurrentIngredient(null);
        setQuantityRequired('');
        setEditingIndex(null);
    };

    /**
     * Handles deleting an ingredient from the list.
     * @param {number} index - The index of the ingredient to be deleted.
     */
    const handleDeleteIngredient = (index) => {
        setFormData((prev) => {
        const ingredientToDelete = prev.ingredients[index];

        // Reset current ingredient and quantity if it matches the one being deleted
        if (currentIngredient && currentIngredient.id === ingredientToDelete.ingredient_id) {
            setCurrentIngredient(null);
            setQuantityRequired('');
            setEditingIndex(null);
        }

        return {
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index),
        };
        });
    };

    // Numeric validation
    const numericFields = [
        'serving_size',
        'calories',
        'fat_calories',
        'total_fat',
        'saturated_fat',
        'cholesterol',
        'sodium',
        'carbs',
        'fiber',
        'sugar',
        'protein',
        'trans_fat',
    ];

    // Unit map for numeric fields
    const unitMap = {
        'serving_size': 'oz',
        'calories': 'cal',
        'fat_calories': 'cal',
        'total_fat': 'g',
        'saturated_fat': 'g',
        'cholesterol': 'mg',
        'sodium': 'mg',
        'carbs': 'g',
        'fiber': 'g',
        'sugar': 'g',
        'protein': 'g',
        'trans_fat': 'g',
    };

    /**
     * Handles saving the form data and validates the input before calling onSave.
     */
    const handleSave = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.category) newErrors.category = 'Category is required';

        if (!formData.extra_cost) {
            formData.extra_cost = 0;
        } else {
            const parsedValue = parseFloat(formData.extra_cost);
            if (isNaN(parsedValue) || parsedValue < 0) {
                newErrors.extra_cost = 'Extra cost must be a positive number or 0';
            } else {
                formData.extra_cost = parsedValue;
            }
        }
        // Numeric field validation
        numericFields.forEach((field) => {
            const value = formData[field];
            if (value !== undefined && value !== null && value !== '') {
                const parsedValue = parseFloat(value);
                if (isNaN(parsedValue) || parsedValue < 0) {
                    newErrors[field] = `${field.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} (${unitMap[field]}) must be a positive number or zero`;
                }
            }
        });
        
        if (!formData.ingredients || formData.ingredients.length === 0) {
            newErrors.ingredients = 'At least one ingredient is required.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onSave({ ...formData, image: uploadedImage });
        onClose();
    };

    const categoryOptions = [
        'side',
        'regular_entree',
        'premium_entree',
        'drink',
        'extra',
        'appetizer',
    ];

    const allergensList = [
        'Eggs',
        'Milk',
        'Soy',
        'Soybeans',
        'Wheat',
        'Sesame',
        'Shellfish',
        'Peanuts',
        'Tree nuts',
        'Fish',
    ];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>{isEdit ? `Edit Menu Choice (ID ${initialData.id})` : 'Create New Menu Choice'}</DialogTitle>
        <DialogContent>
            <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name || ''}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
            />
            <FormControl fullWidth margin="normal" error={!!errors.category} required>
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                >
                    {categoryOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option.replace(/_/g, ' ')}
                    </MenuItem>
                    ))}
                </Select>
                <FormHelperText>{errors.category}</FormHelperText>
            </FormControl>
            <TextField
                key="extra_cost"
                label="Extra Cost"
                name="extra_cost"
                fullWidth
                margin="normal"
                value={formData.extra_cost || ''}
                onChange={handleChange}
                error={!!errors.extra_cost}
                helperText={errors.extra_cost}
                type="number"
            />
            <Box sx={{ mt: 2, mb: 2}}>
                <Typography variant="h6">Image</Typography>
                {uploadedImage ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                    <img src={uploadedImage} alt="Uploaded Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    <Button
                    onClick={handleRemoveImage}
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2 }}
                    startIcon={<Cancel />}
                    >
                    Remove Image
                    </Button>
                </Box>
                ) : (
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<Upload />}
                    sx={{ mt: 2 }}
                >
                    Upload Image
                    <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageUpload}
                    />
                </Button>
                )}
            </Box>
            <Autocomplete
                multiple
                options={allergensList} // Predefined options for suggestions
                freeSolo // Allow users to add values outside the predefined list
                value={formData.allergens || []} // Ensure it's an array
                onChange={(event, newValue) => {
                    // Update the formData with new values
                    setFormData((prev) => ({ ...prev, allergens: newValue }));
                    setErrors((prev) => ({ ...prev, allergens: false })); // Clear any existing errors
                }}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip
                        key={index} // Unique key for each Chip element
                        variant="outlined"
                        label={option} // Display each selected allergen as a chip
                        {...getTagProps({ index })} // Props for managing chip behavior
                    />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                    {...params}
                    label="Allergens"
                    placeholder="Add allergens"
                    error={!!errors.allergens}
                    helperText={errors.allergens || 'Select or type allergens'}
                    />
                )}
                fullWidth
                margin="normal"
            />
            {/* Rest of the Numeric Fields */}
            {numericFields.map((field) => (
            <TextField
                key={field}
                label={`${field.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} (${unitMap[field]})`}
                name={field}
                fullWidth
                margin="normal"
                value={formData[field] || ''}
                onChange={handleChange}
                error={!!errors[field]}
                helperText={errors[field]}
                type="number"
            />
            ))}
            {/* Ingredient Management */}
            <Box sx={{ mt: 3 }}>
            {loadingIngredients ? (
                <CircularProgress />
            ) : (
                <>
                <Typography variant="h6">Add/Edit Ingredients</Typography>
                <Autocomplete
                    options={availableIngredients}
                    getOptionLabel={(option) => `${option.name} (${option.unit})`}
                    value={currentIngredient}
                    onChange={(event, newValue) => setCurrentIngredient(newValue)}
                    renderInput={(params) => (
                    <TextField {...params} label="Select Ingredient" fullWidth />
                    )}
                />
                <TextField
                    label="Quantity Required"
                    value={quantityRequired}
                    onChange={(e) => setQuantityRequired(e.target.value)}
                    type="number"
                    sx={{ mt: 2 }}
                    fullWidth
                />
                {ingredientError && <FormHelperText error>{ingredientError}</FormHelperText>}
                {errors.ingredients && <FormHelperText error>{errors.ingredients}</FormHelperText>}
                <Button
                    onClick={editingIndex !== null ? handleUpdateIngredient : handleAddIngredient}
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    {editingIndex !== null ? 'Update Ingredient' : 'Add Ingredient'}
                </Button>
                </>
            )}
            </Box>
            {formData.ingredients && formData.ingredients.length > 0 && (
            <TableContainer sx={{ mt: 3 }}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Ingredient</TableCell>
                    <TableCell>Quantity Required</TableCell>
                    <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formData.ingredients.map((ing, index) => (
                    <TableRow key={index}>
                        <TableCell>{ing.ingredient_name}</TableCell>
                        <TableCell>{ing.quantity_required}</TableCell>
                        <TableCell>
                        <IconButton onClick={() => handleEditIngredient(index)}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteIngredient(index)}>
                            <Delete />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="secondary">
            Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
            Save
            </Button>
        </DialogActions>
        </Dialog>
    );
}
