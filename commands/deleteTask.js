import { connectDB, disconnectDB } from '../db/connectDB.js'
import Todos from '../schema/todoSchema.js'
import ora from 'ora'
import chalk from 'chalk'
import inquirer from 'inquirer'

export async function getTaskCode() {
    try {
        const answers = await inquirer.prompt([
            { name: 'code', message: 'enter the code of the todo : ', type: 'input' }
        ])

        answers.code = answers.code.trim()

        return answers
    } catch (error) {
        console.log('something went wrong...\n', error)
    }
}

export default async function deleteTask() {
    try {
        const userCode = await getTaskCode()
        await connectDB()

        const spinner = ora('fetching and deleting the task...').start()
        
        const response = await Todos.deleteOne({ code: userCode })
        
        spinner.stop()

        if (response.deletedCount === 0) {
            console.log(chalk.redBright('could not find any task matching the provided name. deletion failed.'))
        } else {
            console.log(chalk.greenBright('deleted the task successfully!'))
        }
    } catch (error) {
        console.log('something went wrong, error : ', error)
        process.exit(1)
    }
}