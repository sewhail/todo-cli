#!/usr/bin/env node

import addTask from './commands/addTask.js'
import deleteTask from './commands/deleteTask.js'
import readTask from './commands/readTask.js'
import updateTask from './commands/updateTask.js'
import { Command } from 'commander'


const program = new Command()

program
    .name('todo')
    .description('your command line task manager!')
    .version('1.0.0')


program
    .command('add')
    .description('create a new task')
    .action('addTask')

program
    .command('read')
    .description('reads all the tasks')
    .action('readTask')

program
    .command('update')
    .description('updates a task')
    .action('updateTask')

program
    .command('delete')
    .description('deletes a task')
    .action('deleteTask')

program.parse()
