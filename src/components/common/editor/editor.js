import React, { useState, useRef, useMemo } from 'react';

import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Editor = ({
    value,
    onChange,
    placeholder
}) => {

    const editor = useRef(null);

	const config ={
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        placeholder: placeholder || 'Start typings...'
    };

    return (
        <>
            <div className="editor">
                <JoditEditor
                    ref={editor}
                    value={value}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newContent => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={newContent => {}}
                />
            </div>
        </>
    )
}

export default Editor;