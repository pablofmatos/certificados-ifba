const {
    getTodosCertificadoModelos,
    getCertificadoModeloPorId,
    insereCertificadoModelo,
    modificaCertificadoModelo,
    removeCertificadoModeloPorId
} = require("../service/certificado_modelo.js")

const SERVER_ERROR = 500
const NOT_FOUND = 404
const UNPROCESSED_ENTITY = 422
const CREATED = 201

async function getCertificadoModelos(req, res) {
    try {
        const registros = await getTodosCertificadoModelos()
        res.send(registros)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function getCertificadoModelo(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const registro = await getCertificadoModeloPorId(id)

            if (!registro) {
                res.status(NOT_FOUND).send("CertificadoModelo não encontrado!")
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

async function postCertificadoModelo(req, res) {
    try {
        const novoRegistro = req.body

        await insereCertificadoModelo(novoRegistro)

        res.status(CREATED)
        res.send("CertificadoModelo inserido com sucesso!")
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function patchCertificadoModelo(req, res) {
    try {
        const id = parseInt(req.params.id)
        const body = req.body

        const registroAtualizado = await modificaCertificadoModelo(body, id)

        res.send(registroAtualizado)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function removeCertificadoModelo(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const removido = await removeCertificadoModeloPorId(id)

            if (!removido) {
                res.status(NOT_FOUND).send("CertificadoModelo não encontrado!")
            } else {
                res.send("CertificadoModelo removido com sucesso!")
            }
        }
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

module.exports = {
    getCertificadoModelos,
    getCertificadoModelo,
    postCertificadoModelo,
    patchCertificadoModelo,
    removeCertificadoModelo
}
