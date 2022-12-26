require('colors');

const showMenu = () => {
  
    return new Promise((resolve) => {
    
    console.clear();
    console.log('================================'.green);
    console.log(' List Tasks '.green);
    console.log('================================\n'.green);

    console.log(`${'1.'.green} Create task`);
    console.log(`${'2.'.green} List tasks`);
    console.log(`${'3.'.green} Pending tasks`);
    console.log(`${'4.'.green} Completed tasks`);
    console.log(`${'5.'.green} Complete task`);
    console.log(`${'6.'.green} Delete task`);
    console.log(`${'0.'.green} Exit\n`);

    //Interfaz de usuario
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.question('Select an option: ', (opt) =>{
        readline.close();
        resolve(opt);
    })

  }) 
}   

const Pause = () => {

    return new Promise((resolve) => {
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPress ${'Enter'.green} to continue\n`, (opt) =>{
            readline.close();
            resolve();
        })
    })
}

module.exports = { 
    showMenu,
    Pause

}