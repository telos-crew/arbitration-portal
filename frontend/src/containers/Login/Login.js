import React            from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button }       from 'reactstrap';
import useBlockchain    from '../useBlockchain';

const Login = () => {
    const dispatch = useDispatch()
    const { CREATE_IDENTITY_REQUEST } = useBlockchain()
    const { identity } = useSelector(state => state.authentication)

    const login = () => {
        const url = CREATE_IDENTITY_REQUEST()
        window.open(url)
    }

    const logout = () => {
        dispatch({
            type: 'SET_AUTH',
            data: {
                identity: null
            }
        })
    }

    return (
        <div>
            {identity ? (
                    <Button color='primary' style={{ fontWeight: 'bold' }} onClick={logout} outline>Logout</Button>
                ) : (
                    <Button color='primary' style={{ fontWeight: 'bold' }} onClick={login}>Login</Button>
            )}
        </div> );
}

export default Login
// const mapStateToProps = state => ({
//     authentication: {
//         isLogin: AuthenticationSelectors.isLogin(state),
//         account: AuthenticationSelectors.account(state),
//     },
// });

// // Map the following action to props
// const mapDispatchToProps = {
//   setAuth: AuthenticationActions.setAuthentication,
// };

// // Export a redux connected component
// export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Login) );