export interface IImportsMappings {
	id?: string | null
	name: string
	table?: string | null
	regex?: string | null
	depend?: string[] | null
	mandatory?: boolean
	updateKey?: boolean
	msgError?: string
}
