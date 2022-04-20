import React, { useState } from 'react'
import './Cases.css'
import classNames from 'classnames'
import { useSelector } from 'react-redux';
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
	Label,
	Spinner,
	Button,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap'
import { RootState } from '../../types/redux';
import { GET_LANG_CODES } from '../../const/lang';

type Props = {}

const INITIAL_INPUT = {
	'claimant': '',
	'respondant': '',
	'link': '',
	'language': '',
}

const CreateCase = (props: Props) => {
	const { identity } = useSelector((state: RootState) => state.authentication)
	const [activeTab, setActiveTab] = useState('newCaseFile')
	const [input, setInput] = useState(INITIAL_INPUT)
	const[isSubmitting, setIsSubmitting] = useState(false)
	const [isLanguageDropdownVisible, setIsLanguageDropdownVisible] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const onChangeInput = (e: any, key: string) => {
		console.log('onChangeInput e: ', 'key: ', key)
		setErrorMessage('')
		const newInput = e.target.value
		setInput({
			...input,
			[key]: newInput
		})
	}

	const onChangeLanguage = ({ target: { value }}) => {
		console.log('onChangeLanguage, event: ', value)
		setInput({
			...input,
			language: value
		})
	}

	const submit = () => {
		if (!isInputValid()) return
		setIsSubmitting(true)
		console.log('submitting')
		setTimeout(() => setIsSubmitting(false), 3000)
	}

	const isInputValid = () => {
		let isValid = false
		if (input.claimant && input.respondant && input.link && input.language) {
			isValid = true
		} else {
			setErrorMessage('Please fill out all fields')
		}
		return isValid
	}

	const toggleLanguageDropdown = () => {
		setIsLanguageDropdownVisible(!isLanguageDropdownVisible)
	}

	console.log('input: ', input)
	const selectedLanguage = GET_LANG_CODES().find(item => item.code === input.language)

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
											<Input onChange={(newInput: string) => onChangeInput(newInput, 'claimant')} value={input.claimant} />
									</Col>
								</FormGroup>
								<FormGroup className='formgroup' row>
									<Label sm={1}>
										Respondant
									</Label>
									<Col sm={3}>
											<Input onChange={(newInput: string) => onChangeInput(newInput, 'respondant')} value={input.respondant} />
									</Col>
								</FormGroup>
								<FormGroup className='formgroup' row>
									<Label sm={1}>
										Link
									</Label>
									<Col sm={3}>
											<Input onChange={(newInput: string) => onChangeInput(newInput, 'link')} value={input.link} />
									</Col>
								</FormGroup>
								<FormGroup className='formgroup' row>
									<Label sm={1}>
										Language
									</Label>
									<Col sm={3}>
									<Dropdown value={input.language} isOpen={isLanguageDropdownVisible} toggle={toggleLanguageDropdown}>
										<DropdownToggle className='langToggle' caret>
											{(selectedLanguage && selectedLanguage.lang) || 'Choose Language'}&nbsp;
										</DropdownToggle>
										<DropdownMenu>
											{GET_LANG_CODES().map(({ lang, code }: any) => {
												return (
													<DropdownItem value={code} onClick={onChangeLanguage} key={code} active={code === input.language} dropdownValue={code}>{lang}</DropdownItem>
												)
											})}
										</DropdownMenu>
									</Dropdown>
									</Col>
								</FormGroup>
							</Form>
							<Button className='submitButton' color='primary' onClick={submit} disabled={isSubmitting || !identity}>Submit</Button>
							{isSubmitting && <Spinner className='submitSpinner' type='grow' color='primary' />}
						</Col>
						<Row className='errorMessageWrap'>
							{!!errorMessage && <div className='errorMessage'>{errorMessage}</div>}
						</Row>
					</Row>					
				</TabPane>			
			</TabContent>
		</Jumbotron>
	)
}

export default CreateCase