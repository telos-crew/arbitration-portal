import React from 'react'
import {
	Form,
	FormGroup,
	Label,
	Col,
	CustomInput,
	Input,
	FormFeedback,
	FormText
} from 'reactstrap'
import Uploader                  from '../Uploader';

type Props = {
	handleSubmit: any,
	fileCaseArr: any[],
	languages: any[],
	tabElement: any,
	inputChangedHandler: any,
	checkBoxChangedHandler: any
}

const FileCase = ({ handleSubmit, fileCaseArr, languages, tabElement, inputChangedHandler, checkBoxChangedHandler }: Props) => {
	return (
		<Form onSubmit={(event) => handleSubmit(event, tabElement.id)}>
			{fileCaseArr.map(formElement => (
					<FormGroup className='formgroup' key={formElement.id} row>
							<Label for={formElement.id} sm={1}>{formElement.label}</Label>
							<Col sm={11}>
									{formElement.id === 'lang_codes' ? 
											languages.map(language => (
													<CustomInput
														className='checkboxClass'
														key={language}
														name={formElement.id}
														type={formElement.type}
														id={language}
														label={language}
														onClick={() => checkBoxChangedHandler(tabElement.id, formElement.id, language)}
													/>
											))
									: null }
									{formElement.id === 'claim_link' ?                                                        
											<div>
													<Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => inputChangedHandler(event, tabElement.id, formElement.id)} />
													<Uploader />
											</div>
									: null}
									{formElement.id !== 'lang_codes' && formElement.id !== 'claim_link' ? 
											<Input
												type={formElement.type}
												value={formElement.value}
												placeholder={formElement.placeholder}
												onChange={(event) => inputChangedHandler(event, tabElement.id, formElement.id)}
											/>
									: null}
									<FormFeedback>...</FormFeedback>
									<FormText>{formElement.text}</FormText>
							</Col>
					</FormGroup>
				))}
		</Form>
	)
}

export default FileCase