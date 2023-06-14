import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import content from '../../docs/help.md';
import Workspace from '../Workspace/Workspace';
import './Help.css';

const Help = () => {
    const [markdownContent, setMarkdownContent] = useState('');

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch(content);
                const text = await response.text();
                setMarkdownContent(text);
            } catch (error) {
                console.error('Error fetching Markdown content:', error);
            }
        };
        fetchMarkdown();
    }, []);

    const renderImage = (props) => {
        return <img src={props.src} alt={props.alt} />;
    };

    return (
        <Workspace title="Help">
            <div className="help-content">
                <ReactMarkdown
                    children={markdownContent}
                    components={{
                        img: renderImage,
                    }}
                />
            </div>
        </Workspace>
    );
};

export default Help;
