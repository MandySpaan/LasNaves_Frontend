import jsPDF from "jspdf";

export const generateDailyReportPdf = (reportData: any): Blob => {
  const doc = new jsPDF();

  const reportDate = new Date(reportData.reportDate).toLocaleDateString();
  const totalAccesses = reportData.totalAccesses;
  const totalAbsences = reportData.totalAbsences;

  doc.setFontSize(16);
  doc.text("Daily Report", 20, 20);
  doc.setFontSize(12);
  doc.text(`Report Date: ${reportDate}`, 20, 30);
  doc.text(`Total Accesses: ${totalAccesses}`, 20, 40);
  doc.text(`Total Absences: ${totalAbsences}`, 20, 50);

  doc.text("Frequent People:", 20, 60);
  reportData.frequentPeople.forEach((person: any, index: number) => {
    doc.text(
      `${index + 1}. ${person.name} - ${person.count} accesses`,
      20,
      70 + index * 10
    );
  });

  let yOffset = 70 + reportData.frequentPeople.length * 10 + 10;
  doc.text("Less Frequent People:", 20, yOffset);
  reportData.lessFrequentPeople.forEach((person: any, index: number) => {
    doc.text(
      `${index + 1}. ${person.name} - ${person.count} accesses`,
      20,
      yOffset + (index + 1) * 10
    );
  });

  yOffset = yOffset + reportData.lessFrequentPeople.length * 10 + 20;
  doc.text("Room Usage:", 20, yOffset);
  reportData.roomUsage.forEach((room: any, index: number) => {
    doc.text(
      `${index + 1}. ${room.roomName} - ${room.totalAccesses} accesses, ${
        room.totalAbsences
      } absences, Avg Stay: ${room.averageStayDuration} mins`,
      20,
      yOffset + (index + 1) * 10
    );
  });

  const pdfBlob = doc.output("blob");

  return pdfBlob;
};
