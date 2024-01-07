import { connectDB, disconnectDB } from '../db/connectDB.js'
import Todos from '../schema/todoSchema.js'
import ora from 'ora'
import chalk from 'chalk'

export default async function readTask() {
    try {
        await connectDB()
        const spinner = ora('fetching all todos...').start()
        const todos = await Todos.find({})
        spinner.stop()

        if (todos.length === 0) {
            console.log(chalk.blueBright('you do not have any tasks yet!'))
        } else {
            todos.forEach(todo => {
                console.log(
                    chalk.cyanBright('Todo Code : ') + todo.code + '\n' +
                    chalk.blueBright('Name : ') + todo.name + '\n' +
                    chalk.yellowBright('Description : ') + todo.detail + '\n'
                )
            });
        }

        await disconnectDB()

    } catch (error) {
        console.log('something went wrong, error :', error)
        process.exit(1)
    }
}