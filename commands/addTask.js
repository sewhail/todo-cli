import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../db/connectDB.js"
import Todos from "../schema/todoSchema.js"
import ora from "ora";
import chalk from "chalk";

async function input() {
    const answers = await inquirer.prompt([
        { name: 'name', message: 'enter name of the task: ', type: 'input' },
        { name: 'detail', message: 'enter the details of the task: ', type: 'input' },
    ])
    return answers
}

const askQuestions = async () => {
    const todoArray = []
    let loop = false
    
    do {
        const userRes = await input()
        todoArray.push(userRes)
        const confirmQ = await inquirer.prompt([
            {name: 'confirm', message: 'do you want to add more tasks? ', type: 'confirm'}
        ])
        
        if (confirmQ.confirm) {
            loop=true
        }
        else {
            loop=false
        }
    } while (loop)
    
    return todoArray
}

export default async function addTask() {
    try {
        const userResponse = await askQuestions

        await connectDB()

        let spinner = ora('creating the todos...').start()

        for (let i = 0; i < userResponse.length; i++){
            const response = userResponse[i]
            await Todos.create(response)
        }

        spinner.stop()
        console.log(chalk.greenBright('created the todos!'))

        await disconnectDB()
    } catch (error) {
        console.log('something went wrong, error : ', error)
        process.exit(1)
    }
}