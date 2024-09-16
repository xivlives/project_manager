const mysqlConnection = require('../config/mysqlConnection');

const Project = {
    getAllProjects: (callback) => {
        mysqlConnection.query('SELECT * FROM projects', callback);
    },
    createProject: (data, callback) => {
        mysqlConnection.query('INSERT INTO projects SET ?', data, callback);
    }
};

module.exports = Project;
