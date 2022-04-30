import inquirer from 'inquirer'
import { IImportsMappings } from '../interfaces/imports-mappings.interface'

export const importsMappingsṔrompts: inquirer.QuestionCollection<IImportsMappings>[] = [
	{
		name: 'name',
		type: 'input',
		message: 'Name:',
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
		type: 'list',
		message: 'UpdateKey:',
		default: false,
		choices: ['true', 'false'],
	},
	{
		name: 'msgError',
		type: 'input',
		message: 'MsgError:',
		default: 'Error de validacion',
	},
]
