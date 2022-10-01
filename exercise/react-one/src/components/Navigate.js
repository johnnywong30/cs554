import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  pageButton: {
    padding: '0px 5px'
  }
});

const Navigate = ({navText, navLink}) => {
    const classes = useStyles();

    return (
        // <div className={classes.pag}>
        <Link className={classes.pageButton} to={navLink}>
            {navText}
        </Link>
        // </div>
    )
}

export default Navigate
