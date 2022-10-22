import PouchDB from 'pouchdb';
import pouchDBFind from 'pouchdb-find';


export function syncDatabase() {
    // open the database
    var sync = PouchDB.sync(
        'pastoral-app',
        'http://localhost:5984/pastoral-app',
        {
            live: true,
            retry: true,
        },
    )
        .on('change', function (info) {
            // handle change
            console.log('info');
        })
        .on('paused', function (err) {
            // replication paused (e.g. replication up to date, user went offline)
            console.log('paused' + err);
        })
        .on('active', function () {
            // replicate resumed (e.g. new changes replicating, user went back online)
            console.log('active');
        })
        .on('denied', function (err) {
            // a document failed to replicate (e.g. due to permissions)
            console.log(err);
        })
        .on('complete', function (info) {
            // handle complete
            console.log('complete');
        })
        .on('error', function (err) {
            // handle error
            console.log(err);
        });
}

export function createRemote() {
    var db = new PouchDB('http://localhost:5984/pastoral-app');

    db.info().then(function (info) {
        console.log(info);
    });
}


// function opendb() {
//     // open the database
//     PouchDB.plugin(pouchDBFind);
//     var db = new PouchDB('pastoral-app');

//     db.info().then(function (info) {
//         console.log(info);
//     });

//     var test = {
//         title: 'Note 4',
//         main: 'Some text in here',
//     };

//     db.post(test)
//         .then(function (response) {
//             // handle response
//             console.log(response);
//         })
//         .catch(function (err) {
//             console.log(err);
//         });

//     // db.createIndex({
//     //   index: {
//     //     fields: ['title']
//     //   }
//     // }).then(function (result) {
//     //   // handle result
//     // }).catch(function (err) {
//     //   console.log(err);
//     // });

//     //   db.find({
//     //     selector: { title: 'Note 3' },
//     //     fields: ['_id', 'title', 'main'],
//     //     sort: ["title"]
//     //   }).then(function (result) {
//     //     // handle result
//     //     console.log(result)
//     //   }).catch(function (err) {
//     //     console.log(err);
//     //   });
// }
