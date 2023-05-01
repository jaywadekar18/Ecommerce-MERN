import { Container, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import ProductTable from '../utils/tables/ProductTable'
import UserTable from '../utils/tables/UserTable'

const useStyles = makeStyles({
    heading: {
        fontSize: '30px',
        marginTop: '40px',
        fontWeight: 'bold'
    }

})

function Admin() {

    let classes = useStyles()
    return (
        <Container>
            <Typography className={classes.heading}>Products-</Typography>
            <ProductTable />

            <Typography className={classes.heading}>Users-</Typography>
            <UserTable />

        </Container>
    )
}

export default Admin
