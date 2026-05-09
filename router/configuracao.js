const {
    getConfiguracaos,
    getConfiguracao,
    postConfiguracao,
    patchConfiguracao,
    removeConfiguracao
} = require("../controller/configuracao.js")

const { Router } = require("express")

const router = Router()

router.get('/', getConfiguracaos)
router.get('/:id', getConfiguracao)
router.post('/', postConfiguracao)
router.patch('/:id', patchConfiguracao)
router.delete('/:id', removeConfiguracao)

module.exports = router
