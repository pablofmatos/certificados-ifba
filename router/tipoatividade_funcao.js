const {
    getTipoAtividadeFuncaos,
    getTipoAtividadeFuncao,
    postTipoAtividadeFuncao,
    patchTipoAtividadeFuncao,
    removeTipoAtividadeFuncao
} = require("../controller/tipoatividade_funcao.js")

const { Router } = require("express")

const router = Router()

router.get('/', getTipoAtividadeFuncaos)
router.get('/:id', getTipoAtividadeFuncao)
router.post('/', postTipoAtividadeFuncao)
router.patch('/:id', patchTipoAtividadeFuncao)
router.delete('/:id', removeTipoAtividadeFuncao)

module.exports = router