import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard';
import { assetsAPICall } from '../../actions/assets.actions';

// TODO: Update file state upon resolution of the promise
//       Error handling
//       Batch upload and delete

const Dropzone = (props) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    noDrag: false,
    onDrop: async (acceptedFiles) => {
      const uploadResult = await assetsAPICall({
        callURIAction: 'upload',
        callMethod: 'post',
        file: acceptedFiles,
      });
      const S3Object = {
        url: uploadResult.data[0].Location,
        name: uploadResult.data[0].Key,
        isHero: false,
      };
      const files = acceptedFiles.map(file => _.assign(S3Object, { size: file.size }));
      props.onChange(files);
      setFiles(files);
    },
  });

  const removeFile = file => async () => {
    const newFiles = [...files];
    props.onFileObjectRemoved(file);
    const deleteResult = await assetsAPICall({
      callURIAction: 'delete',
      method: 'post',
      fileName: file.name,
    });
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };
  const toggleHeroStatus = file => () => {
    props.toggleHeroStatus(file);
  };

  const existingFilesPreviews = _.map(props.input.value, (file, idx) => (
        <div className="is-pulled-left" key={idx} >
            <ImageCard mediaObject={file}
                       deleteFileHandler={removeFile(file)}
                       toggleHeroStatus={toggleHeroStatus(file)} />
        </div >
  ));

  return (
        <section>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
            </div>
            <div className="is-clearfix">
                {existingFilesPreviews}
            </div>
        </section>
  );
};

Dropzone.propTypes = {
  toggleHeroStatus: PropTypes.func,
  input: PropTypes.object,
  onFileObjectRemoved: PropTypes.func,
  onChange: PropTypes.func,
};
export default Dropzone;