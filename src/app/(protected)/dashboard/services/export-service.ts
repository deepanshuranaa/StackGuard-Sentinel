import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 12;
const CONTENT_WIDTH_MM = A4_WIDTH_MM - MARGIN_MM * 2;
const HEADER_HEIGHT_MM = 28;
const FOOTER_HEIGHT_MM = 10;
const CONTENT_AREA_HEIGHT_MM = A4_HEIGHT_MM - MARGIN_MM - HEADER_HEIGHT_MM - FOOTER_HEIGHT_MM;
const CANVAS_SCALE = 2;

function formatDate(): string {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getFileName(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `stackguard-report-${y}-${m}-${d}.pdf`;
}

function addHeader(doc: jsPDF) {
  const dateStr = formatDate();

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('StackGuard Sentinel', MARGIN_MM, MARGIN_MM + 8);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text('Security Overview Report', MARGIN_MM, MARGIN_MM + 15);

  doc.setFontSize(9);
  doc.text(`Generated on ${dateStr}`, MARGIN_MM, MARGIN_MM + 21);

  // Divider line
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.line(MARGIN_MM, MARGIN_MM + HEADER_HEIGHT_MM - 3, A4_WIDTH_MM - MARGIN_MM, MARGIN_MM + HEADER_HEIGHT_MM - 3);
}

function addFooter(doc: jsPDF, pageNumber: number, totalPages: number) {
  const y = A4_HEIGHT_MM - MARGIN_MM;

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_MM, y - 6, A4_WIDTH_MM - MARGIN_MM, y - 6);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // slate-400

  doc.text('StackGuard Sentinel · Confidential', MARGIN_MM, y);
  doc.text(
    `Page ${pageNumber} of ${totalPages}`,
    A4_WIDTH_MM - MARGIN_MM,
    y,
    { align: 'right' }
  );
}

async function captureElement(element: HTMLElement): Promise<HTMLCanvasElement> {
  return html2canvas(element, {
    scale: CANVAS_SCALE,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });
}

export async function exportDashboardPdf(contentElement: HTMLElement): Promise<void> {
  const canvas = await captureElement(contentElement);

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const imgWidth = CONTENT_WIDTH_MM;
  const imgHeight = (canvas.height / canvas.width) * imgWidth;

  // Split across pages if needed
  const totalPages = Math.ceil(imgHeight / CONTENT_AREA_HEIGHT_MM);
  const imgData = canvas.toDataURL('image/png');

  for (let page = 0; page < totalPages; page++) {
    if (page > 0) doc.addPage();

    addHeader(doc);

    // Calculate the source Y offset on the full canvas for this page
    const sourceY = page * CONTENT_AREA_HEIGHT_MM;
    const pageContentY = MARGIN_MM + HEADER_HEIGHT_MM;

    // Clip by drawing the full image offset upward, and the PDF page clips naturally
    // We use a technique: draw full image at an offset so only the relevant slice shows
    doc.addImage(
      imgData,
      'PNG',
      MARGIN_MM,
      pageContentY - sourceY,
      imgWidth,
      imgHeight
    );

    // White-out regions outside the content area to mask overflow
    // Mask above content
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, A4_WIDTH_MM, pageContentY, 'F');
    // Mask below content
    doc.rect(0, pageContentY + CONTENT_AREA_HEIGHT_MM, A4_WIDTH_MM, FOOTER_HEIGHT_MM + MARGIN_MM + 2, 'F');

    // Re-draw header on top of the mask
    addHeader(doc);
  }

  // Add footers last (so page count is correct)
  for (let page = 0; page < totalPages; page++) {
    doc.setPage(page + 1);
    addFooter(doc, page + 1, totalPages);
  }

  doc.save(getFileName());
}
