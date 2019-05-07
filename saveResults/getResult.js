const request = require('request');

exports.averageAge = () => {
    let url =  'http://localhost:7071/api/averageAge';

    return new Promise((resolve, reject) => {
        request.get(url ,(err,response, body) => {
            if (err){reject(err);}
            data = JSON.parse(body)
            resolve(data[0].averageAge);
        })
    });
}

exports.maxAge = () => {
    let url =  'http://localhost:7071/api/maxAge';

    return new Promise((resolve, reject) => {
        request.get(url ,(err,response, body) => {
            if (err){reject(err);}
            data = JSON.parse(body)
            resolve(data);
        })
    });
}

exports.minAge = () => {
    let url =  'http://localhost:7071/api/minAge';

    return new Promise((resolve, reject) => {
        request.get(url ,(err,response, body) => {
            if (err){reject(err);}
            data = JSON.parse(body)
            resolve(data);
        })
    });
}

exports.southernUser = () => {
    let url =  'http://localhost:7071/api/southernUser';

    return new Promise((resolve, reject) => {
        request.get(url ,(err,response, body) => {
            if (err){reject(err);}
            data = JSON.parse(body)
            resolve(data[0]);
        })
    });
}

exports.northernUser = () => {
    let url =  'http://localhost:7071/api/northernUser';
    return new Promise((resolve, reject) => {
        request.get(url ,(err,response, body) => {
            if (err){reject(err);}
            data = JSON.parse(body);
            resolve(data[0]);
        })
    });
}
