import { GoogleSpreadsheet } from 'google-spreadsheet'

const doc = new GoogleSpreadsheet(process.env.DOC_ID)

export default async(req,res)=>{

    await doc.useServiceAccountAuth({
        client_email:process.env.CLIENT_EMAIL,
        private_key:process.env.PRIVATE_KEY
    })
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A2:B2')

    const mostrarPromocao = sheet.getCell(1,0)
    const textoCell = sheet.getCell(1,1)

    res.end(JSON.stringify({
        cupomExists:mostrarPromocao.value === "VERDADEIRO",
        message:textoCell.value
    }))
}