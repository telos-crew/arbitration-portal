import React from 'react'
import { Jumbotron } from 'reactstrap'

type Props = {}

const Claims = (props: Props) => {
	return (
		<div className='ArbitratorContent'>
			<Jumbotron className='jumbo'>
				<span>hi</span>
			</Jumbotron>
			{/* <p>Output:</p>
			<BlockConsole consoleoutput={this.state.consoleoutput} />
			<p>Balances:</p>
			<BlockConsole consoleoutput={this.state.balances} />
			<p>Cases:</p>
			<BlockConsole consoleoutput={this.state.cases} />
			<p>Claims:</p>
			<BlockConsole consoleoutput={this.state.claims} />
			<p>Arbitrators:</p>
			<BlockConsole consoleoutput={this.state.arbitrators} /> */}
		</div>
	)
}

export default Claims