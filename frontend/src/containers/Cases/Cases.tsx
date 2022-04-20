import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap'
import useBlockchain from '../useBlockchain';
import CaseItem from './CaseItem';
import CreateCase from './CreateCase';

type Props = {}

const Cases = (props: Props) => {
	const { FETCH_CASES } = useBlockchain()
	const [cases, setCases] = useState([])

	const fetchCases = async () => {
		try {
			const caseData = await FETCH_CASES()
			console.log('caseData: ', caseData)
			setCases(caseData)
		} catch (err) {
			console.warn(err)
		}
	}

	useEffect(() => {
		fetchCases()
	},[])

	if (!cases) return null

	return (
		<div className='ArbitratorContent'>
			<CreateCase />
			<Table bordered hover responsive>
				<thead>
					<tr>
						<th>ID</th>
						<th>Status</th>
						<th>Claimant</th>
						<th>Respondant</th>
						<th>Arbitrators</th>
						<th>Approvals</th>
						<th>Language</th>
						<th>Unread Claims</th>
						<th>Accepted Claims</th>
						<th>Ruling</th>
						<th>Last Updated</th>
					</tr>
				</thead>
				<tbody>
					{cases && cases.map((item: any) => <CaseItem item={item} />)}
				</tbody>
			</Table>
		</div>
	)
}

export default Cases