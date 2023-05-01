import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogTitle, makeStyles, DialogContent, DialogContentText, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { getUserData, deleteUserDataById, updateUserData, postUserData } from '../../../slices/usersSlice'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './mystyles.module.css';
const columns = [
    { field: '_id', headerName: 'ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 290 },
    { field: 'role', headerName: 'Role', width: 130 },
    { field: 'email', headerName: 'Email', width: 120 },

];
const useStyles = makeStyles((theme) => ({




}))
export default function DataGridDemo({ data }) {
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteButton, setDeleteButton] = useState(null);
    const [editButton, setEditButton] = useState(null);
    const [addButton, setAddButton] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const classes = useStyles();
    const users = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getUserData());

    }, [])

    async function deleteHandler() {
        const result = window.confirm(`Do you want to delete ${selectedRow.name}`);
        if (result) {
            await dispatch(deleteUserDataById(selectedRow._id));
            await dispatch(getUserData());
            setDeleteButton(true);

            //alert('Data deleted!!')
        }
    }
    function editHandler() {
        setAddButton(null);
        setOpenDialog(true)
    }
    function dialogCloseHandler() {
        setOpenDialog(false)
    }
    function addHandler() {
        setSelectedRow(null)
        setOpenDialog(true);
        setAddButton(true);

    }
    async function onSubmitEdit(data) {
        console.log(data);
        const _id = selectedRow._id;
        const newData = { ...data, _id: _id };
        await dispatch(updateUserData(newData));
        await dispatch(getUserData());
        setOpenDialog(false);
    }
    async function onSubmitAdd(data) {
        const newData = { ...data, password: '12345678' }
        console.log(newData)
        // await dispatch(postUserData(newData));
        // await dispatch(getUserData());
        // setOpenDialog(false);
    }
    return (
        <div style={{ height: 500, width: '100%' }}>
            {(selectedRow || addButton) && <Dialog open={openDialog} onClose={dialogCloseHandler} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <DialogContent>
                    <form noValidate >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            error={Boolean(errors.name)}
                            helperText={errors.name && (errors.name.type === 'required' && "Name is required*")}
                            inputRef={register({ required: true })}
                            defaultValue={selectedRow?.name || ''}
                            fullWidth
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />

                        {/*                         
                        <TextField
                            variant="outlined"
                            margin="normal"
                            error={Boolean(errors.role)}
                            helperText={errors.role && (errors.role.type === 'required' && "Role is required*")}
                            inputRef={register({ required: true })}
                            defaultValue={selectedRow?.role || ''}
                            fullWidth
                            label="Role"
                            name="role"
                            autoComplete="price"
                           
                        /> */}
                        <select error={Boolean(errors.role)}
                            helpertext={errors.role && (errors.role.type === 'required' && "Role is required*")}
                            ref={register({ required: true })}
                            defaultValue={selectedRow?.role || ''}
                            className={styles.dropdown}
                            label="Role"
                            name="role"

                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>


                        </select>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            error={Boolean(errors.email)}
                            helperText={errors.email && (errors.email.type === 'required' && "Email is required*")}
                            inputRef={register({ required: true })}
                            defaultValue={selectedRow?.email || ''}
                            fullWidth
                            label="Email"
                            name="email"
                            autoComplete="countInStock"

                        />

                        {addButton ? <Button onClick={handleSubmit(onSubmitAdd)} color="primary">Add</Button> : <Button onClick={handleSubmit(onSubmitEdit)} color="primary">Edit</Button>}


                    </form>

                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogCloseHandler} color="primary">Cancel</Button>

                </DialogActions>
            </Dialog>

            }
            <div className={styles.buttonContainer} >
                <Button color='primary' variant='contained' disabled={!deleteButton} onClick={deleteHandler}>Delete</Button>

                <Button color='primary' variant='contained' disabled={!editButton} onClick={editHandler}>Edit</Button>
                <Button color='primary' variant='contained' onClick={addHandler}>Add</Button>
            </div>
            {
                users.status === 'pending' ? (<p>loading...</p>) :
                    users.error ? (<p>{users.error}</p>) :
                        users.data &&
                        <DataGrid getRowId={(row) => row._id} rows={users.data} columns={columns} pageSize={5}
                            onRowSelected={(row) => { setSelectedRow(row.data); setDeleteButton(true); setEditButton(true) }} />
            }
        </div>
    );
}
