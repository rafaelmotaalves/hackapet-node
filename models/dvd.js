let axios = require("axios")

let dvds = []
let currentId = 0

function getAllDvds () {
    return dvds
}

function getDvdsFromYear (year) {
    return dvds.filter(function (dvd) {
        return dvd.year === year
    })
}

function findDvdById (id) {
    return dvds.find(function(dvd) {
        return dvd.id === id;
    })
}

async function getDvdById(id) {
    let foundDvd = findDvdById(id)

    if (foundDvd) {
        return foundDvd
    } else {
        return null
    }
}

function createDvd (dvdInfo) {
    let newDvd = {
        id: currentId.toString(),
        title: dvdInfo.title,
        year: dvdInfo.year,
        rent: {
            status: false,
            renter: ""
        }
    }

    dvds.push(newDvd)
    currentId += 1
}

function updateDvd (id, dvdInfo) {
    let dvdTobeUpdated = dvds.find(function (dvd) {
        return dvd.id === id
    })

    if (dvdTobeUpdated) {
        dvdTobeUpdated.title = dvdInfo.title
        dvdTobeUpdated.year = dvdInfo.year
    
        return dvdTobeUpdated
    }

    return null
}

function deleteDvd (id) {
    let dvdIndex = dvds.findIndex(function (dvd) {
        return dvd.id == id
    })

    if (dvdIndex !== -1) {
        return dvds.splice(dvdIndex, 1)
    } else {
        return null
    }
}

function rentDvd (id, userName) {
    let dvdTobeRented = dvds.find(function (dvd) {
        return dvd.id === id && !dvdTobeRented.rent.status
    })

    if (dvdTobeRented) {
        dvdTobeRented.rent.status = true
        dvdTobeRented.rent.userName = userName

        return dvdTobeRented
    }

    return null
}

function returnDvd (id) {
    let dvdTobeRented = dvds.find(function (dvd) {
        return dvd.id === id && dvdTobeRented.rent.status
    })

    if (dvdTobeRented) {
        dvdTobeRented.rent.status = false
        dvdTobeRented.rent.userName = ""

        return dvdTobeRented
    }

    return null
}

module.exports = {
    getAllDvds,
    findDvdById,
    updateDvd,
    deleteDvd,
    createDvd,
    getDvdsFromYear,
    getDvdById,
    rentDvd,
    returnDvd
}