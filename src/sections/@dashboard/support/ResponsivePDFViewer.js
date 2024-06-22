// PdfViewer.js
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = React.useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div
      className="pdf-container"
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '10px',
        justifyItems: 'center',
      }}
    >
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            className="pdf-page"
            style={{
              '@media (max-width: 600px)': {
                width: '100%',
              },
              ' @media (min-width: 601px) and (max-width: 900px)': {
                width: '70%',
              },
              '@media (min-width: 901px) and (max-width: 1200px)': {
                width: '50%',
              },
              '@media (min-width: 1201px)': {
                width: '40%',
              },
            }}
          />
        ))}
      </Document>
      <p
        className="page-count"
        style={{
          textAlign: 'center',
          fontSize: '14px',
        }}
      >
        Page {numPages} of {numPages}
      </p>
    </div>
  );
};

export default PdfViewer;
