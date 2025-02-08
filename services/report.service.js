var PdfPrinter = require("pdfmake");
const dayjs = require("dayjs");
const reservationModel = require("../models/reservation");

async function generateReport(res, date) {
  try {
    if (date) {
      const formatedDate = dayjs(date).format("DD/MM/YYYY");
      const reservations = (await reservationModel.findReservationByDate(date)).result || [];

      const fonts = {
        Helvetica: {
          normal: "Helvetica",
          bold: "Helvetica-Bold",
          italics: "Helvetica-Oblique",
          bolditalics: "Helvetica-BoldOblique",
        },
      };

      const printer = new PdfPrinter(fonts);
      const body = [];

      const tableCell = [
        { text: "ID", style: "columnsTitle" },
        { text: "MESA", style: "columnsTitle" },
        { text: "CLIENTE", style: "columnsTitle" },
        { text: "TELEFONE", style: "columnsTitle" },
        { text: "DATA", style: "columnsTitle" },
        { text: "HORA", style: "columnsTitle" },
        { text: "STATUS", style: "columnsTitle" },
      ];

      const columnsBody = [];

      tableCell.forEach((column) => {
        columnsBody.push(column);
      });

      body.push(columnsBody);

      for (let reservation of reservations) {
        const rows = [];
        rows.push(reservation.id || "N/A");
        rows.push(reservation.table.number || "N/A");
        rows.push(reservation.clientName || "N/A");
        rows.push(reservation.clientPhone || "N/A");
        rows.push(formatedDate || "N/A");
        rows.push(reservation.reservationTime || "N/A");
        rows.push(reservation.status || "N/A");

        body.push(rows);
      }

      // Supondo que 'body' já contenha as linhas (primeira linha = cabeçalho)
      const modifiedBody = body.map((row, rowIndex) => {
        // Não modificar os cabeçalhos (supondo que o cabeçalho já tem estilo)
        if (rowIndex === 0) return row;

        return row.map((cell) => {
          // Se for uma string ou número, converte para objeto com o estilo
          return { text: cell, style: "tableCell" };
        });
      });

      const docDefinitions = {
        content: [
          {
            text: `Relatório de reservas do dia ${formatedDate}\n\n`,
            style: "header",
          },
          {
            table: {
              widths: [40, 40, "auto", 90, 80, 60, 80],
              body: modifiedBody,
              alignment: "center",
            },
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
          },
          columnsTitle: {
            fontSize: 10,
            alignment: "center",
            bold: true,
            margin: 4,
          },
          tableCell: {
            fontSize: 10, // Aqui você define o tamanho da fonte desejado
          },
        },
        defaultStyle: { font: "Helvetica" },
      };

      const pdfDoc = printer.createPdfKitDocument(docDefinitions);

      const chunks = [];

      pdfDoc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      pdfDoc.end();

      pdfDoc.on("end", () => {
        const result = Buffer.concat(chunks);
        res.end(result);
      });
    }
  } catch (error) {
    res.send("Erro ao gerar relatorio");
    console.log(error);
  }
}

module.exports = generateReport;
