import React, { Component }      from 'react';
import axios                     from 'axios';

// Utilities
import ScatterBridge             from '../../utils/scatterBridge';
// import IOClient               from '../../utils/io-client';
// import { updateArbitrators }  from '../../utils/updateArbitrators';
// import { updateBalances }     from '../../utils/updateBalances';
// import { updateCases }        from '../../utils/updateCases';
// import { updateClaims }       from '../../utils/updateClaims';

// Components
import Uploader                  from '../Uploader';
import BlockConsole              from '../BlockConsole';

// Redux
import { connect }               from 'react-redux';
import { AuthenticationActions } from '../../business/actions';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Button, Spinner, Form, FormGroup, Label, CustomInput, Input, FormText, FormFeedback, Jumbotron } from 'reactstrap';

class Arbitrators extends Component {

    constructor (props) {
        super(props);
        
        this.appName = process.env.REACT_APP_NAME;
        this.network = {
          blockchain: `${process.env.REACT_APP_BLOCKCHAIN}`,
          protocol:   `${process.env.REACT_APP_PROTOCOL}`,
          host:       `${process.env.REACT_APP_HOST}`,
          port:       `${process.env.REACT_APP_PORT}`,
          chainId:    `${process.env.REACT_APP_CHAINID}`
        };
        this.eosio = new ScatterBridge(this.network, this.appName);
        // this.io    = new IOClient();
        
        this.languageCodes = {
            ENGL: '0',
            FRCH: '1',
            GRMN: '2',
            KREA: '3',
            JAPN: '4',
            CHNA: '5',
            SPAN: '6',
            PGSE: '7',
            SWED: '8'
        };

        this.arbitratorStatus = {
            AVAILABLE:    '0',
            UNAVAILABLE:  '1',
            REMOVED:      '2',
            SEAT_EXPIRED: '3',
        };

        this.state = {
            loading:       false,
            activeTab:     '1',
            consoleoutput: '',
            arbitrators:   [],
            cases:         [],
            balances:      [],
            claims:        [],
            tabs: {
                respond: {
                    name:      'Respond',
                    activeTab: '1'
                },
                addarbs: {
                    name:      'Add Arbitrators',
                    activeTab: '2'
                },
                assigntocase: {
                    name:      'Assign To Case',
                    activeTab: '3'
                },
                dismissclaim: {
                    name:      'Dismiss Claim',
                    activeTab: '4'
                },
                acceptclaim: {
                    name:      'Accept Claim',
                    activeTab: '5'
                },
                setruling: {
                    name:      'Set Ruling',
                    activeTab: '6'
                },
                advancecase: {
                    name:      'Advance Case',
                    activeTab: '7'
                },
                dismisscase: {
                    name:      'Dismiss Case',
                    activeTab: '8'
                },
                recuse: {
                    name:      'Recuse',
                    activeTab: '9'
                },
                newarbstatus: {
                    name:      'New Arbitrator Status',
                    activeTab: '10'
                },
                setlangcodes: {
                    name:      'Set Language Codes',
                    activeTab: '11'
                },
                deletecase: {
                    name:      'Delete Case',
                    activeTab: '12'
                }                
            },
            arbitratorForm: {
                respond: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    claim_hash: {
                        label: 'Claim Hash:',
                        value: '',
                        type:  'text',
                        placeholder: 'ipfs_link',
                        text:  'Please input a valid IPFS link'
                    },
                    respondant: {
                        label: 'Respondant:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                    response_link: {
                        label: 'Response Link:',
                        value: '',
                        type:  'text',
                        placeholder: 'ipfs_link',
                        text:  'Please input a valid IPFS link'
                    }
                },
                addarbs: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    assigned_arb: {
                        label: 'Assigned Arbitrator:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                    num_arbs_to_assign: {
                        label: 'Number of Arbitrators to Assign:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid number of arbitrators to assign'
                    }
                },
                assigntocase: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    arb_to_assign: {
                        label: 'Arbitrator to Assign:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    }
                },
                dismissclaim: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    assigned_arb: {
                        label: 'Assigned Arbitrator:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                    claim_hash: {
                        label: 'Claim Hash:',
                        value: '',
                        type:  'text',
                        placeholder: 'ipfs_link',
                        text:  'Please input a valid IPFS link'
                    },
                    memo: {
                        label: 'Memo:',
                        value: '',
                        type:  'text',
                        placeholder: '...',
                        text:  'Please input a valid memo'
                    }
                },
                acceptclaim: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    assigned_arb: {
                        label: 'Assigned Arbitrator:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                    claim_hash: {
                        label: 'Claim Hash:',
                        value: '',
                        type:  'text',
                        placeholder: 'ipfs_link',
                        text:  'Please input a valid IPFS link'
                    },
                    decision_link: {
                        label: 'Decision Link:',
                        value: '',
                        type:  'text',
                        placeholder: 'ipfs_link',
                        text:  'Please input a valid IPFS link'
                    },
                    decision_class: {
                        label: 'Decision Class:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid Decision Class'
                    }
                },
                setruling: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    assigned_arb: {
                        label: 'Assigned Arbitrator:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                    case_ruling: {
                        label: 'Case Ruling:',
                        value: '',
                        type:  'text',
                        placeholder: 'ipfs_link',
                        test:  'Please input a valid IPFS link'
                    }
                },
                advancecase: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    assigned_arb: {
                        label: 'Assigned Arbitrator:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                },
                dismisscase: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    assigned_arb: {
                        label: 'Assigned Arbitrator:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                    ruling_link: {
                        label: 'Ruling Link:',
                        value: '',
                        type:  'text',
                        placeholder: 'ipfs_link',
                        text:  'Please input a valid IPFS link'
                    }
                },
                recuse: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    rationale: {
                        label: 'Rationale:',
                        value: '',
                        type:  'text',
                        placeholder: '...',
                        text:  'Please input a valid rationale string'
                    },
                    assigned_arb: {
                        label: 'Assigned Arbitrator:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                },
                newarbstatus: {
                    arbitrator: {
                        label: 'Arbitrator:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                    new_status: {
                        label: 'New Arbitrator Status:',
                        value: '',
                        type:  'radio',
                        placeholder: '',
                        text:  'Please select from the following valid arbitrator statuses'
                    }
                },
                setlangcodes: {
                    arbitrator: {
                        label: 'Arbitrator:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                    lang_codes: {
                        label: 'Language Codes:',
                        value: '',
                        type:  'checkbox',
                        placeholder: '',
                        text:  'Please select from the following language codes'
                    },
                },
                deletecase: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    }
                }   
            }
        };

        this.handleSubmit           = this.handleSubmit.bind(this);
        this.handleSearch           = this.handleSearch.bind(this);
        this.inputChangedHandler    = this.inputChangedHandler.bind(this);
        this.checkBoxChangedHandler = this.checkBoxChangedHandler.bind(this);
        this.toggleLogin            = this.toggleLogin.bind(this);
        this.toggleTab              = this.toggleTab.bind(this);
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggleLogin() {
        const { setAuth } = this.props;
        const setaccounts = this.eosio.currentAccount ? this.eosio.currentAccount : null;
        setAuth({ isLogin: !this.props.authentication.isLogin, account: setaccounts });
    }

    handleSubmit = async(event, tab_id) => {
        event.preventDefault();
        await this.handleSearch(event, tab_id);
    }

    handleSearch = async(event, tab_id) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.arbitratorForm[tab_id]) {
            formData[formElementIdentifier] = this.state.arbitratorForm[tab_id][formElementIdentifier].value;
        }
        // Send Action to Respective Action Handler
        switch (tab_id) {
            case 'respond':
                await this.respond(formData.case_id, formData.claim_hash, formData.respondant, formData.response_link);
                break;
            case 'addarbs':
                await this.addarbs(formData.case_id, formData.assigned_arb, formData.num_arbs_to_assign);
                break;
            case 'assigntocase':
                await this.assigntocase(formData.case_id, formData.arb_to_assign);
                break;
            case 'dismissclaim':
                await this.dismissclaim(formData.case_id, formData.assigned_arb, formData.claim_hash, formData.memo);
                break;
            case 'acceptclaim':
                await this.acceptclaim(formData.case_id, formData.assigned_arb, formData.claim_hash, formData.decision_link, formData.decision_class);
                break;
            case 'setruling':
                await this.setruling(formData.case_id,  formData.assigned_arb, formData.case_ruling);
                break;
            case 'advancecase':
                await this.advancecase(formData.case_id, formData.assigned_arb);
                break;
            case 'dismisscase':
                await this.dismisscase(formData.case_id, formData.assigned_arb, formData.ruling_link);
                break;
            case 'recuse':
                await this.recuse(formData.case_id, formData.rationale, formData.assigned_arb);
                break;
            case 'newarbstatus':
                await this.newarbstatus(formData.new_status, formData.arbitrator);
                break;
            case 'setlangcodes':
                await this.setlangcodes(formData.arbitrator, formData.lang_codes);
                break;
            case 'deletecase':
                await this.deletecase(formData.case_id);
                break;
            default:
                alert('No Available Arbitrator Action...!');
        }
    }

    inputChangedHandler = (event, tab_id, element_id) => {
        const updatedForm = {
            ...this.state.arbitratorForm
        };
        const updatedFormTab = {
            ...updatedForm[tab_id]
        };
        const updatedFormElement = {
            ...updatedFormTab[element_id]
        };

        if (tab_id === 'newarbstatus' && element_id === 'new_status') {
            updatedFormElement.value   = this.arbitratorStatus[event.target.id];
        } else {
            updatedFormElement.value   = event.target.value;
        }

        updatedFormTab[element_id] = updatedFormElement;
        updatedForm[tab_id]        = updatedFormTab;

        this.setState({ arbitratorForm: updatedForm });
    }

    checkBoxChangedHandler = (tab_id, element_id, language) => {
        
        let updatedLanguages = [];

        const updatedForm = {
            ...this.state.arbitratorForm
        };
        const updatedFormTab = {
            ...updatedForm[tab_id]
        };
        const updatedFormElement = {
            ...updatedFormTab[element_id]
        };

        updatedLanguages = [...updatedFormElement.value];

        if (!updatedLanguages.includes(parseInt(this.languageCodes[language]))) {
            updatedLanguages.push(parseInt(this.languageCodes[language]));
        }  else {
            let index = updatedLanguages.indexOf(parseInt(this.languageCodes[language]));
            updatedLanguages.splice(index, 1);
        }
                
        updatedFormElement.value   = updatedLanguages;
        updatedFormTab[element_id] = updatedFormElement;
        updatedForm[tab_id]        = updatedFormTab;

        this.setState({ arbitratorForm: updatedForm });
    }

    componentDidMount = async() => {
        // await this.eosio.connect();
        // await this.eosio.login();
        // if (!(this.props.authentication.isLogin || this.props.authentication.account)) {
        //     if (this.eosio.isConnected && this.eosio.currentAccount) {
        //         this.toggleLogin();
        //     }
        // }
        this.loadArbitrators();
        this.loadCases();
        this.loadBalances();
        this.loadClaims();

        // /**
        //      * Arbitration (Member and Arbitrator) Action Listeners
        //  */

        // // Case_Progression Actions

        // this.io.onMessage('respondAction',      (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         }
        //     ));
        // });

        // this.io.onMessage('addArbsAction',      (post) => {
        // });

        // this.io.onMessage('assignToCaseAction', (post) => {
        //     this.setState((prevState) => (
        //         {
        //             arbitrators: updateArbitrators(prevState, post),
        //             cases:       updateCases(prevState, post) 
        //         } 
        //     ));  
        // });

        // this.io.onMessage('dismissClaimAction', (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         } 
        //     ));  
        // });

        // this.io.onMessage('acceptClaimAction',  (post) => {
        //     this.setState((prevState) => (
        //         {
        //             cases:  updateCases(prevState, post),
        //             claims: updateClaims(prevState, post)
        //         } 
        //     ));  
        // });

        // this.io.onMessage('setRulingAction',  (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         } 
        //     ));  
        // });

        // this.io.onMessage('advanceCaseAction',  (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         } 
        //     ));  
        // });

        // this.io.onMessage('dismissCaseAction',  (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         } 
        //     ));  
        // });

        // this.io.onMessage('recuseAction',       (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         } 
        //     ));  
        // });

        // // Arb_Actions
        
        // this.io.onMessage('newArbStatusAction', (arbitrator) => {
        //     this.setState((prevState) => (
        //         {
        //             arbitrators: updateArbitrators(prevState, arbitrator)
        //         } 
        //     ));    
        // });

        // this.io.onMessage('setLangCodesAction', (arbitrator) => {
        //     this.setState((prevState) => (
        //         {
        //             arbitrators: updateArbitrators(prevState, arbitrator)
        //         } 
        //     )); 
        // });

        // this.io.onMessage('deleteCaseAction',   (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         }
        //     ));
        // });
    }

    loadArbitrators = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/arbitrator`);
        console.log('LoadArbitrators: ', response);
        this.setState({ arbitrators: response.data.reverse() });
    }

    loadCases = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/case`);
        console.log('LoadCases: ', response);
        this.setState({ cases: response.data.reverse() });
    }

    loadBalances = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/balance`);
        console.log('LoadBalances: ', response);
        this.setState({ balances: response.data.reverse() });
    }

    loadClaims = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/claim`);
        console.log('LoadClaims: ', response);
        this.setState({ claims: response.data.reverse() });
    }

    /**
     * Case_Progression Actions
     */

    respond = async(case_id, claim_hash, respondant, response_link) => {
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'respond',
                {
                    case_id:       parseInt(case_id),
                    claim_hash:    `${claim_hash}`,
                    respondant:    `${respondant}`,
                    response_link: `${response_link}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`Respond Successful`);
            } else {
                alert(`Respond Unsuccessful`);
            }
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
     }

     addarbs = async(case_id, assigned_arb, num_arbs_to_assign) => {
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'addarbs',
                {
                    case_id:            parseInt(case_id),
                    assigned_arb:       `${assigned_arb}`,
                    num_arbs_to_assign: parseInt(num_arbs_to_assign)
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`AddArbitrators Successful`);
            } else {
                alert(`AddArbitrators Unsuccessful`);
            }
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
     }

     assigntocase = async(case_id, arb_to_assign) => {
         try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'assigntocase',
                {
                    case_id:       parseInt(case_id),
                    arb_to_assign: `${arb_to_assign}`
                },
                {
                    actor: `${process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT}`,
                    permission: 'assign'
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`AssignToCase Successful`);
            } else {
                alert(`AssignToCase Unsuccessful`);
            }
         } catch (err) {
             console.error(err);
         }
         this.setState({ loading: false });
     }

     dismissclaim = async(case_id, assigned_arb, claim_hash, memo) => {
         try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'dismissclaim',
                {
                    case_id:      parseInt(case_id),
                    assigned_arb: `${assigned_arb}`,
                    claim_hash:   `${claim_hash}`,
                    memo:         `${memo}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`DismissClaim Successful`);
            } else {
                alert(`DismissClaim Unsuccessful`);
            }
         } catch (err) {
             console.error(err);
         }
         this.setState({ loading: false });
     }

     acceptclaim = async(case_id, assigned_arb, claim_hash, decision_link, decision_class) => {
         try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'acceptclaim',
                {
                    case_id:        parseInt(case_id),
                    assigned_arb:   `${assigned_arb}`,
                    claim_hash:     `${claim_hash}`,
                    decision_link:  `${decision_link}`,
                    decision_class: `${decision_class}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`AcceptClaim Successful`);
            } else {
                alert(`AcceptClaim Unsuccessful`);
            }
         } catch (err) {
            console.error(err);
         }
         this.setState({ loading: false });
     }

     setruling = async(case_id, assigned_arb, case_ruling) =>  {
         try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'setruling',
                {
                    case_id:      parseInt(case_id),
                    assigned_arb: `${assigned_arb}`,
                    case_ruling:  `${case_ruling}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`SetRuling Successful`);
            } else {
                alert(`SetRuling Unsuccessful`);
            }
         } catch (err) {
             console.error(err);
         }
         this.setState({ loading: true });
     }

     advancecase = async(case_id, assigned_arb) => {
         try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'advancecase',
                {
                    case_id:      parseInt(case_id),
                    assigned_arb: `${assigned_arb}`,
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`AdvanceCase Successful`);
            } else {
                alert(`AdvanceCase Unsuccessful`);
            }
         } catch (err) {
             console.error(err);
         }
         this.setState({ loading: false });
     }

     dismisscase = async(case_id, assigned_arb, ruling_link) => {
         try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'dismisscase',
                {
                    case_id:      parseInt(case_id),
                    assigned_arb: `${assigned_arb}`,
                    ruling_link:  `${ruling_link}`,
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`DismissCase Successful`);
            } else {
                alert(`DismissCase Unsuccessful`);
            }
         } catch (err) {
             console.error(err);
         }
         this.setState({ loading: false });
     }

     recuse = async(case_id, rationale, assigned_arb) => {
         try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'recuse',
                {
                    case_id:      parseInt(case_id),
                    rationale:    `${rationale}`,
                    assigned_arb: `${assigned_arb}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`RecuseSuccessful`);
            } else {
                alert(`RecuseUnsuccessful`);
            }
         } catch (err) {
            console.error(err);
         }
         this.setState({ loading: false });
     }

    /**
     * Arb_Actions 
     */

     newarbstatus = async(new_status, arbitrator) => {
         try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'newarbstatus',
                {
                    new_status: parseInt(new_status),
                    arbitrator: `${arbitrator}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`NewArbitratorStatus Successful`);
            } else {
                alert(`NewArbitratorStatus Unsuccessful`);
            }
         } catch (err) {
             console.error(err);
         }
         this.setState({ loading: false });
     }

     setlangcodes = async(arbitrator, lang_codes) => {
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'setlangcodes',
                {
                    arbitrator: `${arbitrator}`,
                    lang_codes: lang_codes
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`SetLanguageCodes Successful`);
            } else {
                alert(`SetLanguageCodes Unsuccessful`);
            }
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
     }

     deletecase = async(case_id) => {
         try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT, 'deletecase',
                {
                    case_id: parseInt(case_id)
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`DeleteCase Successful`);
            } else {
                alert(`DeleteCase Unsuccessful`);
            }
         } catch (err) {
             console.error(err);
         }
         this.setState({ loading: false });
     }

    render() {
        const tabElementsArr = [];
        for (let key in this.state.tabs) {
            tabElementsArr.push({
                id:        key,
                name:      this.state.tabs[key].name,
                activeTab: this.state.tabs[key].activeTab
            });
        }

        /**
         * Arbitrator Actions Form Builder
         */
        const respondFormArr = [];
        for (let key in this.state.arbitratorForm.respond) {
            respondFormArr.push({
                id:    key,
                label: this.state.arbitratorForm.respond[key].label,
                value: this.state.arbitratorForm.respond[key].value,
                type:  this.state.arbitratorForm.respond[key].type,
                placeholder: this.state.arbitratorForm.respond[key].placeholder,
                text:  this.state.arbitratorForm.respond[key].text
            });
        }

        const addArbsArr = [];
        for (let key in this.state.arbitratorForm.addarbs) {
            addArbsArr.push({
                id:    key,
                label: this.state.arbitratorForm.addarbs[key].label,
                value: this.state.arbitratorForm.addarbs[key].value,
                type:  this.state.arbitratorForm.addarbs[key].type,
                placeholder: this.state.arbitratorForm.addarbs[key].placeholder,
                text:  this.state.arbitratorForm.addarbs[key].text
            });
        }   
        
        const assignToCaseArr = [];
        for (let key in this.state.arbitratorForm.assigntocase) {
            assignToCaseArr.push({
                id:    key,
                label: this.state.arbitratorForm.assigntocase[key].label,
                value: this.state.arbitratorForm.assigntocase[key].value,
                type:  this.state.arbitratorForm.assigntocase[key].type,
                placeholder: this.state.arbitratorForm.assigntocase[key].placeholder,
                text:  this.state.arbitratorForm.assigntocase[key].text
            });
        }        

        const dismissClaimArr = [];
        for (let key in this.state.arbitratorForm.dismissclaim) {
            dismissClaimArr.push({
                id:    key,
                label: this.state.arbitratorForm.dismissclaim[key].label,
                value: this.state.arbitratorForm.dismissclaim[key].value,
                type:  this.state.arbitratorForm.dismissclaim[key].type,
                placeholder: this.state.arbitratorForm.dismissclaim[key].placeholder,
                text:  this.state.arbitratorForm.dismissclaim[key].text
            });
        }  
        
        const acceptClaimArr = [];
        for (let key in this.state.arbitratorForm.acceptclaim) {
            acceptClaimArr.push({
                id:    key,
                label: this.state.arbitratorForm.acceptclaim[key].label,
                value: this.state.arbitratorForm.acceptclaim[key].value,
                type:  this.state.arbitratorForm.acceptclaim[key].type,
                placeholder: this.state.arbitratorForm.acceptclaim[key].placeholder,
                text:  this.state.arbitratorForm.acceptclaim[key].text
            });
        } 
        
        const setRulingArr = [];
        for (let key in this.state.arbitratorForm.setruling) {
            setRulingArr.push({
                id:    key,
                label: this.state.arbitratorForm.setruling[key].label,
                value: this.state.arbitratorForm.setruling[key].value,
                type:  this.state.arbitratorForm.setruling[key].type,
                placeholder: this.state.arbitratorForm.setruling[key].placeholder,
                text:  this.state.arbitratorForm.setruling[key].text
            });
        }  

        const advanceCaseArr = [];
        for (let key in this.state.arbitratorForm.advancecase) {
            advanceCaseArr.push({
                id:    key,
                label: this.state.arbitratorForm.advancecase[key].label,
                value: this.state.arbitratorForm.advancecase[key].value,
                type:  this.state.arbitratorForm.advancecase[key].type,
                placeholder: this.state.arbitratorForm.advancecase[key].placeholder,
                text:  this.state.arbitratorForm.advancecase[key].text
            });
        }  

        const dismissCaseArr = [];
        for (let key in this.state.arbitratorForm.dismisscase) {
            dismissCaseArr.push({
                id:    key,
                label: this.state.arbitratorForm.dismisscase[key].label,
                value: this.state.arbitratorForm.dismisscase[key].value,
                type:  this.state.arbitratorForm.dismisscase[key].type,
                placeholder: this.state.arbitratorForm.dismisscase[key].placeholder,
                text:  this.state.arbitratorForm.dismisscase[key].text
            });
        }  

        const recuseFormArr = [];
        for (let key in this.state.arbitratorForm.recuse) {
            recuseFormArr.push({
                id:    key,
                label: this.state.arbitratorForm.recuse[key].label,
                value: this.state.arbitratorForm.recuse[key].value,
                type:  this.state.arbitratorForm.recuse[key].type,
                placeholder: this.state.arbitratorForm.recuse[key].placeholder,
                text:  this.state.arbitratorForm.recuse[key].text
            });
        }  

        const newArbStatusArr = [];
        for (let key in this.state.arbitratorForm.newarbstatus) {
            newArbStatusArr.push({
                id:    key,
                label: this.state.arbitratorForm.newarbstatus[key].label,
                value: this.state.arbitratorForm.newarbstatus[key].value,
                type:  this.state.arbitratorForm.newarbstatus[key].type,
                placeholder: this.state.arbitratorForm.newarbstatus[key].placeholder,
                text:  this.state.arbitratorForm.newarbstatus[key].text
            });
        }  

        const setLangCodesArr = [];
        for (let key in this.state.arbitratorForm.setlangcodes) {
            setLangCodesArr.push({
                id:    key,
                label: this.state.arbitratorForm.setlangcodes[key].label,
                value: this.state.arbitratorForm.setlangcodes[key].value,
                type:  this.state.arbitratorForm.setlangcodes[key].type,
                placeholder: this.state.arbitratorForm.setlangcodes[key].placeholder,
                text:  this.state.arbitratorForm.setlangcodes[key].text
            });
        }  

        const deleteCaseArr = [];
        for (let key in this.state.arbitratorForm.deletecase) {
            deleteCaseArr.push({
                id:    key,
                label: this.state.arbitratorForm.deletecase[key].label,
                value: this.state.arbitratorForm.deletecase[key].value,
                type:  this.state.arbitratorForm.deletecase[key].type,
                placeholder: this.state.arbitratorForm.deletecase[key].placeholder,
                text:  this.state.arbitratorForm.deletecase[key].text
            });
        }  

        const languages   = ['ENGL', 'FRCH', 'GRMN', 'KREA', 'JAPN', 'CHNA', 'SPAN', 'PGSE', 'SWED'];

        const arbstatuses = ['AVAILABLE', 'UNAVAILABLE', 'REMOVED', 'SEAT_EXPIRED']; 

        let tabBar = (
            <Nav tabs>
                {tabElementsArr.map(tabElement => (
                    <NavItem key={tabElement.name}>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === tabElement.activeTab })}
                            onClick={() => { this.toggleTab(tabElement.activeTab) }}>
                            {tabElement.name}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
        );

        let tabContent = (
            <TabContent className='tabContent' activeTab={this.state.activeTab}>
                {tabElementsArr.map(tabElement => (
                    <TabPane tabId={tabElement.activeTab} key={tabElement.activeTab}>
                        <Row>
                            <Col sm='12'>
                                {tabElement.id === 'respond' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {respondFormArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    {formElement.id === 'claim_hash' || formElement.id === 'response_link' ?
                                                        <div>
                                                            <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                            <Uploader  />
                                                        </div>
                                                    : null}
                                                    {formElement.id !== 'claim_hash' && formElement.id !== 'response_link' ?
                                                        <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    : null}
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'addarbs' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {addArbsArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'assigntocase' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {assignToCaseArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'dismissclaim' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {dismissClaimArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    {formElement.id === 'claim_hash' ? 
                                                        <div>
                                                            <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                            <Uploader />
                                                        </div>
                                                    : null}
                                                    {formElement.id !== 'claim_hash' ?
                                                        <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    : null}
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'acceptclaim' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {acceptClaimArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    {formElement.id === 'claim_hash' || formElement.id === 'decision_link' ?
                                                        <div>
                                                            <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                            <Uploader />
                                                        </div>
                                                    : null}
                                                    {formElement.id !== 'claim_hash' && formElement.id !== 'decision_link' ?
                                                        <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    : null}
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'setruling' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {setRulingArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    {formElement.id === 'case_ruling' ? 
                                                        <div>
                                                            <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                            <Uploader />
                                                        </div>
                                                    : null}
                                                    {formElement.id !== 'case_ruling' ?
                                                        <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    : null}
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'advancecase' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {advanceCaseArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'dismisscase' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {dismissCaseArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    {formElement.id === 'ruling_link' ?
                                                        <div>
                                                            <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                            <Uploader />
                                                        </div>
                                                    : null}
                                                    {formElement.id !== 'ruling_link' ?
                                                        <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    : null}
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'recuse' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {recuseFormArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'newarbstatus' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {newArbStatusArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    {formElement.id === 'new_status' ? 
                                                        arbstatuses.map(status => (
                                                            <CustomInput className='radioClass' key={status} name={formElement.id} type={formElement.type} id={status} label={status} onClick={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                        ))
                                                    : null }
                                                    {formElement.id !== 'new_status' ? 
                                                        <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    : null}                                                     
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'setlangcodes' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {setLangCodesArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    {formElement.id === 'lang_codes' ? 
                                                        languages.map(language => (
                                                            <CustomInput className='checkboxClass' key={language} name={formElement.id} type={formElement.type} id={language} label={language} onClick={() => this.checkBoxChangedHandler(tabElement.id, formElement.id, language)} />
                                                        ))
                                                    : null }
                                                    {formElement.id !== 'lang_codes' ? 
                                                        <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    : null }                                                    
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                    {tabElement.id === 'deletecase' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {deleteCaseArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                                                <Col sm={11}>
                                                    <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                {this.state.loading ? 
                                    <Spinner className='submitSpinner' type='grow' color='primary' /> : 
                                    <Button className='submitButton' color='primary' onClick={(event) => this.handleSearch(event, tabElement.id)} disabled={!this.props.authentication.isLogin} >Submit</Button> }
                            </Col>
                        </Row>
                    </TabPane>
                ))}
            </TabContent>
        );

        return (
            <div className='ArbitratorContent'>
                <Jumbotron className='jumbo'>
                    {tabBar}
                    {tabContent}
                </Jumbotron>
                <p>Output:</p>
                <BlockConsole consoleoutput={this.state.consoleoutput} />
                <p>Balances:</p>
                <BlockConsole consoleoutput={this.state.balances} />
                <p>Cases:</p>
                <BlockConsole consoleoutput={this.state.cases} />
                <p>Claims:</p>
                <BlockConsole consoleoutput={this.state.claims} />
                <p>Arbitrators:</p>
                <BlockConsole consoleoutput={this.state.arbitrators} />
            </div>
        )
    }

}
// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following action to props
const mapDispatchToProps = {
  setAuth: AuthenticationActions.setAuthentication,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Arbitrators);