import { useSelector } from 'react-redux'
import { SigningRequest } from 'eosio-signing-request'
import axios from 'axios'
import { TableRowsConfig } from '../types'
import { getEsrOptions } from '../const/esr'

const { REACT_APP_TELOS_NODE_URL } = process.env

const GET_TABLE_ROWS_ENDPOINT = 'v1/chain/get_table_rows'

export const MAINNET_ENDPOINTS = ['https://telos.caleos.io', 'https://mainnet.telosusa.io']

export const TESTNET_ENDPOINTS = [
  // 'https://testnet.telosusa.io',
  'https://testnet.telos.caleos.io'
]

const CONFIG = {
  testnet: {
    TELOS_API_ENDPOINTS: TESTNET_ENDPOINTS,
    CHAIN_ID: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
    BLOCK_EXPLORER_ENDPOINT: 'https://telos-test.bloks.io'
  },
  mainnet: {
    TELOS_API_ENDPOINTS: MAINNET_ENDPOINTS,
    CHAIN_ID: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
    BLOCK_EXPLORER_ENDPOINT: 'https://telos.bloks.io'
  }
}


const useBlockchain = () => {
	// @ts-ignore
  const chain = 'mainnet'
  const chainConfig = CONFIG[chain]
  const { TELOS_API_ENDPOINTS, BLOCK_EXPLORER_ENDPOINT, CHAIN_ID } = chainConfig

  const GET_AUTHORIZATION = () => [
    {
      actor: '',
      permission: 'active'
    }
  ]

  const GET_TABLE_ROWS_ENDPOINT = () => 'v1/chain/get_table_rows'

  const GET_TRX_WEB_LINK = (trx_id: string) => `${BLOCK_EXPLORER_ENDPOINT}/transaction/${trx_id}`

  const CREATE_IDENTITY_REQUEST = () => {
    const config = {
      callback: `http://localhost:3000/?id={{sa}}`,
      chainId: CHAIN_ID,
      account: '',
      expire_seconds: 600,
      name: 'identity',
      authorization: [
        {
          actor: '............1',
          permission: '............2'
        }
      ],
      data: {
        permission: {
          actor: '............1',
          permission: '............2'
        }
      }
    }
    console.log('identity request config: ', JSON.stringify(config))
    const req1 = SigningRequest.identity(config, getEsrOptions(TELOS_API_ENDPOINTS[0]))
    console.log('req1 created: ', req1)
    const encoded = req1.encode()
    console.log('encoded: ', encoded)
    return encoded
  }

	const GET_TABLE_ROWS = async (config: TableRowsConfig) => {
		const { data } = await axios({
			url: `${REACT_APP_TELOS_NODE_URL}/${GET_TABLE_ROWS_ENDPOINT}`,
			method: 'post',
			headers: {
				'content-type': 'application/json'
			},
			data: {
				index_position: "1",
				json: true,
				key_type: "i64",
				limit: 100,
				lower_bound: null,
				reverse: false,
				table_key: "",
				...config
			}
		})
		return data
	}

	const FETCH_CASES = async () => {
		const { rows } = await GET_TABLE_ROWS({
			code: 'eosio.arb',
			scope: 'eosio.arb',
			table: 'casefiles'
		});
		return rows
	}

	return {
		FETCH_CASES,
		GET_AUTHORIZATION,
		GET_TABLE_ROWS_ENDPOINT,
		GET_TRX_WEB_LINK,
		CREATE_IDENTITY_REQUEST,
		GET_TABLE_ROWS
	}
}

export default useBlockchain