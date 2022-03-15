import React, { useState, useEffect } from 'react'
import { Jumbotron, Table } from 'reactstrap'
import useBlockchain from '../useBlockchain';
import { CaseFile } from '../../types/blockchain';
import CaseItem from './CaseItem';

type Props = {}

const Cases = (props: Props) => {
	const { FETCH_CASES } = useBlockchain()
	const [cases, setCases] = useState([])

	const fetchCases = async () => {
		try {
			const something = await FETCH_CASES()
			console.log('something: ', something)
			setCases(something)
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
			<Jumbotron className='jumbo'>
				<span>hi</span>
			</Jumbotron>
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