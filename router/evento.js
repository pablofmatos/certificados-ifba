const {
    getEventos,
    getEvento,
    postEvento,
    patchEvento,
    removeEvento
} = require("../controller/evento.js")

const { Router } = require("express")

const router = Router()

router.get('/', getEventos)
router.get('/:id', getEvento)
router.post('/', postEvento)
router.patch('/:id', patchEvento)
router.delete('/:id', removeEvento)

module.exports = router
