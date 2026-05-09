const {
    getTodosAtividades,
    getAtividadePorId,
    insereAtividade,
    modificaAtividade,
    removeAtividadePorId
} = require("../service/atividade.js")

const SERVER_ERROR = 500
const NOT_FOUND = 404
const UNPROCESSED_ENTITY = 422
const CREATED = 201

async function getAtividades(req, res) {
    try {
        const registros = await getTodosAtividades()
        res.send(registros)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function getAtividade(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const registro = await getAtividadePorId(id)

            if (!registro) {
                res.status(NOT_FOUND).send("Atividade não encontrado!")
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

async function postAtividade(req, res) {
    try {
        const novoRegistro = req.body

        await insereAtividade(novoRegistro)

        res.status(CREATED)
        res.send("Atividade inserido com sucesso!")
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function patchAtividade(req, res) {
    try {
        const id = parseInt(req.params.id)
        const body = req.body

        const registroAtualizado = await modificaAtividade(body, id)

        res.send(registroAtualizado)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function removeAtividade(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const removido = await removeAtividadePorId(id)

            if (!removido) {
                res.status(NOT_FOUND).send("Atividade não encontrado!")
            } else {
                res.send("Atividade removido com sucesso!")
            }
        }
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

module.exports = {
    getAtividades,
    getAtividade,
    postAtividade,
    patchAtividade,
    removeAtividade
}
