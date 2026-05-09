const {
    getAtividades,
    getAtividade,
    postAtividade,
    patchAtividade,
    removeAtividade
} = require("../controller/atividade.js")

const { Router } = require("express")

const router = Router()

router.get('/', getAtividades)
router.get('/:id', getAtividade)
router.post('/', postAtividade)
router.patch('/:id', patchAtividade)
router.delete('/:id', removeAtividade)

module.exports = router
