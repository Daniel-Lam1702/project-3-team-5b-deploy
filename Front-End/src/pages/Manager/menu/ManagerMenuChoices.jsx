import axios from 'axios';
import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useFetchData } from '../../../api/useFetchData';
import './ManagerMenuItems.css';
import Navbar from '../../Authentication/Navbar';
import MenuChoicesEditForm from './MenuChoicesEditForm';
/**
 * ItemComponentsTable Page
 *
 * This component provides a UI for managing menu item components, allowing users
 * to view, create, edit, and delete item components along with their associated images
 * and ingredients.
 *
 * Features:
 * - Display a list of item components in a DataGrid with support for pagination and filtering.
 * - Edit and add new menu items through a dialog form.
 * - Upload, update, and delete images using Cloudinary.
 * - Manage adding, editing, and removing ingredients for each item component.
 *
 * @component
 * @returns {JSX.Element} A rendered React component to manage item components.
 */
export default function ItemComponentsTable() {
  const [editRow, setEditRow] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [loadingIngredients, setLoadingIngredients] = useState(false);

  const {
    data: itemComponents = [],
    loading: loadingItemComponents,
    error: errorItemComponents,
    refetch
  } = useFetchData('item-components');

  const baseUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000'
      : import.meta.env.VITE_POS_API_BASE_URL;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_ITEM_COMPONENT_PRESET;

  /**
   * Opens the ingredients dialog and fetches the ingredient data for a given row.
   * @param {Object} row - The row object representing an item component.
   */
  const handleOpenIngredients = (row) => {
    setCurrentRow(row);
    setLoadingIngredients(true);
    fetch(`${baseUrl}/api/item-components/${row.id}/ingredients`)
      .then((response) => response.json())
      .then((data) => {
        setIngredients(data);
        setLoadingIngredients(false);
        setOpen(true);
      })
      .catch((err) => {
        console.error('Error fetching ingredients:', err);
        setLoadingIngredients(false);
      });
  };

  /**
   * Extracts the public ID from a Cloudinary image URL.
   * @param {string} publicId - The Cloudinary image URL.
   * @returns {string} The extracted public ID without the version prefix or file extension.
   */
  const extractPublicId = (publicId) => {
    // Remove the version prefix (e.g., v1732658861/) and the file extension
    const parts = publicId.split('/');
    const startIndex = parts.findIndex((part) => part === 'ItemComponent'); // Find the folder name
    const cleanId = parts.slice(startIndex).join('/'); // Join everything after 'ItemComponent'
    return cleanId.replace(/\.[^/.]+$/, ''); // Remove the file extension
  };

  /**
   * Deletes an image from Cloudinary based on its public ID.
   * @param {string} publicId - The public ID of the Cloudinary image.
   */
  const deleteImageFromCloudinary = async (publicId) => {
    try {
      await fetch(`${baseUrl}/api/delete-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: publicId }),
      });
    } catch (deleteError) {
      console.error("Error deleting existing image from Cloudinary:", deleteError);
      alert("Failed to delete existing image from Cloudinary. Please manually remove it.");
    }
  };
  
  /**
   * Deletes an item component, including deleting the associated image from Cloudinary.
   * @param {Object} row - The row object representing an item component to be deleted.
   */
  const handleDeleteClick = async (row) => {
    const isSure = window.confirm("Are you sure you want to delete this Menu Choice?");
    if (!isSure) return;

    try {
        const imagePublicId = extractPublicId(row.image); // Extract the Cloudinary public_id from the image URL
        await deleteImageFromCloudinary(imagePublicId);

        await fetch(`${baseUrl}/api/item-components/${row.id}`, { method: 'DELETE' });
        refetch(); // Refetch data after deletion
    } catch (error) {
        console.error("Failed to delete item:", error);
    }
  };

  /**
   * Handles closing the ingredients dialog.
   */
  const handleClose = () => {
    setOpen(false);
    setIngredients([]);
  };

  if (loadingItemComponents) return <CircularProgress />;
  if (errorItemComponents)
    return <Typography color="error">{errorItemComponents}</Typography>;
  
  /**
   * Opens the form to edit an item component.
   * Fetches the ingredient list to be displayed in the form.
   * @param {Object} row - The row object representing an item component to be edited.
   */
  const handleEditClick = (row) => {
    fetch(`${baseUrl}/api/item-components/${row.id}/ingredients`)
    .then((response) => response.json())
    .then((data) => {
      // Add fetched ingredients to the row
      const rowWithIngredients = {
        ...row,
        ingredients: data || [], // Default to an empty array if no ingredients
      };
      setEditRow(rowWithIngredients); // Set the row with ingredients as the one being edited
      setLoadingIngredients(false); // Stop loading state
    })
    .catch((err) => {
      console.error('Error fetching ingredients:', err);
      setLoadingIngredients(false); // Stop loading state even on error
    });
  };

  /**
   * Opens the form to create a new item component.
   */
  const handleCreateClick = () => {
    setCreateMode(true);
  };

  /**
   * Saves a new or edited item component, including uploading or updating associated images.
   * @param {Object} data - The form data representing the new or edited item component.
   */
  const handleSave = (data) => {
    let uploadedImageUrl = null;
    let uploadedPublicId = null;
  
    // Define an IIFE for handling the save logic
    (async () => {
        try {
          // Remove spaces from the new name
        const sanitizedName = data.name.replace(/\s+/g, '').toLowerCase();
        if (createMode){
          // Check if the name is unique
          const nameExists = itemComponents.some(
            (item) => item.name.replace(/\s+/g, '').toLowerCase() === sanitizedName
          );
          if (nameExists) {
            alert("An item with this name already exists. Please choose a different name.");
            return;
          }
        }
        // Check if the image needs uploading
        if (data.image && !data.image.includes("cloudinary")) {
          // Delete the existing image if present
          if (editRow && editRow.image) {
            const publicId = extractPublicId(editRow.image);
            await deleteImageFromCloudinary(publicId);
          }
          // Uploading the new image.
          if (!data.image.includes("image/")) {
            alert("Invalid file type. Please upload an image.");
            return;
          }
  
          const formData = new FormData();
          formData.append("file", data.image);
          formData.append("upload_preset", uploadPreset);
  
          const customFilename = (data.name || "Unnamed")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("");
          formData.append("public_id", `ItemComponent/${customFilename}`);
  
          try {
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              formData
            );
            uploadedImageUrl = response.data.secure_url; // Get secure URL from response
            uploadedPublicId = response.data.public_id; // Store the public_id for potential deletion
          } catch (uploadError) {
            console.error("Error uploading to Cloudinary:", uploadError);
            alert(`Image upload failed: ${uploadError.response?.data?.error?.message || "Unknown error"}`);
            return;
          }
        } else if (editRow && editRow.image && !data.image){
          const publicId = extractPublicId(editRow.image);
          await deleteImageFromCloudinary(publicId);
        } else {
          uploadedImageUrl = data.image || null; // Allow null if no image is provided
        }
  
        // Prepare the new or updated menu choice
        const newMenuChoice = { ...data, image: uploadedImageUrl };
  
        // Create or update logic
        const endpoint = createMode
          ? `${baseUrl}/api/item-components`
          : `${baseUrl}/api/item-components/${editRow.id}`;
        const method = createMode ? "post" : "put";
  
        try {
          await axios({
            method,
            url: endpoint,
            headers: { "Content-Type": "application/json" },
            data: newMenuChoice,
          });
        } catch (saveError) {
          console.error("Error saving menu choice:", saveError);
          alert(`Failed to save menu choice: ${saveError.response?.data || "Unknown error"}`);
          // Delete the image from Cloudinary if the save fails
          if (uploadedPublicId) {
            try {
              await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`,
                { public_id: uploadedPublicId },
                { headers: { "Content-Type": "application/json" } }
              );
            } catch (deleteError) {
              console.error("Error deleting image from Cloudinary:", deleteError);
              alert("Failed to delete image from Cloudinary. Please manually remove it.");
            }
          }
          return;
        }
  
        refetch(); // Refresh the data
        setEditRow(null);
        setCreateMode(false);
      } catch (error) {
        console.error("Error in handleSave:", error);
        alert(`An error occurred: ${error.message || "Unknown error"}`);
      }
    })(); // IIFE to wrap async logic
  };
  
  /**
   * Closes the create/edit form.
   */
  const handleCloseForm = () => {
    setEditRow(null);
    setCreateMode(false);
  };

  /**
   * Returns nutritional values for display in the DataGrid.
   * @param {Object} params - The DataGrid cell parameters.
   * @returns {string} The formatted value or "N/A" if not present.
   */
  const getNutritionalValue = (params) => params.value ? params.value : "N/A";

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 150, renderCell: (params) => params.value.replace(/_/g, ' ') },
    {
      field: 'extra_cost',
      headerName: 'Extra Cost',
      width: 120,
      renderCell: (params) => `$${params.value}`,
    },
    {
      field: 'allergens',
      headerName: 'Allergens',
      width: 250,
      renderCell: (params) =>{
        return (params.value && params.value.length > 1) ? params.value.join(', ') : (params.value && params.value.length === 1 && params.value[0] !== '') ? params.value[0] : 'None'},
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      sortable: false,
      renderCell: (params) =>
        params.value ? (
          <img
            src={params.value}
            alt={params.row.name}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        ) : (
          'No Image'
        ),
    },
    { field: 'serving_size', headerName: 'Serving Size (oz)', width: 150 , renderCell: getNutritionalValue},
    { field: 'calories', headerName: 'Calories', width: 100, renderCell: getNutritionalValue},
    { field: 'fat_calories', headerName: 'Fat Calories', width: 150, renderCell: getNutritionalValue},
    { field: 'total_fat', headerName: 'Total Fat (g)', width: 120, renderCell: getNutritionalValue },
    { field: 'saturated_fat', headerName: 'Saturated Fat (g)', width: 150, renderCell: getNutritionalValue },
    { field: 'cholesterol', headerName: 'Cholesterol (mg)', width: 150, renderCell: getNutritionalValue },
    { field: 'sodium', headerName: 'Sodium (mg)', width: 120, renderCell: getNutritionalValue },
    { field: 'carbs', headerName: 'Carbs (g)', width: 100, renderCell: getNutritionalValue },
    { field: 'fiber', headerName: 'Fiber (g)', width: 100, renderCell: getNutritionalValue },
    { field: 'sugar', headerName: 'Sugar (g)', width: 100, renderCell: getNutritionalValue },
    { field: 'protein', headerName: 'Protein (g)', width: 100, renderCell: getNutritionalValue },
    { field: 'trans_fat', headerName: 'Trans Fat (g)', width: 100, renderCell: getNutritionalValue },
    {
      field: 'ingredients',
      headerName: 'Ingredients',
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Button
          className="ingredients-button"
          variant="contained"
          onClick={() => handleOpenIngredients(params.row)}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          Ingredients
        </Button>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: (params) => (
          <Button className='delete-button' variant="contained" sx={{bgcolor: "red", "&:hover": {bgcolor: "darkred",},}} onClick={() => handleDeleteClick(params.row)}>
              Delete
          </Button>
      ),
    },
  ];

  const rows = itemComponents.map((item) => ({
    ...item,
    id: item.id, // Ensure `id` is present as a unique identifier for DataGrid
  }));

  return (
    <>
      <div className="mb-4">
        <Navbar backLink={"/manage-stuff/menu/"}/>
        <h1 className="text-white text-4xl mt-4">Manage Item Components</h1>
      </div>
      <Paper
        sx={{
          height: '80%',
          width: '100%',
          p: 2,
          mb:2,
          bgcolor: 'background.paper',
        }}
      >
        <Box
          sx={{
            height: 600,
            width: '100%',
            overflow: 'auto', // Ensures horizontal scrollbar appears if needed
          }}
        >
          <DataGrid
            className="table"
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10]}
            sx={{
              border: 0,
              '& .MuiDataGrid-row:hover': {
                bgcolor: 'action.hover',
              },
            }}
            rowHeight={100}
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </Paper>
      <Button variant="contained" color="success" onClick={handleCreateClick}>
        Create New Menu Choice
      </Button>

      {(editRow || createMode) && (
        <MenuChoicesEditForm
          open={!!(editRow || createMode)}
          onClose={handleCloseForm}
          onSave={handleSave}
          initialData={editRow || {}}
          isEdit={!!editRow}
        />
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            textAlign: 'center',
            py: 2,
          }}
        >
          Ingredients for {currentRow?.name}
        </DialogTitle>
        <DialogContent>
          {loadingIngredients ? (
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          ) : ingredients.length > 0 ? (
            <Box sx={{ mt: 2, overflowX: 'auto' }}>
              <table className="ingredients-table">
                <thead>
                  <tr>
                    <th>Ingredient ID</th>
                    <th>Ingredient Name</th>
                    <th>Quantity Required</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredients.map((ingredient) => (
                    <tr key={ingredient.ingredient_id}>
                      <td>{ingredient.ingredient_id}</td>
                      <td>{ingredient.ingredient_name}</td>
                      <td>{ingredient.quantity_required}</td>
                      <td>{ingredient.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          ) : (
            <Typography>No ingredients available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            sx={{
              bgcolor: 'secondary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'secondary.dark',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
