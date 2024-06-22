import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { DialogActions, Button, Stack } from '@mui/material';
import { DialogAnimate } from '../../../../components/animate';
import '../../../../styles/paperStyle.css';

import { StyleOne } from './paperStyles/style1';
import { StyleTwo } from './paperStyles/style2';
import { StyleThree } from './paperStyles/style3';

PaperStyle.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  paperStyle: PropTypes.number,
  data: PropTypes.object,
  isStyle: PropTypes.bool,
};

export default function PaperStyle({ isOpen, onClose, paperStyle, data, isStyle }) {
  // hooks
  const printPdfRef = useRef(null);

  const renderStyle = () => {
    switch (paperStyle) {
      case 'style_1':
        return <StyleOne data={data} isStyle={isStyle} printPdfRef={printPdfRef} />;
      case 'style_2':
        return <StyleTwo data={data} isStyle={isStyle} printPdfRef={printPdfRef} />;
      case 'style_3':
        return <StyleThree data={data} isStyle={isStyle} printPdfRef={printPdfRef} />;
      default:
        return '';
    }
  };

  function Export2Word(element, filename = '') {
    const preHtml =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    const postHtml = '</body></html>';
    const html = preHtml + document.getElementById(element).innerHTML + postHtml;

    const blob = new Blob(['\ufeff', html], {
      type: 'application/msword',
    });

    // Specify link url
    // const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    const url = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(html)}`;

    // Specify file name
    // filename = qp?.paperName ? qp?.paperName + '.doc' : 'document.doc';
    filename = 'document.doc';

    // Create download link element
    const downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      // triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }

  const handleDownloadWordFile = () => {
    Export2Word('animal');
  };

  return !isStyle ? (
    <DialogAnimate open={isOpen} onClose={onClose} fullScreen id="animal">
      <DialogActions sx={{ display: 'flex', flexDirection: 'column' }}>
        <Stack direction="row" justifyContent={'space-between'} spacing={5}>
          <ReactToPrint
            trigger={() => <Button variant="contained">Download Paper</Button>}
            content={() => printPdfRef.current}
          />
          <Button variant="contained" onClick={handleDownloadWordFile}>
            Download Word filess
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Stack>
        {renderStyle()}
      </DialogActions>
    </DialogAnimate>
  ) : (
    <DialogAnimate open={isOpen} onClose={onClose} fullScreen>
      <DialogActions sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
        {renderStyle()}
      </DialogActions>
    </DialogAnimate>
  );
}
