export type TableRowsConfig = {
	code: string,
	table: string,
	scope: string,
	limit?: string
}

export type CaseFile = {
	accepted_claims: any[],
	approvals: any[],
	arbitrators: string[],
	case_id: number,
	case_ruling: string,
	case_status: number,
	claimant: string,
	last_edit: number,
	required_langs: number[],
	respondant: string,
	unread_claims: any[]
}