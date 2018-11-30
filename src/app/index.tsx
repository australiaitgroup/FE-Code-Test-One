import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import { Object } from 'es6-shim';
import CssBaseline from '@material-ui/core/CssBaseline';
import Pagination from 'material-ui-flat-pagination';
import SearchAppBar from '../components/searchAppBar';
import * as moment from 'moment';
import SearchList from '../components/searchList';
import NoFound from '../components/notFound';
import Style from '../styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {algoliaAPI} from '../const';
export class Index extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            searchModel: null,
            loading: false,
            keyWord: null,
            pageNumber: 0,
            searchBy: 'search?',
            searchFor: 'All Time',
            searchTimeSpan: '',
            initialLoading: true,
        };
    }
    async componentDidMount() {
        await axios.get(`${algoliaAPI}search?tags=story`).then(result => this.setState({
            searchModel: result.data,
            initialLoading: false
        }))
            .catch(error => this.setState({
                error,
            }));
    }
    // search query when Typing
    query = async (query: string) => {

        this.setState({ keyWord: query, loading: true });
        const { searchTimeSpan, searchBy } = this.state;
        const response = await axios.get(`${algoliaAPI}${searchBy}tags=story${query ? `&query=${query}` : ''}${searchTimeSpan}`);
        if (response.data.query === this.state.keyWord) {
            this.setState({
                searchModel: response.data,
                pageNumber: 0,
                loading: false
            });
        }
    }
    // handle the event of clicking page number
    handleClick = (offset) => {
        this.setState({ pageNumber: offset, loading: true });
        const { keyWord, searchBy, searchTimeSpan } = this.state;
        axios.get(`${algoliaAPI}${searchBy}tags=story${keyWord ? `&query=${keyWord}` : ''}${offset ? `&page=${offset}` : ''}${searchTimeSpan}`)
            .then(result => this.setState({
                searchModel: result.data,
                loading: false
            }))
            .catch(error => this.setState({
                error,
            }));
    }
    // handle the sorting-by searching
    handleSearchByChange = event => {
        this.setState({ searchBy: event.target.value, loading: true });
        const { keyWord, searchTimeSpan } = this.state;
        const param = `${event.target.value}tags=story${keyWord ? `&query=${keyWord}` : ''}${searchTimeSpan}`;
        axios.get(`${algoliaAPI}${param}`)
            .then(result => this.setState({
                searchModel: result.data,
                pageNumber: 0,
                loading: false
            })).catch(error => this.setState({
                error,
            }));

    }
    // handle the time scope searching
    handleSearchForChange = event => {
        let searchTimeSpan = '';
        switch (event.target.value) {
            case 'Last 24h': searchTimeSpan = `&numericFilters=created_at_i>${moment().subtract(1, 'days').toDate().getTime() / 1000}`; break;
            case 'Past Week': searchTimeSpan = `&numericFilters=created_at_i>${moment().subtract(1, 'weeks').toDate().getTime() / 1000}`; break;
            case 'Past Month': searchTimeSpan = `&numericFilters=created_at_i>${moment().subtract(1, 'months').toDate().getTime() / 1000}`; break;
            case 'Past Year': searchTimeSpan = `&numericFilters=created_at_i>${moment().subtract(1, 'years').toDate().getTime() / 1000}`; break;
        }
        this.setState({ searchTimeSpan, searchFor: event.target.value, loading: true });
        const { keyWord, searchBy } = this.state;
        const param = `${searchBy}tags=story${keyWord ? `&query=${keyWord}` : ''}${searchTimeSpan}`;
        axios.get(`${algoliaAPI}${param}`)
            .then(result => this.setState({
                searchModel: result.data,
                pageNumber: 0,
                loading: false
            })).catch(error => this.setState({
                error,
            }));
    }

    render() {

        const { searchModel, keyWord, pageNumber, searchBy, searchFor, loading, initialLoading } = this.state;
        // build inner html to highlight search result
        const highlightedItemList = searchModel ? searchModel.hits.map((item) => {
            const r = Object.assign({}, item);
            r.rawUrl = r.url;
            if (keyWord) {
                if (r._highlightResult.title.value) {
                    const prefixReplace = r._highlightResult.title.value.replace(new RegExp('\u003cem\u003e', 'g'), '<b style="background:yellow;">');
                    const titleUpdatedValue = prefixReplace.replace(new RegExp('\u003c/em\u003e', 'g'), '</b>');
                    r.title = <span dangerouslySetInnerHTML={{ __html: titleUpdatedValue }} />;
                }
                if (r._highlightResult.url ? r._highlightResult.url.value : false) {
                    const prefixReplace = r._highlightResult.url.value.replace(new RegExp('\u003cem\u003e', 'g'), '<b style="background:yellow;">');
                    const urlUpdatedValue = prefixReplace.replace(new RegExp('\u003c/em\u003e', 'g'), '</b>');
                    r.url = <span dangerouslySetInnerHTML={{ __html: urlUpdatedValue }} />;
                }
                if (r._highlightResult.author ? r._highlightResult.author.value : false) {
                    const prefixReplace = r._highlightResult.author.value.replace(new RegExp('\u003cem\u003e', 'g'), '<b style="background:yellow;">');
                    const authorUpdatedValue = prefixReplace.replace(new RegExp('\u003c/em\u003e', 'g'), '</b>');
                    r.author = <span dangerouslySetInnerHTML={{ __html: authorUpdatedValue }} />;
                }
                if (r.story_text) {
                    const prefixReplace = r.story_text.replace(new RegExp('\u003cem\u003e', 'g'), '<b style="background:yellow;">');
                    const storyUpdatedValue = prefixReplace.replace(new RegExp('\u003c/em\u003e', 'g'), '</b>');
                    r.story_text = <span dangerouslySetInnerHTML={{ __html: storyUpdatedValue }} />;
                }
            }else {
                if (r.story_text) {
                    r.story_text = <span dangerouslySetInnerHTML={{ __html: r.story_text }} />;
                }
            }

            return r;
        }) : [];

        if (initialLoading) {
            return <LinearProgress />;
        }
        return (
            <div className={'root'}>
                <MuiThemeProvider>
                    <SearchAppBar
                        searching={this.query}
                        handleSearchByChange={this.handleSearchByChange}
                        handleSearchForChange={this.handleSearchForChange}
                        searchBy={searchBy}
                        searchFor={searchFor}
                        loading={loading}
                    />
                    <div style={Style.topContent}> appbar </div>
                   {highlightedItemList.length !== 0 && <SearchList
                        highlightedItemList={highlightedItemList}
                    />}
                    {highlightedItemList.length === 0 && <NoFound
                        keyWord={keyWord}
                    />}
                    <CssBaseline />
                    <Pagination
                        limit={1}
                        offset={pageNumber}
                        total={searchModel ? searchModel.nbPages : 0}
                        onClick={(e, offset) => this.handleClick(offset)}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}
