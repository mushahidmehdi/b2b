import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {ImageConfig} from 'config/ImageConfig/index';
import uploadImg from 'assets/upload/cloud-upload-regular-240.png';
import {Box, Button, Paper, Typography} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IntlMessages from '@shipsavvy/utility/IntlMessages';

const FileUploader = ({handleFileChange}) => {
  const wrapperRef = useRef(null);
  const [fileState, setFileState] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add('dragOver');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragOver');
  const onDrop = () => wrapperRef.current.classList.remove('dragOver');

  const handleFile = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updateFileState = [newFile, ...fileState];
      setFileState(updateFileState);
    }
  };

  const removefile = (file) => {
    if (file) {
      const updateFileState = [...fileState];
      updateFileState.splice(fileState.indexOf(file), 1);
      setFileState(updateFileState);
    }
  };

  const handleFileSubmit = () => {
    handleFileChange(fileState);
    setFileState([]);
  };

  return (
    <>
      <Paper
        sx={{
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 2,
          flexDirection: 'column',
          width: 640,
          paddingInline: 5,
          paddingBlockEnd: 3,
          margin: '0 auto',
        }}
      >
        <Box
          ref={wrapperRef}
          onDrop={onDrop}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          sx={{
            maxWidth: '100%',
            position: 'relative',
            border: '2px dashed #4267b2',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '12px auto',
            backgroundColor: '#f5f8ff',
            opacity: 1,
            width: 600,
            height: 120,
            paddingBlockEnd: 5,

            '&:hover': {
              opacity: '0.7',
              cursor: 'pointer',
              transition: '180ms ease-in',
            },
            '& .dragOver': {
              opacity: '0',
              cursor: 'pointer',
            },
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              color: '#ccc',
              fontWeight: 600,
            }}
          >
            <img
              src={uploadImg}
              alt='upload img'
              style={{width: 60, margin: 0, padding: 0}}
            />
            <Typography
              sx={{
                margin: 0,
                padding: 0,
                marginTop: '-10px',
              }}
            >
              Drag or Drop your Image here or click to select an Image from
              local directory
            </Typography>
            <Typography gutterBottom>max 1mb for each Image</Typography>
          </Box>
          <input
            type='file'
            name='files'
            value=''
            onChange={handleFile}
            style={{
              opacity: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          />
        </Box>
        {fileState.length > 0 ? (
          <Box>
            {fileState.map((file, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 1,
                  borderRadius: 2,
                  margin: '10px auto',
                  backgroundColor: '#f5f8ff',
                  width: 520,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  <img
                    width={64}
                    src={
                      ImageConfig[file.type.split('/')[1]] ||
                      ImageConfig['default']
                    }
                    alt=''
                  />
                  <Box>
                    <Typography
                      variant='subtitle2'
                      sx={{maxWidth: 180, fontSize: 14}}
                    >
                      {file.name.length < 40
                        ? file.name
                        : file.name.slice(1, 40) + `${'...'}`}
                    </Typography>
                    <Typography>
                      {'size: '}
                      {file.size}
                    </Typography>
                  </Box>
                </Box>

                <CloseRoundedIcon
                  sx={{
                    opacity: 0.5,
                    backgroundColor: '#fff',
                    marginInlineEnd: '10px',
                    width: 40,
                    height: 40,
                    borderRadius: 9999,
                    padding: '10px',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
                    '&:hover': {
                      cursor: 'pointer',
                      transition: '0.8s',
                      transform: 'rotate(90deg)',
                      opacity: 1,
                    },
                  }}
                  variant='subtitle1'
                  onClick={() => {
                    removefile(file);
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          ''
        )}
        <Button
          sx={{
            fontSize: 14,
            paddingInline: 8,
          }}
          variant='contained'
          color='primary'
          type='submit'
          onClick={handleFileSubmit}
        >
          <IntlMessages id='common.save' />
        </Button>
        {/* <Button variant='contained' onClick={handleFileSubmit}>
          Save Files
        </Button> */}
      </Paper>
    </>
  );
};

FileUploader.propTypes = {
  handleFileChange: PropTypes.func,
  // nextTab: PropTypes.func,
};

export default FileUploader;
