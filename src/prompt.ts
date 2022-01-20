import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { IHoemPrompt } from './enum/home-prompt.enum'
import { importsMappingsṔrompts } from './config/imports-mappings.prompt'
import { IImportsMappings } from './interfaces/imports-mappings.interface'
import { FinishedOutputPrompt } from './enum/create-file-output.enum'

export class Prompt {
	private result: Object | any = new Object()
	private property!: string
	private keys!: IImportsMappings | null

	async HomePrompt() {
		const resp = await inquirer.prompt({
			name: 'action',
			type: 'list',
			message: 'Seleccionar la accion que deseé realizar!:',
			choices: Object.values(IHoemPrompt),
		})
		switch (resp.action) {
			case IHoemPrompt.addProperty:
				this.AddPropertyPrompt()
				break
			case IHoemPrompt.finish:
				this.FinishedOutputPrompt()
				break
			case IHoemPrompt.editProperty:
				this.EditPropertyPrompt()
				break
			default:
				this.HomePrompt()
				break
		}
	}

	async AddPropertyPrompt() {
		const resp = await inquirer.prompt({
			name: 'importsMappings',
			type: 'input',
			message: 'Nombre de la propiedad:',
		})

		this.property = resp.importsMappings
		this.AddConfigPropertyPrompt()
	}

	async AddConfigPropertyPrompt() {
		const resp: any = await inquirer.prompt(importsMappingsṔrompts)
		Object.keys(resp).forEach((rp: string) => {
			resp[rp] = resp[rp] === '' ? null : this.validTypeOfValue(resp[rp])
		})

		this.result[this.property] = resp

		this.property = ''
		this.keys = null
		// console.clear()
		this.HomePrompt()
	}

	async EditPropertyPrompt() {
		const resp = await inquirer.prompt({
			name: 'edit',
			type: 'list',
			choices: Object.keys(this.result),
		})

		this.EditPropertyKeyPrompt(resp.edit)
	}

	async EditPropertyKeyPrompt(key: string) {
		const resp1 = await inquirer.prompt({
			name: 'keysIM',
			type: 'checkbox',
			choices: Object.keys(this.result[key]),
		})

		console.log('Editando...:', this.result[key])

		const questionCollection = this.createMultiFields(resp1.keysIM)

		const resp2 = await inquirer.prompt(questionCollection)

		Object.keys(resp2).forEach((dataResp) => {
			this.result[key][dataResp] = resp2[dataResp]
		})

		console.log('Editado:', this.result[key])

		this.HomePrompt()
	}

	createMultiFields(fields: string[]) {
		const questionCollection: any[] = []

		fields.forEach((field) => {
			questionCollection.push({
				name: field.toLowerCase(),
				type: 'input',
				message: field,
			})
		})

		return questionCollection
	}

	async FinishedOutputPrompt() {
		const resp = await inquirer.prompt({
			name: 'output',
			type: 'list',
			choices: Object.values(FinishedOutputPrompt),
		})

		switch (resp.output) {
			case FinishedOutputPrompt.console:
				console.log(JSON.stringify(this.result))
				break
			case FinishedOutputPrompt.writeFile:
				const pathOutput = path.resolve(__dirname, 'file.txt')
				const data = JSON.stringify(this.result)
				fs.writeFileSync(pathOutput, data)
				console.log('Output:', pathOutput)
				break
			default:
				break
		}
	}

	validTypeOfValue(value: any) {
		const valid = /^true|false$/.test(value)
		if (valid) {
			return JSON.parse(value)
		}

		return value
	}
}
