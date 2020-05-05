import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { NavLink } from 'react-router-dom'

import { fade, SvgIconProps, Typography } from '@material-ui/core'

import { createSmartFC, createStyles, IMyTheme } from '../../common/'
import { ROUTES } from '../../constants/routes'


const styles = (theme: IMyTheme) => createStyles({
    root: {
        color: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.contrastText,
        padding: theme.spacing(2, 2),
        minWidth: 24,
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(2, 6),
        },
        height: 48,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        '&:hover': {
            backgroundColor: fade('#000', 0.4),
        },
    },
    active: {
        backgroundColor: fade('#000', 0.2),
        borderBottom: `${theme.spacing(0.5)}px solid`,
        paddingTop: theme.spacing(2.5),
    },
    icon: {
        paddingRight: theme.spacing(0.5),
    },
    title: {
        overflow: 'hidden',
        transition: theme.transitions.create('max-width'),
        maxWidth: 0,
        [theme.breakpoints.up('md')]: {
            maxWidth: 80,
        },
    },
})


interface IProps {
    Icon: React.FC<SvgIconProps>
    to: ROUTES
    title: string
}


export default hot(createSmartFC(styles, __filename)<IProps>(({children, classes, theme, ...props}) => {
    const {Icon, to, title} = props

    return (
        <NavLink
            to={to}
            className={classes.root}
            activeClassName={classes.active}
        >
            <Icon className={classes.icon} />
            <Typography
                className={classes.title}
                variant='button'
            >
                {title}
            </Typography>
        </NavLink>
    )
})) /* ============================================================================================================= */
