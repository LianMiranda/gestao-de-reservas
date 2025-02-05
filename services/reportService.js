var PdfPrinter = require('pdfmake');
const dayjs = require('dayjs');
const reservationModel = require('../models/reservation');


async function generateReport(res, date) {
    try {
        if(date){
            const formatedDate = dayjs(date).format("DD/MM/YYYY");
    
            const reservations = (await reservationModel.findReservationByDate(date)).result || [];
    
            const fonts = {
                Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
                }
            };
    
            const printer = new PdfPrinter(fonts);
            const body = [];
    
            const tableCell = [
                {text: "ID", style: "columnsTitle"}, 
                {text: "MESA", style: "columnsTitle"}, 
                {text: "CLIENTE", style: "columnsTitle"}, 
                {text: "TELEFONE", style: "columnsTitle"}, 
                {text: "DATA", style: "columnsTitle"}, 
                {text: "HORA", style: "columnsTitle"}, 
                {text: "STATUS", style: "columnsTitle"}, 
            ]

            const columnsBody = []

            tableCell.forEach(column => {
                columnsBody.push(column)
            });

            body.push(columnsBody)

            for(let reservation of reservations){
                const rows = [];
                rows.push(reservation.id || "N/A") 
                rows.push(reservation.tableId || "N/A")
                rows.push(reservation.clientName || "N/A") 
                rows.push(reservation.clientPhone || "N/A") 
                rows.push(formatedDate || "N/A") 
                rows.push(reservation.reservationTime || "N/A") 
                rows.push(reservation.status || "N/A") 
    
                body.push(rows);
            }

       
            const docDefinitions = {
                content: [
                    {
                        text:`Relatório de reservas do dia ${formatedDate}\n\n`, style: "header"
                    },
                    {
                        table: {
                            widths: [40, 40, "auto", 90 , 80, 60,80],
                            body,
                            alignment: "center"
                        },
                        
                    }
                ],
                styles:{
                    header:{
                        fontSize: 18,
                        bold: true,
                        alignment: "center",
                    },
                    columnsTitle: {
                        fontSize: 10, 
                        alignment: "center",
                        bold: true,
                        margin: 4
                    },
                },
                defaultStyle: {font: 'Helvetica'}
            }
    
            const pdfDoc = printer.createPdfKitDocument(docDefinitions);
    
            const chunks = [];
    
            pdfDoc.on("data", chunk => {
                chunks.push(chunk)
            })
    
            pdfDoc.end();
            
            pdfDoc.on("end", () => {
                const result = Buffer.concat(chunks)
                res.end(result)
            })
        }
    } catch (error) {
        res.send("Erro ao gerar relatorio")
        console.log(error);
    }
    
    
}

module.exports = generateReport