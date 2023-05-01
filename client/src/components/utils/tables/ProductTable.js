import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import styles from './mystyles.module.css'; 
import { deleteProductDataById, updateProductData, getProductData } from '../../../slices/productSlice'
const columns = [
    { field: '_id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 290 },
    { field: 'countInStock', headerName: 'In stock', width: 130 },
    { field: 'price', headerName: 'price', type: 'number', width: 90, },
    { field: 'brand', headerName: 'Brand', width: 100 },

];


console.log("in product table")
export default function DataGridDemo() {
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteButton, setDeleteButton] = useState(true);
    const [addButton, setAddButton] = useState(false);
    const [editButton, setEditButton] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductData())
    }, [])

    const products = useSelector(state => state.product);

    async function deleteHandler() {
        const result = window.confirm(`Do you want to delete ${selectedRow.name}`);
        if (result) {
            await dispatch(deleteProductDataById(selectedRow._id));
            await dispatch(getProductData())
            setDeleteButton(true);
            //alert('Data deleted!!')
        }
    }
    function editHandler() {
        setOpenDialog(true)
    }
    function dialogCloseHandler() {
        setOpenDialog(false);
        setAddButton(null);
        setSelectedRow(null)
    }
    function addHandler() {
        setSelectedRow(null)
        setOpenDialog(true);
        setAddButton(true);

    }
    async function onSubmit(data) {
        const _id = selectedRow._id;
        const newData = { ...data, _id: _id };
        await dispatch(updateProductData(newData));
        await dispatch(getProductData())
        setOpenDialog(false);
    }


    return (
        <div style={{ height: 400, width: '100%' }}>
            {(selectedRow || addButton) && <Dialog open={openDialog} onClose={dialogCloseHandler} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register()}
                            defaultValue={selectedRow?.name || ''}
                            fullWidth
                            label="Name*"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register()}
                            defaultValue={selectedRow?.price || ''}
                            fullWidth
                            label="Price*"
                            name="price"
                            autoComplete="price"
                            autoFocus
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register()}
                            defaultValue={selectedRow?.countInStock || ''}
                            fullWidth
                            label="In stock*"
                            name="countInStock"
                            autoComplete="countInStock"
                            autoFocus
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register()}
                            defaultValue={selectedRow?.brand || ''}
                            fullWidth
                            label="Brand*"
                            name="brand"
                            autoComplete="brand"
                            autoFocus
                        />
                        <Button type='submit' color="primary">Submit</Button>
                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogCloseHandler} color="primary">Cancel</Button>

                </DialogActions>
            </Dialog>

            }
            <div  className={styles.buttonContainer} >
            <Button color='primary' variant='contained' disabled={deleteButton} onClick={deleteHandler}>Delete</Button>

            <Button color='primary' variant='contained' disabled={editButton} onClick={editHandler}>Edit</Button>
            <Button color='primary' variant='contained' onClick={addHandler}>Add</Button>
            </div>
            {
                products.status === 'pending' ? (<p>loading...</p>) :
                    products.error ? (<p>{products.error}</p>) :
                        products.data && products.data.length === 0 ? <p>No items added</p> :
                            products.data && products.data.length > 0 &&
                            <DataGrid getRowId={(row) => row._id}
                                rows={products.data}

                                columns={columns} pageSize={5}
                                onRowSelected={(rowData) => { setSelectedRow(rowData.data); setDeleteButton(null); setEditButton(null) }} />
            }

        </div>
    );
}
