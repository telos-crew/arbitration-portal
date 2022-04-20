export type AuthenticationReducer = {
	identity: string
}

export type RootState = {
	authentication: AuthenticationReducer
}