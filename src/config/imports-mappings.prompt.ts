import inquirer from 'inquirer'
import { IImportsMappings } from '../interfaces/imports-mappings.interface'

export const importsMappingsṔrompts: inquirer.QuestionCollection<IImportsMappings>[] = [
	{
		name: 'id',
		type: 'input',
		message: 'Id:',
		suffix: 'default null',
	},
	{
		name: 'name',
		type: 'input',
		message: 'Name:',
	},
	{
		name: 'table',
		type: 'input',
		message: 'Table:',
		suffix: 'default null',
	},
	{
		name: 'regex',
		type: 'input',
		message: 'Regex:',
		default: null,
	},
	{
		name: 'depend',
		type: 'input',
		message: 'Depend:',
		suffix: 'default null',
	},
	{
		name: 'mandatory',
		type: 'list',
		message: 'Mandatory:',
		choices: ['true', 'false'],
	},
	{
		name: 'updateKey',
		type: 'input',
		message: 'UpdateKey:',
		default: false,
	},
	{
		name: 'msgError',
		type: 'input',
		message: 'MsgError:',
		default: 'Error de validacion',
	},
]
