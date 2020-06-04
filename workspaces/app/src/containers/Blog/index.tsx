import moment from 'moment'
import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import { Grid } from '@material-ui/core'

import { createSmartFC, createStyles, IBlogArticle, IMyTheme } from 'src/common'
import { ROUTE } from 'src/constants'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { CONTEXT } from 'src/stores'

import postClassificationLink from '../../../static/articles/classification/classification.md'
import postFleetsLink from '../../../static/articles/fleets/fleets.md'
import postLaunch2Link from '../../../static/articles/launch2/launch2.md'
import postTestLink from '../../../static/articles/test/test.md'
import Article from './Article'
import TableOfContents from './TableOfContents'

const styles = (theme: IMyTheme) => createStyles({
    root: {
    },

    article: {
        maxWidth: '760px',
        minWidth: '300px',
        flexBasis: '400px',
        flexShrink: 1,
        flexGrow: 100,
        [theme.breakpoints.up('sm')]: {
            minWidth: '384px',
            flexBasis: '384px',
        },
    },
    toc: {
        flexBasis: '200px',
        flexShrink: 100,
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            maxWidth: '400px',
        },
    },
})


interface IProps {
}


export default hot(createSmartFC(styles, __filename)<IProps>(({children, classes, theme, ...props}) => {
    const routerStore = React.useContext(CONTEXT.ROUTER)
    const selectedArticleId = routerStore.location.pathname.slice(ROUTE.BLOG.length + 1)

    if(!articles.find((article) => article.id === selectedArticleId)) {
        routerStore.replace(`${ROUTE.BLOG}/${published[0].id}`)
    }

    return (
        <DefaultLayout className={classes.root}>
            <Grid container spacing={4} justify='center' direction='row-reverse'>
                <Grid className={classes.toc} item>
                    <TableOfContents articles={published} />
                </Grid>
                <Grid className={classes.article} item xs>
                    {articles.map((article) => (
                        <Article key={article.id} article={article} />
                    ))}
                </Grid>
            </Grid>
        </DefaultLayout>
    )
})) /* ============================================================================================================= */

const published: IBlogArticle[] = [
    {id: 'launch2', date: moment('2020-06-03'), link: postLaunch2Link, authors: ['Akuukis'], title: 'SE Praisal V2 launched!'},
]

const hidden: IBlogArticle[] = [
    {id: 'classification', date: moment('2020-06-10'), link: postClassificationLink, authors: ['Akuukis'], title: 'Ship Classification'},
    {id: 'fleets', date: moment('2019-09-09'), link: postFleetsLink, authors: ['Akuukis'], title: 'TOP Fleets of Space Engineers'},
    {id: 'test', date: moment('2000-01-01'), link: postTestLink, authors: ['Test'], title: 'Test'},
]

const articles = [...published, ...hidden]
