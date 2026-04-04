import { jsPDF } from 'jspdf';
import type { VcsSecretFinding } from '../types/findings';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 12;
const CONTENT_WIDTH_MM = A4_WIDTH_MM - MARGIN_MM * 2;
const HEADER_HEIGHT_MM = 28;
const FOOTER_HEIGHT_MM = 10;
const LINE_HEIGHT = 5;

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
  return `vcs-findings-${y}-${m}-${d}.pdf`;
}

function addHeader(doc: jsPDF, pageNumber: number) {
  const dateStr = formatDate();

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('StackGuard Sentinel', MARGIN_MM, MARGIN_MM + 8);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('VCS Findings Report', MARGIN_MM, MARGIN_MM + 15);

  doc.setFontSize(9);
  doc.text(`Generated on ${dateStr}`, MARGIN_MM, MARGIN_MM + 21);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(
    MARGIN_MM,
    MARGIN_MM + HEADER_HEIGHT_MM - 3,
    A4_WIDTH_MM - MARGIN_MM,
    MARGIN_MM + HEADER_HEIGHT_MM - 3
  );
}

function addFooter(doc: jsPDF, pageNumber: number, totalPages: number) {
  const y = A4_HEIGHT_MM - MARGIN_MM;

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_MM, y - 6, A4_WIDTH_MM - MARGIN_MM, y - 6);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);

  doc.text('StackGuard Sentinel · Confidential', MARGIN_MM, y);
  doc.text(`Page ${pageNumber} of ${totalPages}`, A4_WIDTH_MM - MARGIN_MM, y, { align: 'right' });
}

function addTitle(doc: jsPDF, title: string, y: number): number {
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(title, MARGIN_MM, y);
  return y + 8;
}

function addSubtitle(doc: jsPDF, subtitle: string, y: number): number {
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.text(subtitle, MARGIN_MM, y);
  return y + 6;
}

function addText(doc: jsPDF, text: string, y: number, fontSize = 10, isBold = false): number {
  doc.setFontSize(fontSize);
  doc.setFont('helvetica', isBold ? 'bold' : 'normal');
  doc.setTextColor(55, 65, 81);
  const split = doc.splitTextToSize(text, CONTENT_WIDTH_MM);
  doc.text(split, MARGIN_MM, y);
  return y + split.length * 4.5;
}

