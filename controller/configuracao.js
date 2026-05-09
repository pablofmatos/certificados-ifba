const {
    getTodosConfiguracaos,
    getConfiguracaoPorId,
    insereConfiguracao,
    modificaConfiguracao,
    removeConfiguracaoPorId
} = require("../service/configuracao.js")

const SERVER_ERROR = 500
const NOT_FOUND = 404
const UNPROCESSED_ENTITY = 422
const CREATED = 201

async function getConfiguracaos(req, res) {
    try {
        const registros = await getTodosConfiguracaos()
        res.send(registros)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function getConfiguracao(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const registro = await getConfiguracaoPorId(id)

            if (!registro) {
                res.status(NOT_FOUND).send("Configuracao não encontrado!")
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

async function postConfiguracao(req, res) {
    try {
        const novoRegistro = req.body

        await insereConfiguracao(novoRegistro)

        res.status(CREATED)
        res.send("Configuracao inserido com sucesso!")
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function patchConfiguracao(req, res) {
    try {
        const id = parseInt(req.params.id)
        const body = req.body

        const registroAtualizado = await modificaConfiguracao(body, id)

        res.send(registroAtualizado)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function removeConfiguracao(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const removido = await removeConfiguracaoPorId(id)

            if (!removido) {
                res.status(NOT_FOUND).send("Configuracao não encontrado!")
            } else {
                res.send("Configuracao removido com sucesso!")
            }
        }
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

module.exports = {
    getConfiguracaos,
    getConfiguracao,
    postConfiguracao,
    patchConfiguracao,
    removeConfiguracao
}
