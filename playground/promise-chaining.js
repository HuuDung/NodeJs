require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5f9a84f5bd6e87164d89d3be', {
//     age: 1
// }).then((user) => {
//     console.log(user);
//     return User.countDocuments({
//         age: 1
//     })
// }).then((result) => {
//     console.log(result);
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {
        age
    })

    const count = await User.countDocuments({
        age
    })
    return count
}

updateAgeAndCount('5f9a84f5bd6e87164d89d3be', 2).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
})