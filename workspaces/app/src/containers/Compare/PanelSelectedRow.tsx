import clsx from 'clsx'
import { runInAction } from 'mobx'
import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import IconClose from '@material-ui/icons/Close'
import IconDragHandle from '@material-ui/icons/DragHandle'

import { createSmartFC, createStyles, IMyTheme } from '../../common'
import { CONTEXT } from '../../stores'

const styles = (theme: IMyTheme) => createStyles({
    root: {
        margin: theme.spacing(1, 0),
    },
    selected: {
        '&:hover': {
            background: theme.palette.background.default,
        },
        'background': theme.palette.background.default,
    },
    handle: {
    },
})


interface IProps {
    id: string | number
}


export default hot(createSmartFC(styles, __filename)<IProps>(({children, classes, theme, ...props}) => {
    const blueprintStore = React.useContext(CONTEXT.BLUEPRINTS)
    const selectionStore = React.useContext(CONTEXT.SELECTION)
    const favoriteStore = React.useContext(CONTEXT.FAVORITES)

    const {id} = props
    const index = selectionStore.selected.indexOf(id)
    const title = blueprintStore.getSomething(id)?.steam?.title ?? favoriteStore.get(id)?.name ?? id

    const handleDeselect = () => {
        runInAction(() => {
            selectionStore.selected.remove(id)
        })
    }

    return (
        <ListItem
            key={id}
            className={clsx(classes.root, index === -1 ? '' : classes.selected)}
        >
            <ListItemIcon className={classes.handle}>
                <IconDragHandle />
            </ListItemIcon>
            <ListItemText
                primary={title}
            />
            <ListItemSecondaryAction>
                <IconButton onClick={handleDeselect} edge='end'><IconClose /></IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
})) /* ============================================================================================================= */
