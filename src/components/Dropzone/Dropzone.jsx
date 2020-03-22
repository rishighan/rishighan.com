import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ImageCard from "../ImageCard/ImageCard";
import { assetsAPICall } from "../../actions/index";

// TODO: Update file state upon resolution of the promise
//       Error handling
//       Batch upload and delete

function Dropzone(props) {
    const [files, setFiles] = useState([]);
    let S3Object;
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        multiple: true,
        noDrag: true,
        onDrop: acceptedFiles => {
            setFiles(files);
            assetsAPICall({
                callURIAction: 'upload',
                callMethod: 'post',
                file: acceptedFiles,
            }).then(uploadResult => {
                S3Object = {
                    url: uploadResult.data[0].service.endpoint.href + uploadResult.data[0].service.config.params.Bucket + '/' + uploadResult.data[0].service.config.params.Key,
                    name: uploadResult.data[0].service.config.params.Key,
                    isHero: false,
                };
                const files = acceptedFiles.map(file => {
                    return _.assign(S3Object, { size: file.size });
                });
                if (props.onChange) {
                    props.onChange(files);
                }
            });

        }
    });

    const removeFile = file => () => {
        console.log(file);
        const newFiles = [...files];
        props.onFileObjectRemoved(file);
        assetsAPICall({
            callURIAction: 'delete',
            method: 'post',
            fileName: file.name,
        })
            .then(result => {
                console.log(result);
                newFiles.splice(newFiles.indexOf(file), 1);
                setFiles(newFiles);

            });
    };

    const existingFilesPreviews = _.map(props.input.value, (file, idx) => (
        < div className="is-pulled-left" key={idx} >
            <ImageCard mediaObject={file}
                deleteFileHandler={removeFile(file)} />
        </div >
    ));

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