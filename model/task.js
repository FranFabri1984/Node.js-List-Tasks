const {v4: idv4} = require('uuid');

class Task {
    id = '';
    desc = '';
    completed = null;

    constructor(desc) {
        this.id = idv4();
        this.desc = desc;
        this.completed = null;
    }

}

module.exports = Task;