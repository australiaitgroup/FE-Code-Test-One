import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import SearchIcon from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import MoreIcon from '@material-ui/icons/MoreVert';
import createStyles from '@material-ui/core/styles/createStyles';
import withRoot from './withRoot';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FormControl, NativeSelect, InputLabel } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Style from '../styles';
const styles = theme => createStyles({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBar: {
    height: 75,
    left: '5%',
    right: '5%',
    width: '90%',
    [theme.breakpoints.down('md')]: {
      height: 75,
      left: 0,
      right: 0,
      width: '100%',
    },
  }
});

interface IAppBarProps {
  searching?: any;
  handleSearchByChange?: any;
  handleSearchForChange?: any;
  searchBy?: any;
  searchFor?: any;
  loading?: boolean;
  classes?: any;
}

interface IAppBarStates {
  anchorEl?: any;
  mobileMoreAnchorEl?: any;
  searchValue?: string;
}

class PrimarySearchAppBar extends React.Component<IAppBarProps, IAppBarStates> {

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    searchValue: ''
  };

  // click to open menu in mobile mode
  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  }
  // click to close menu in mobile mode
  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  }
  // update the input value in search input field
  updateSearch = async (event) => {
    if (event) {
      this.setState({ searchValue: event.target.value });
      await this.props.searching(event.target.value);

    }
  }
  // click to clear all input value in search input field
  clear = () => {
    this.setState({ searchValue: '' });
    this.props.searching('');
  }

  render() {

    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, loading, searchBy, searchFor, searching, handleSearchByChange, handleSearchForChange } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <FormControl>
            <InputLabel htmlFor='name-readonly' style={Style.colorblack}>Sort By </InputLabel>
            <NativeSelect
              value={searchBy}
              onChange={handleSearchByChange}
              name='searchBy'
              style={Style.colorblack}
            >
              <option value='search?' style={Style.colorblack}>Popularity</option>
              <option value='search_by_date?' style={Style.colorblack} >Date</option>
            </NativeSelect>
          </FormControl>

        </MenuItem>
        <MenuItem>

          <FormControl>
            <InputLabel htmlFor='name-readonly' style={Style.colorblack}>For</InputLabel>
            <NativeSelect
              value={searchFor}
              onChange={handleSearchForChange}
              name='searchFor'
              style={Style.colorblack}
            >
              <option value='All Time' style={Style.colorblack}>All Time</option>
              <option value='Last 24h' style={Style.colorblack}>Last 24h</option>
              <option value='Past Week' style={Style.colorblack}>Past Week</option>
              <option value='Past Month' style={Style.colorblack}>Past Month</option>
              <option value='Past Year' style={Style.colorblack}>Past Year</option>
            </NativeSelect>
          </FormControl>
        </MenuItem>
      </Menu>
    );

    return (
      <div >
        <AppBar className={classes.appBar} position='fixed' >
          <Toolbar>
            <Avatar alt='H' src='../img/hackerIcon.png' className={classes.avatar}></Avatar>
            <Typography className={classes.title} variant='h6' color='inherit' noWrap>
              Search Hacker News
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder='Search by title, url or author'
                onChange={this.updateSearch}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                fullWidth
                value={this.state.searchValue}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Clear'
                      onClick={this.clear}>
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>

              <FormControl >
                <InputLabel htmlFor='name-readonly' style={Style.colorWhite}>Sort By </InputLabel>
                <NativeSelect
                  value={searchBy}
                  onChange={handleSearchByChange}
                  name='searchBy'
                  style={Style.colorWhite}
                >
                  <option value='search?' style={Style.colorblack}>Popularity</option>
                  <option value='search_by_date?' style={Style.colorblack} >Date</option>
                </NativeSelect>
              </FormControl>

              <FormControl >
                <InputLabel htmlFor='name-readonly' style={Style.colorWhite}>For</InputLabel>
                <NativeSelect
                  value={searchFor}
                  onChange={handleSearchForChange}
                  name='searchFor'
                  style={Style.colorWhite}
                >
                  <option value='All Time' style={Style.colorblack}>All Time</option>
                  <option value='Last 24h' style={Style.colorblack}>Last 24h</option>
                  <option value='Past Week' style={Style.colorblack}>Past Week</option>
                  <option value='Past Month' style={Style.colorblack}>Past Month</option>
                  <option value='Past Year' style={Style.colorblack}>Past Year</option>
                </NativeSelect>
              </FormControl>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup='true' onClick={this.handleMobileMenuOpen} color='inherit'>
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
          {loading && <LinearProgress />}
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(PrimarySearchAppBar));