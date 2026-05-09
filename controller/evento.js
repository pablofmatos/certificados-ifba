const {
    getTodosEventos,
    getEventoPorId,
    insereEvento,
    modificaEvento,
    removeEventoPorId
} = require("../service/evento.js")

const SERVER_ERROR = 500
const NOT_FOUND = 404
const UNPROCESSED_ENTITY = 422
const CREATED = 201

async function getEventos(req, res) {
    try {
        const registros = await getTodosEventos()
        res.send(registros)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function getEvento(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const registro = await getEventoPorId(id)

            if (!registro) {
                res.status(NOT_FOUND).send("Evento não encontrado!")
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

async function postEvento(req, res) {
    try {
        const novoRegistro = req.body

        await insereEvento(novoRegistro)

        res.status(CREATED)
        res.send("Evento inserido com sucesso!")
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function patchEvento(req, res) {
    try {
        const id = parseInt(req.params.id)
        const body = req.body

        const registroAtualizado = await modificaEvento(body, id)

        res.send(registroAtualizado)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function removeEvento(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const removido = await removeEventoPorId(id)

            if (!removido) {
                res.status(NOT_FOUND).send("Evento não encontrado!")
            } else {
                res.send("Evento removido com sucesso!")
            }
        }
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

module.exports = {
    getEventos,
    getEvento,
    postEvento,
    patchEvento,
    removeEvento
}
