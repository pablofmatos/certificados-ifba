const {
    getTodosCertificadoUsuarios,
    getCertificadoUsuarioPorId,
    insereCertificadoUsuario,
    modificaCertificadoUsuario,
    removeCertificadoUsuarioPorId
} = require("../service/certificado_usuario.js")

const SERVER_ERROR = 500
const NOT_FOUND = 404
const UNPROCESSED_ENTITY = 422
const CREATED = 201

async function getCertificadoUsuarios(req, res) {
    try {
        const registros = await getTodosCertificadoUsuarios()
        res.send(registros)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function getCertificadoUsuario(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const registro = await getCertificadoUsuarioPorId(id)

            if (!registro) {
                res.status(NOT_FOUND).send("Certificado Usuário não encontrado!")
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

async function postCertificadoUsuario(req, res) {
    try {
        const novoRegistro = req.body

        await insereCertificadoUsuario(novoRegistro)

        res.status(CREATED)
        res.send("CertificadoUsuario inserido com sucesso!")
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function patchCertificadoUsuario(req, res) {
    try {
        const id = parseInt(req.params.id)
        const body = req.body

        const registroAtualizado = await modificaCertificadoUsuario(body, id)

        res.send(registroAtualizado)
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

async function removeCertificadoUsuario(req, res) {
    try {
        const id = req.params.id

        if (id && Number(id)) {
            const removido = await removeCertificadoUsuarioPorId(id)

            if (!removido) {
                res.status(NOT_FOUND).send("CertificadoUsuario não encontrado!")
            } else {
                res.send("CertificadoUsuario removido com sucesso!")
            }
        }
    } catch (error) {
        res.status(SERVER_ERROR).json({ error: error.message })
    }
}

module.exports = {
    getCertificadoUsuarios,
    getCertificadoUsuario,
    postCertificadoUsuario,
    patchCertificadoUsuario,
    removeCertificadoUsuario
}
