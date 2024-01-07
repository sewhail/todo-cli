import dotenv from 'dotenv'
import mongoose from 'mongoose'
import ora from 'ora'
import chalk from 'chalk'


dotenv.config()

export async function connectDB() {
    try {
        const spinner = ora('connecting to the database...').start()
        await mongoose.connect(process.env.MONGO_URI)
        spinner.stop()
        console.log(chalk.greenBright('successfully connected to the database!!!'))
    } catch (error) {
        console.log(chalk.redBright('error : '), error)
        process.exit(1)
    }
}

export async function disconnectDB() {
    try {
        await mongoose.disconnect()
        console.log(chalk.greenBright('successfully disconnected from the database'))
    } catch (error) {
        console.log(chalk.redBright('error : '), error)
        process.exit(1)
    }
}

connectDB()
disconnectDB()