import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import { IconButton, IconButtonProps } from '@material-ui/core'
import IconAssessment from '@material-ui/icons/Assessment'
import IconAssessmentOutlined from '@material-ui/icons/AssessmentOutlined'

import { createSmartFC, createStyles, IMyTheme } from '../common/'
import { CONTEXT } from '../stores'
import { action } from 'mobx'


const styles = (theme: IMyTheme) => createStyles({
    root: {
        color: theme.palette.primary.main,
    },
})


interface IProps {
    id: number | string
}


export default hot(createSmartFC(styles)<IProps>(({children, classes, theme, ...props}) => {
    const {id} = props
    const selectionStore = React.useContext(CONTEXT.SELECTION)

    const favorited = selectionStore.selected.includes(id)
    const handleToggle = action(`CompareButton<${JSON.stringify(id)}>`, () => {
        if(favorited) {
            selectionStore.selected.remove(id)
        } else {
            selectionStore.selected.push(id)
        }
    })

    return (
        <IconButton className={classes.root} size='small' color='inherit' aria-label='favorite' onClick={handleToggle}>
            {favorited ? <IconAssessment /> : <IconAssessmentOutlined />}
        </IconButton>
    )
})) /* ============================================================================================================= */
