import React, { Component }      from 'react';
import { Link }   from 'react-router-dom';


// Resources
import mainLogo                  from '../../resources/telosLogo.png'

// Components
import Login                     from '../../containers/Login';

// Redux
import { connect }               from 'react-redux';
import { AuthenticationSelectors } from '../../business/selectors';

// Reactstrap Components
import { Collapse, Navbar, NavbarToggler, Nav, NavItem }      from 'reactstrap';

class NavBar extends Component {

    constructor (props) {
        super(props);

        this.state = {
            isOpen:  false
        };

        this.toggleNavBar = this.toggleNavBar.bind(this);

    }

    toggleNavBar() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {

          return (
                <Navbar color='light' light expand='md' className='main-navbar'>
                    <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                        <img src={mainLogo} alt='mainLogo' height="40" width="40"/> Arbitration Portal
                    </Link>
                    <NavbarToggler onClick={this.toggleNavBar}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                        <NavItem>
                            <Link to='/' className={`main-navbar-link ${!this.props.authentication.isLogin && 'logged-out'}`}>
                                Home
                            </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/cases' className={`main-navbar-link ${!this.props.authentication.isLogin && 'logged-out'}`}>
                                    Cases
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/arbitrators' className={`main-navbar-link ${!this.props.authentication.isLogin && 'logged-out'}`}>
                                    Arbitrator
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/members' className={`main-navbar-link ${!this.props.authentication.isLogin && 'logged-out'}`}>
                                    Members
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/transfers' className={`main-navbar-link ${!this.props.authentication.isLogin && 'logged-out'}`}>
                                    Transfers
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Login/>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
          );
      }
  }

const mapStateToProps = state => ({
    authentication: {
        isLogin: AuthenticationSelectors.isLogin(state),
    },
});

// Export a redux connected component
export default connect(mapStateToProps, null)(NavBar);