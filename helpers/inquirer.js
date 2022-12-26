const inquirer = require('inquirer');
const { validate } = require('uuid');
const Task = require('../model/task');
require('colors');
 
const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Create task`
            },
            {
                value: '2',
                name: `${'2.'.green} List tasks`
            },
            {
                value: '3',
                name: `${'3.'.green} Pending tasks`
            },
            {
                value: '4',
                name: `${'4.'.green} Completed tasks`
            },
            {
                value: '5',
                name: `${'5.'.green} Complete task`
            },
            {
                value: '6',
                name: `${'6.'.green} Delete task`
            },
            {
                value: '0',
                name: `${'0.'.green} Exit`
            },
        ]
    }
];
 
const inquirerMenu = async () => {
    console.clear()
    console.log('======================='.green)
    console.log(' Select an option '.yellow)
    console.log('=======================\n'.green)
 
    const {option} = await inquirer.prompt(menuOpts);
 
    return option;
 
}

const inquirerPause = async () => {
    const menuInput = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'Enter'.green} to continue`
        }
    ];

    console.log('\n'); 
    await inquirer.prompt(menuInput);
 
}

const readInput = async (message) => {
    const menuRead = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0) {
                    return 'Please  enter a value';
                }
                return true;
            }
        }
    ];
    
   const {desc} = await inquirer.prompt(menuRead);
   return desc;
}

const listDelete = async (tasks = []) => {
    const choices = tasks.map( (t,i) => {
    const index = `${i + 1}`.green;
        return {
            value: t.id,
            name: `${index} ${t.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancel'
    });

    const menuDelete = [
        {
            type: 'list',
            name: 'id',
            message: 'delete',
            choices
        }
    ];

    const {id} = await inquirer.prompt(menuDelete);
    return id;
}

const confirmAction = async (message) => {
    const menuConfirm = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(menuConfirm);
    return ok;
}

const showCheckList = async (tasks = []) => {
    const choices = tasks.map( (t,i) => {
    const index = `${i + 1}`.green;
        return {
            value: t.id,
            name: `${index} ${t.desc}`,
            checked: (t.completed) ? true : false
        }
    });

    const menuCheck = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(menuCheck);
    return ids;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    readInput,
    listDelete,
    confirmAction,
    showCheckList
}