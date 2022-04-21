import React from 'react'
import { CaseFile } from '../../types'
import { CASE_STATUS } from '../../const/case';
import { GET_LANG_CODES } from '../../const/lang';

const CaseItem = ({ item }: { item: CaseFile}) => {
	const {
		approvals,
		arbitrators,
		case_id,
		case_ruling,
		case_status,
		claimant,
		update_ts,
		required_langs,
		respondant,
		number_claims
	} = item

	return (
		<tr key={case_id}>
			<td>{case_id}</td>
			<td>{CASE_STATUS[case_status]}</td>
			<td>{claimant}</td>
			<td>{respondant}</td>
			<td>{arbitrators.length}</td>
			<td>{approvals.length}</td>
			<td>{number_claims}</td>
			<td>{required_langs.map(item => GET_LANG_CODES()[item].lang)}</td>
			<td>{case_ruling}</td>
			<td>{update_ts}</td>
		</tr>
	)
}

export default CaseItem