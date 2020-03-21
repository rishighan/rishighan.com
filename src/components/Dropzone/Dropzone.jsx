import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImageCard from "../ImageCard/ImageCard";
import { FormSpy } from "react-final-form";
import { assetsAPICall } from "../../actions/index";

function Dropzone(props) {
    const [files, setFiles] = useState([]);
    let S3Object;
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: true,
        noDrag: true,
        onDrop: acceptedFiles => {
            assetsAPICall({
                callURIAction: 'upload',
                callMethod: 'post',
                file: acceptedFiles,
            }).then((uploadResult) => {
                S3Object = {
                    url: uploadResult.data[0].service.endpoint.href + uploadResult.data[0].service.config.params.Bucket + '/' + uploadResult.data[0].service.config.params.Key,
                    name: uploadResult.data[0].service.config.params.Key,
                    isHero: false,
                };
                const files = acceptedFiles.map(file => {
                    return _.assign(S3Object, { size: file.size });
                });
                setFiles(files);
                if (props.onChange) {
                    props.onChange(files);
                }
            });

        }
    });

    const removeFile = file => () => {
        const newFiles = [...props.input.value];
        newFiles.splice(newFiles.indexOf(file), 1);
        console.log(newFiles);
        assetsAPICall({
            callURIAction: 'delete',
            method: 'post',
            params: file.name,
        })
        setFiles(newFiles);
        _.remove(props.input.value, fileObj => fileObj._id === file._id);
    };

    const existingFilesPreviews = _.map(props.input.value, (file, idx) => (
        <>
            {/* Display existing and uploaded assets */}
            <div className="is-pulled-left" key={idx}>
                <ImageCard mediaObject={file} 
                           deleteFileHandler={removeFile(file)} />
            </div>
        </>));

    return (
        <section>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps({ name: 'attachment' })} />
                <p>Drag and drop some files here, or click to select files</p>
            </div>
            <div className="is-clearfix">
                {existingFilesPreviews}
            </div>
        </section>
    );
}

export default Dropzone;