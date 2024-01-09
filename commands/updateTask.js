import { connectDB, disconnectDB } from '../db/connectDB.js'
import Todos from '../schema/todoSchema.js'
import ora from 'ora'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { getTaskCode } from './deleteTask.js'

async function askUpdateQ(todo) {
    try {
        const update = await inquirer.prompt([
            { name: 'name', message: 'update the name? ', type: 'input', default: todo.name },
            { name: 'description', message: 'update the description? ', type: 'input', default: todo.detail },
            {name: 'status', message: 'update the status? ', type: 'list', choices: ['completed', 'pending'], default: todo.status }
        ])

        return update
    } catch (error) {
        console.log('something went wrong... \n', error)
    }
}

export default async function updateTask() {
    try {
        const userCode = await getTaskCode()

        await connectDB()

        const spinner = await ora('finding the task...').start

        const todo = await Todos.findOne({ code: userCode.code })
        
        spinner.stop()

        if (!todo) {
            console.log(chalk.redBright('could not find any tasks with the given code!'))
        } else {
            console.log(chalk.blueBright('type the updated details. press \'Enter\' if you don\'t want to update the data.'))
            
            const update = await askUpdateQ(todo)

            if (update.status === 'completed') {
                spinner.text = 'deleting the task...'
                spinner.start()
                await Todos.deleteOne({ _id: todo._id })
                spinner.stop()
                console.log(chalk.greenBright('deleted the task!'))
            } else {
                spinner.text = 'updating the task...'
                spinner.start()
                await Todos.updateOne({ _id: todo._id }, update, {runValidators: true})
                spinner.stop()
                console.log(chalk.greenBright('updated the task!'))
            }
        }

        await disconnectDB()

    } catch (error) {
        console.log('something went wrong... error: ', error)
        process.exit(1)
    }
}