import axios from 'axios'
import { TableRowsConfig } from '../types';

const { REACT_APP_TELOS_NODE_URL } = process.env

const GET_TABLE_ROWS_ENDPOINT = 'v1/chain/get_table_rows'

const useBlockchain = () => {

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
		FETCH_CASES
	}
}

export default useBlockchain