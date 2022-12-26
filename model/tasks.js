const Task = require('./task');

class Tasks {
    list = {
        'abc' : 123
    };

    get listArr() {
        const Arr = [];
        Object.keys(this.list).forEach( key => {
            const t = this.list[key];
            Arr.push(t);

        });
        return Arr;
    }

    constructor() {
        this.list = {};
    }

    deleteTask( id = '') {
        if (this.list[id]) {
            delete this.list[id];
        }
    }

    readTasksArr (ts = []) {
        ts.forEach(t => {
        this.list[t.id] = t;
        });
    }

    createTask(desc = '') {
        const task = new Task(desc);
        this.list[task.id] = task;
    }

    listCompleted() {
        console.log();
        this.listArr.forEach( (t,i) => {
            const index = `${i + 1 + '.'}`.green;
            const { desc, completed} = t;
            const state = (completed)
                ? 'Completed'.green
                : 'Pending'.red;
            console.log(`${index} ${desc} :: ${state}`);
        })
    }

    listPendingCompleted (com = true ) {
        console.log();
        let count = 0;
        this.listArr.forEach( t => {
            const { desc, completed} = t;
            const state = (completed)
                ? 'Completed'.green
                : 'Pending'.red;
            if (com) {
                if (completed) {
                    count += 1;
                    console.log(`${(count + '.').green} ${desc} :: ${completed.green}`);
                }
            } else {
                if (!completed) {
                    count += 1;
                    console.log(`${(count + '.').green} ${desc} :: ${state}`);
                }  
            }
        })
    }

    toggleCompleted( ids = []) {
        ids.forEach(id => {
            const t = this.list[id];
            if (!t.completed) {
                t.completed = new Date().toISOString();
            }
        });

        this.listArr.forEach(t => {
            if (!ids.includes(t.id)) {
               this.list[t.id].completed = null;
            }
        });
    }
}

module.exports = Tasks;