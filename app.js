require('colors');
const { inquirerMenu, 
        inquirerPause,
        readInput,
        listDelete,
        confirmAction,
        showCheckList
      } = require('./helpers/inquirer');
const { writeDB, readDB } = require('./helpers/write');
const Tasks = require('./model/tasks');
 
 
const main = async () => {   

    let option = '';
    const tasks = new Tasks();

    /* Cargar Tareas */
    const taskDB = readDB();
    if (taskDB) {
        tasks.readTasksArr(taskDB);
    }

    do 
    {
        /* Cargar Menu */
        option = await inquirerMenu();
        switch (option) {
            case '1':
               const desc = await readInput('Description:');
               tasks.createTask(desc);
            break;
            case '2':
               tasks.listCompleted();
            break;
            case '3':
               tasks.listPendingCompleted(false);
            break;
            case '4':
               tasks.listPendingCompleted(true);
            break;
            case '5':
             const ids = await showCheckList(tasks.listArr);
             tasks.toggleCompleted(ids);
            break;
            case '6':
               const id = await listDelete(tasks.listArr);
               if (id !== '0') {
                   const ok = await confirmAction('Are you sure');
                   if (ok) {
                    tasks.deleteTask(id);
                    console.log('Task Deleted');
                   } 
               }
            break;
        }
        /* Guardar Tareas */
        writeDB(tasks.listArr);
        /* Pausar Consola */
        await inquirerPause();
    } 
    while (option !== '0');
 
}
 
main();
