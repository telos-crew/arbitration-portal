import React from 'react'
import { CaseFile } from '../../types'

const CaseItem = ({ item }: { item: CaseFile}) => {
	const {
		accepted_claims,
		approvals,
		arbitrators,
		case_id,
		case_ruling,
		case_status,
		claimant,
		last_edit,
		required_langs,
		respondant,
		unread_claims,		
	} = item

	return (
		<tr key={case_id}>
			<td>{case_id}</td>
			<td>{case_status}</td>
			<td>{claimant}</td>
			<td>{respondant}</td>
			<td>{JSON.stringify(arbitrators)}</td>
			<td>{JSON.stringify(approvals)}</td>
			<td>{required_langs}</td>
			<td title={JSON.stringify(unread_claims)}>{unread_claims.length}</td>
			<td title={JSON.stringify(accepted_claims)}>{accepted_claims.length}</td>
			<td>{case_ruling}</td>
			<td>{last_edit}</td>
		</tr>
	)
}

export default CaseItem