function analyzeFindings(findings: VcsSecretFinding[]) {
  const severityCount = {
    critical: findings.filter((f) => f.severity === 'critical').length,
    high: findings.filter((f) => f.severity === 'high').length,
    medium: findings.filter((f) => f.severity === 'medium').length,
    low: findings.filter((f) => f.severity === 'low').length,
  };

  const detectors: Record<string, number> = {};
  findings.forEach((f) => {
    detectors[f.detectorType] = (detectors[f.detectorType] || 0) + 1;
  });

  const topDetectors = Object.entries(detectors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const repos: Record<string, number> = {};
  findings.forEach((f) => {
    if (f.repository) {
      repos[f.repository] = (repos[f.repository] || 0) + 1;
    }
  });

  const topRepos = Object.entries(repos)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const activeCount = findings.filter((f) => f.isValid === 'active').length;
  const publicExposure = findings.filter((f) => f.exposure === 'public').length;

  return { severityCount, topDetectors, topRepos, activeCount, publicExposure };
}

export async function exportVcsFindings(findings: VcsSecretFinding[]): Promise<void> {
  if (findings.length === 0) {
    throw new Error('No findings to export');
  }

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const analysis = analyzeFindings(findings);

  let currentY = MARGIN_MM + HEADER_HEIGHT_MM + 5;
  let pageNumber = 1;
  const totalPages = Math.ceil((findings.length + 20) / 35);

  const startNewPage = () => {
    doc.addPage();
    pageNumber++;
    currentY = MARGIN_MM + HEADER_HEIGHT_MM + 5;
    addHeader(doc, pageNumber);
  };

  // Page 1: Summary & Analysis
  addHeader(doc, pageNumber);

  currentY = addTitle(doc, 'VCS Findings Summary', currentY);
  currentY += 3;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);

  const summaryLines = [
    `Total Findings: ${findings.length}`,
    `Critical: ${analysis.severityCount.critical} | High: ${analysis.severityCount.high} | Medium: ${analysis.severityCount.medium} | Low: ${analysis.severityCount.low}`,
    `Active Secrets: ${analysis.activeCount}`,
    `Public Exposure: ${analysis.publicExposure}`,
  ];

  summaryLines.forEach((line) => {
    doc.text(line, MARGIN_MM, currentY);
    currentY += 5;
  });

  currentY += 5;
  currentY = addSubtitle(doc, 'Key Insights', currentY);
  currentY += 3;

  const insights = [
    `Critical Risk: ${analysis.severityCount.critical > 0 ? 'Immediate action required. ' + analysis.severityCount.critical + ' critical secrets detected.' : 'No critical findings detected.'}`,
    `Most Common Detector: ${analysis.topDetectors[0]?.[0] || 'N/A'} (${analysis.topDetectors[0]?.[1] || 0} occurrences)`,
    `Most Affected Repo: ${analysis.topRepos[0]?.[0] || 'N/A'} (${analysis.topRepos[0]?.[1] || 0} findings)`,
    `Public Exposure Risk: ${analysis.publicExposure > 0 ? analysis.publicExposure + ' secrets are publicly exposed.' : 'No public exposure detected.'}`,
  ];

  insights.forEach((insight) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);
    const split = doc.splitTextToSize(insight, CONTENT_WIDTH_MM);
    doc.text(split, MARGIN_MM, currentY);
    currentY += split.length * 4 + 2;
  });

  currentY = A4_HEIGHT_MM - MARGIN_MM - FOOTER_HEIGHT_MM - 15;
  currentY = addSubtitle(doc, 'Top Detectors', currentY);
  currentY += 3;

  analysis.topDetectors.forEach(([detector, count]) => {
    doc.setFontSize(9);
    doc.text(`• ${detector}: ${count} findings`, MARGIN_MM + 3, currentY);
    currentY += 4;
  });

  addFooter(doc, pageNumber, totalPages);

  // Page 2+: Findings Table
  startNewPage();
  currentY = addTitle(doc, 'Detailed Findings', currentY);
  currentY += 5;

  // Table headers
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(51, 65, 85);
  doc.setFillColor(242, 244, 246);
  doc.rect(MARGIN_MM, currentY - 4, CONTENT_WIDTH_MM, 5, 'F');

  doc.text('Severity', MARGIN_MM + 2, currentY);
  doc.text('Detector', MARGIN_MM + 30, currentY);
  doc.text('Provider', MARGIN_MM + 70, currentY);
  doc.text('Occurrences', MARGIN_MM + 100, currentY);
  doc.text('Status', MARGIN_MM + 130, currentY);
  doc.text('Repository', MARGIN_MM + 160, currentY);

  currentY += 6;
  doc.setLineWidth(0.1);
  doc.setDrawColor(229, 231, 235);
  doc.line(MARGIN_MM, currentY - 1, A4_WIDTH_MM - MARGIN_MM, currentY - 1);

  // Table rows
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);

  findings.forEach((finding, idx) => {
    if (currentY > A4_HEIGHT_MM - MARGIN_MM - FOOTER_HEIGHT_MM - 5) {
      startNewPage();
      currentY = addTitle(doc, 'Detailed Findings (continued)', currentY);
      currentY += 5;
    }

    doc.text(finding.severity, MARGIN_MM + 2, currentY);
    doc.text(finding.detectorType.slice(0, 12), MARGIN_MM + 30, currentY);
    doc.text(finding.gitProvider, MARGIN_MM + 70, currentY);
    doc.text(String(finding.occurrences), MARGIN_MM + 100, currentY);
    doc.text(finding.status.slice(0, 12), MARGIN_MM + 130, currentY);
    doc.text(finding.repository?.slice(0, 15) || '—', MARGIN_MM + 160, currentY);

    currentY += 4;
  });

  addFooter(doc, pageNumber, totalPages);

  const fileName = getFileName();
  doc.save(fileName);
}
