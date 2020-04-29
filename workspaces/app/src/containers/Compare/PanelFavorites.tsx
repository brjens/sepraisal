import clsx from 'clsx'
import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { ReactSortable } from 'react-sortablejs'

import { ExpansionPanelProps, List, ListItem, Typography } from '@material-ui/core'

import { createSmartFC, createStyles, IMyTheme } from '../../common'
import MyExpansionPanel from '../../components/MyExpansionPanel'
import { CONTEXT } from '../../stores'
import SelectorRow from './PanelFavoritesRow'

const styles = (theme: IMyTheme) => createStyles({
    root: {
    },

    details: {
    },
    list: {
    },
    secondaryHeading: {
    },
    handle: {
        minWidth: 24 + theme.spacing(2),
    },
})


interface IProps extends ExpansionPanelProps {
}


export default hot(createSmartFC(styles, __filename)<IProps>(({children, classes, theme, ...props}) => {
    const { className, ...otherProps } = props
    const favoriteStore = React.useContext(CONTEXT.FAVORITES)

    return (
        <MyExpansionPanel
            className={clsx(classes.root, className)}
            title='Favorites'
            subtitle={`${favoriteStore.favorites.length}`}
            classes={{details: classes.details, secondaryHeading: classes.secondaryHeading}}
            {...otherProps}
        >
            <List dense className={classes.list}>
                <ListItem key='0'>
                    <Typography color='textSecondary' variant='body2' align='center'>
                        Favorite blueprints and they will show up here.
                    </Typography>
                </ListItem>
                <ReactSortable
                    handle={`.${classes.handle}`}
                    animation={theme.transitions.duration.standard}
                    list={[...favoriteStore.favorites]}
                    setList={favoriteStore.replace}
                >
                    {[...favoriteStore.favorites].map<JSX.Element>(({id, name}) => (
                        <SelectorRow
                            key={id}
                            id={id}
                            name={name}
                            classes={{handle: classes.handle}}
                        />
                    ))}
                </ReactSortable>
            </List>
        </MyExpansionPanel>
    )
})) /* ============================================================================================================= */
