import React from 'react';
import { Paper, Card, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader: {
        padding: theme.spacing(3),
        display: 'flex',
        marginBottom: theme.spacing(3)
    },
    pageIcon: {
        height: '3.8rem',
        display: 'inline-block',
        padding: theme.spacing(2),
        color: '#9d6838',
        backgroundColor: '#eee'
    },
    pageTitle: {
        color: '#64412a',
        paddingLeft: theme.spacing(2),
        '& .MuiTypography-subtitle2': {
            opacity: '0.7'
        }
    }
}))

function PageHeader(props) {
    const styles = useStyles()
    const { icon, title, subTitle } = props

    return (
        <Paper elevation={0} square className={styles.root}>
            <div className={styles.pageHeader}>
                <Card className={styles.pageIcon}>{icon}</Card>
                <div className={styles.pageTitle}>
                    <Typography variant="h6" component="div" style={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        {subTitle}
                    </Typography>
                </div>

            </div>
        </Paper>
    );
}

export default PageHeader;
