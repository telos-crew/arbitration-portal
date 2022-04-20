import React, { useState } from 'react'
import classNames from 'classnames'
import {
	Row,
	Col,
	Form,
	Jumbotron,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	FormGroup,
	Input,
	Label
} from 'reactstrap'

type Props = {}

const INITIAL_INPUT = {
	'claimant': '',
	'respondant': '',
	'link': '',
	'language': '',
}

const CreateCase = (props: Props) => {
	const [activeTab, setActiveTab] = useState('newCaseFile')
	const [input, setInput] = useState(INITIAL_INPUT)

	const onChangeInput = (e: any, key: string) => {
		const newInput = e.target.value
		setInput({
			...input,
			[key]: newInput
		})
	}

	return (
		<Jumbotron className='jumbo'>
			<Nav tabs>
				<NavItem key='newCaseFile'>
					<NavLink
						className={classNames({ active: activeTab === 'newCaseFile' })}
					>
						Create Case
					</NavLink>
				</NavItem>
			</Nav>
			<TabContent className='tabContent' activeTab={activeTab}>
				<TabPane tabId={activeTab} key={'newCaseFile'}>
					<Row>
						<Col sm='12'>
							<Form onSubmit={null}>
								<FormGroup className='formgroup' row>
									<Label sm={1}>
										Claimant
									</Label>
									<Col sm={3}>
										<div>
											<Input onChange={(newInput: string) => onChangeInput(newInput, 'claimant')} value={input.claimant} />
										</div>
									</Col>
								</FormGroup>
								<FormGroup className='formgroup' row>
									<Label sm={1}>
										Respondant
									</Label>
									<Col sm={3}>
										<div>
											<Input onChange={(newInput: string) => onChangeInput(newInput, 'respondant')} value={input.respondant} />
										</div>
									</Col>
								</FormGroup>
								<FormGroup className='formgroup' row>
									<Label sm={1}>
										Link
									</Label>
									<Col sm={3}>
										<div>
											<Input onChange={(newInput: string) => onChangeInput(newInput, 'link')} value={input.link} />
										</div>
									</Col>
								</FormGroup>
								<FormGroup className='formgroup' row>
									<Label sm={1}>
										Language
									</Label>
									<Col sm={3}>
										<div>
											<Input onChange={(newInput: string) => onChangeInput(newInput, 'language')} value={input.language} />
										</div>
									</Col>
								</FormGroup>
							</Form>
						</Col>
					</Row>					
				</TabPane>			
			</TabContent>
		</Jumbotron>
	)
}

export default CreateCase