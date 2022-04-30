export interface IImportsMappings {
	name: string
	regex?: string | null
	depend?: string[] | null
	mandatory?: boolean
	updateKey?: boolean
	msgError?: string
}
