let express = require("express")
let router = express.Router()
let dvdModel = require("../models/dvd")

router.get("/", function (req, res) {
    let yearFilter = req.query.year

    if (yearFilter) {
        res.send(dvdModel.getDvdsFromYear(yearFilter))
    } else {
        res.send(dvdModel.getAllDvds())
    }

})

router.get("/:dvdId", async function (req, res) {
    let id = req.params.dvdId
    try {

        let resultDvd = await dvdModel.getDvdById(id) 

        if (resultDvd) {
            res.send(resultDvd)
        } else {
            res.status(404).send({ message: "Did not found a dvd with that id." })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})

router.post("/", function (req, res) {
    let body = req.body

    if (body.title && body.year) {

        let newDvd = dvdModel.createDvd(body)

        res.send(newDvd)
    } else {
        res.status(400).send({ message: "Must provide a valid dvd" })
    }
})

router.put("/:dvdId", function (req, res) {
    let id = req.params.dvdId
    let body = req.body

    if (body.title && body.year) {
        let updatedDvd = dvdModel.updateDvd(id, body);

        if (updatedDvd) {
            res.send(updatedDvd)
        } else {
            res.status(404).send({ message: "Did not found a dvd with that id." })
        }
    } else {
        res.status(404).send({ message: "Did not found a dvd with that id." })
    }
})

router.delete("/:dvdId", function (req, res) {
    let id = req.params.dvdId

    let deletedDvd = dvdModel.deleteDvd(id)

    if (deletedDvd) {
        res.send(deletedDvd)
    } else {
        res.status(404).send({ message: "Did not found a dvd with that id." })
    }

})

router.put("/:dvdId/rent", function (req, res) {
    let id = req.params.dvdId
    let userName = req.body.userName

    let rentedDvd = dvdModel.rentDvd(id, userName)

    if (rentedDvd) {
        res.send(rentedDvd)
    } else {
        res.status(404).send({ message: "Did not found a dvd with that id." })
    }
})


router.put("/:dvdId/return", function (req, res) {
    let id = req.params.dvdId
    let userName = req.body.userName

    let returnedDvd = dvdModel.returnDvd(id, userName)

    if (returnedDvd) {
        res.send(returnedDvd)
    } else {
        res.status(404).send({ message: "Did not found a dvd with that id." })
    }
})

module.exports = router;