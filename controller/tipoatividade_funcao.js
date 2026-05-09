const {
    getTodosTipoAtividadeFuncaos,
    getTipoAtividadeFuncaoPorId,
    insereTipoAtividadeFuncao,
    modificaTipoAtividadeFuncao,
    removeTipoAtividadeFuncaoPorId
} = require("../service/tipoatividade_funcao.js")

const SERVER_ERROR = 500
const NOT_FOUND = 404
const UNPROCESSED_ENTITY = 422
const CREATED = 201

async function getTipoAtividadeFuncaos(req, res) {
    try {
        const registros = await getTodosTipoAtividadeFuncaos()
        res.send(registros)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function getTipoAtividadeFuncao(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const registro = await getTipoAtividadeFuncaoPorId(id)

            if (!registro) {
                res.status(NOT_FOUND).send("TipoAtividadeFuncao não encontrado!")
            } else {
                res.send(registro)
            }
        } else {
            res.status(UNPROCESSED_ENTITY).send("ID inválido")
        }
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function postTipoAtividadeFuncao(req, res) {
    try {
        const novoRegistro = req.body

        await insereTipoAtividadeFuncao(novoRegistro)

        res.status(CREATED)
        res.send("TipoAtividadeFuncao inserido com sucesso!")
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function patchTipoAtividadeFuncao(req, res) {
    try {
        const id = parseInt(req.params.id)
        const body = req.body

        const registroAtualizado = await modificaTipoAtividadeFuncao(body, id)

        res.send(registroAtualizado)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function removeTipoAtividadeFuncao(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const removido = await removeTipoAtividadeFuncaoPorId(id)

            if (!removido) {
                res.status(NOT_FOUND).send("TipoAtividadeFuncao não encontrado!")
            } else {
                res.send("TipoAtividadeFuncao removido com sucesso!")
            }
        }
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

module.exports = {
    getTipoAtividadeFuncaos,
    getTipoAtividadeFuncao,
    postTipoAtividadeFuncao,
    patchTipoAtividadeFuncao,
    removeTipoAtividadeFuncao
}
