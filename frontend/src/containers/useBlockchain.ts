import { useSelector } from 'react-redux'
import { SigningRequest } from 'eosio-signing-request'
import axios from 'axios'
import { TableRowsConfig } from '../types'
import { getEsrOptions } from '../const/esr'
import { RootState } from '../types/redux'

type SigningRequestData = {
  callback?: string,
  chainId?: string,
  actions: any[],
  expire_seconds?: number
}

const { REACT_APP_TELOS_NODE_URL } = process.env

const TABLE_ROWS_ENDPOINT = 'v1/chain/get_table_rows'

export const MAINNET_ENDPOINTS = ['https://telos.caleos.io', 'https://mainnet.telosusa.io']
export const TESTNET_ENDPOINTS = [
  // 'https://testnet.telosusa.io',
  'https://testnet.telos.caleos.io'
]

const CONFIG = {
  testnet: {
    TELOS_API_ENDPOINTS: TESTNET_ENDPOINTS,
    CHAIN_ID: '1eaa0824707c8c16bd25145493bf062aecddfeb56c736f6ba6397f3195f33c9f',
    BLOCK_EXPLORER_ENDPOINT: 'https://telos-test.bloks.io',
    ARBITRACTION_CONTRACT: 'testtelosarb',
    APP_HOSTNAME: 'http://localhost:3000'
  },
  mainnet: {
    TELOS_API_ENDPOINTS: MAINNET_ENDPOINTS,
    CHAIN_ID: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11',
    BLOCK_EXPLORER_ENDPOINT: 'https://telos.bloks.io',
    ARBITRACTION_CONTRACT: 'testtelosarb',
    APP_HOSTNAME: 'http://localhost:3000'
  }
}


const useBlockchain = () => {
  const { identity } = useSelector((state: RootState) => state.authentication)
  const chain = 'testnet'
  const chainConfig = CONFIG[chain]
  const { TELOS_API_ENDPOINTS, BLOCK_EXPLORER_ENDPOINT, CHAIN_ID } = chainConfig

  const GET_AUTHORIZATION = () => [
    {
      actor: identity,
      permission: 'active'
    }
  ]

  const GET_TRX_WEB_LINK = (trx_id: string) => `${BLOCK_EXPLORER_ENDPOINT}/transaction/${trx_id}`

  const CREATE_IDENTITY_REQUEST = (): string => {
    const config = {
      callback: `${CONFIG[chain].APP_HOSTNAME}?id={{sa}}`,
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
    const req1 = SigningRequest.identity(config, getEsrOptions(TELOS_API_ENDPOINTS[0]))
    const encoded = req1.encode()
    return encoded
  }

  const CREATE_SIGNING_REQUEST = async (data: SigningRequestData): Promise<string> => {
    const dataWithChainId = {
      ...data,
      chainId: CHAIN_ID
    }
    console.log('identity: ', identity)
    console.log('dataWithChainId: ', dataWithChainId)
    console.log(JSON.stringify(dataWithChainId))
    const req1 = await SigningRequest.create(dataWithChainId, getEsrOptions(TELOS_API_ENDPOINTS[0]))
    const encoded = req1.encode()
    return encoded
  }

	const GET_TABLE_ROWS = async (config: TableRowsConfig): Promise<{rows: any[]}> => {
		const { data } = await axios({
			url: `${REACT_APP_TELOS_NODE_URL}/${TABLE_ROWS_ENDPOINT}`,
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

	const FETCH_CASES = async (): Promise<any> => {
		const { rows } = await GET_TABLE_ROWS({
			code: CONFIG[chain].ARBITRACTION_CONTRACT,
			scope: CONFIG[chain].ARBITRACTION_CONTRACT,
			table: 'casefiles'
		});
		return rows
	}

  type FileCaseData = {
    claimant: string,
    respondant: string,
    claim_link: string,
    lang_codes: number[]
  }

  const FILE_CASE = async (data: FileCaseData, callbackRoute: string): Promise<any> => {
    const actions = [
      {
        account: CONFIG[chain].ARBITRACTION_CONTRACT,
        name: 'filecase',
        authorization: GET_AUTHORIZATION(),
        data
      }
    ]
    console.log('actions: ', actions)
    const signingRequest = await CREATE_SIGNING_REQUEST({
      callback: `${CONFIG[chain].APP_HOSTNAME}/${callbackRoute}`,
      chainId: CHAIN_ID,
      actions
    })
    return signingRequest
  }

	return {
		FETCH_CASES,
		GET_AUTHORIZATION,
    CREATE_SIGNING_REQUEST,
		GET_TRX_WEB_LINK,
		CREATE_IDENTITY_REQUEST,
		GET_TABLE_ROWS,
    FILE_CASE
	}
}

export default useBlockchain