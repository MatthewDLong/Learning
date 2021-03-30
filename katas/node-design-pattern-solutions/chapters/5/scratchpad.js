// // import request from "node-fetch";
// // import { readdir } from "fs";

// // const payload = {
// //   foo: "bar",
// // };

// // const makeRequest = (url, method, body, headers) => {
// //   return request(url, {
// //     method,
// //     body: JSON.stringify(body),
// //     headers,
// //   }).then((res) => res.json());
// // };

// // const jsonMimeType = "application/json";

// // const requests = [
// //   makeRequest("https://httpbin.org/get", "GET", undefined, {
// //     accept: jsonMimeType,
// //   }),
// //   makeRequest(
// //     "https://httpbin.org/put",
// //     "PUT",
// //     { foo: "bar" },
// //     { "content-type": jsonMimeType, accept: jsonMimeType }
// //   ),
// //   makeRequest(
// //     "https://httpbin.org/post",
// //     "POST",
// //     { foo: "bar " },
// //     { "content-type": jsonMimeType, accept: jsonMimeType }
// //   ),
// //   makeRequest("https://httpbin.org/delete", "DELETE", undefined, {
// //     accept: jsonMimeType,
// //   }),
// // ];

// // //////////////////////////////////////////////////////////////////

// // Promise.race(requests).then((data) => console.log(data));

// // //////////////////////////////////////////////////////////////////

// // function promisify(callbackApiFunction) {
// //   return function promisified(...args) {
// //     return new Promise((resolve, reject) => {
// //       const newArgs = [
// //         ...args,
// //         function (err, result) {
// //           if (err) {
// //             return reject(err);
// //           }
// //           resolve(result);
// //         },
// //       ];
// //       callbackApiFunction(...newArgs);
// //     });
// //   };
// // }

// // const readDirPromisified = promisify(readdir);

// // readDirPromisified(".").then((files) => {
// //   console.log(files);
// // });

// // //////////////////////////////////////////////////////////////////

// function getName(name, cb) {
//   return cb(null, name);
// }

// function promisify1(original) {
//   return function promisified(...args) {
//     return new Promise((resolve, reject) => {
//       const newArgs = [
//         ...args,
//         function (err, result) {
//           if (err) {
//             return reject(err);
//           }
//           resolve(result);
//         },
//       ];
//       original(...newArgs);
//     });
//   };
// }

// const getNamePromisified = promisify1(getName);

// getNamePromisified("m").then(
//   (name) => {
//     console.log(name);
//   },
//   (reason) => {
//     console.error(reason);
//   }
// );

import { randomBytes } from "crypto";

function promisify2(original) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        },
      ];
      original(...newArgs);
    });
  };
}

const randomBytesP = promisify2(randomBytes);

randomBytesP(10).then(
  (buf) => console.log(buf),
  (reason) => console.error(reason)
);
