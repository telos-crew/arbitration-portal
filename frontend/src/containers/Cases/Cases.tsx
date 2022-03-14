import React from 'react'
import { Jumbotron, Table } from 'reactstrap'

type Props = {}

const Cases = (props: Props) => {
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
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Active</td>
						<td>captaincrypt</td>
						<td>newdecidevot</td>
						<td>Someone1, someone2</td>
						<td>SomeApproval</td>
						<td>En</td>
						<td>Something</td>
					</tr>
				</tbody>
			</Table>
		</div>
	)
}

export default Cases