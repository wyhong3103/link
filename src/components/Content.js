import renderMathInElement from "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.mjs";
import { marked } from "marked";
import DOMPurify from 'dompurify'
import hljs from 'highlight.js';
import { Box } from "@chakra-ui/react"
import { useEffect, useRef } from "react";


import "highlight.js/styles/github-dark.css";

export const Content = ({content , markdown, math}) => {
    const container = useRef();

    marked.use({
        mangle : false,
        headerIds: false
    })

    useEffect(
        () => {
            const options = {
                delimiters : [{left: "$$", right: "$$", display: true},{left: "$", right: "$", display: false}],
                output : 'mathml'
            }

            if (math){
                renderMathInElement(container.current, options);
            }
            if (markdown){
                hljs.configure({
                    ignoreUnescapedHTML : true
                })
                hljs.highlightAll(); 
            }
        }
    , [content, markdown, math])

    return(
        <Box w='100%' bg='palette.4' p='15px' borderRadius='10px' 
        overflow="hidden" whiteSpace="break-spaces" textOverflow="ellipsis"
        >
            {/* 
                
                Using different container can force rerender

            */}
            {
                !markdown && !math ?

                <div style={{
                    color : '#eeeeee',
                }}
                    ref={container}
                >
                    {DOMPurify.sanitize(content)}
                </div>

                :

                (
                
                !markdown && math ?

                <p style={{
                    color : '#eeeeee',
                }}
                    ref={container}
                >
                    {DOMPurify.sanitize(content)}
                </p>

                :

                markdown && math ?

                <div 
                    style={{
                        color : '#eeeeee',
                    }}
                    ref={container}
                    dangerouslySetInnerHTML={
                        {
                            __html : DOMPurify.sanitize(marked.parse(content))
                        }
                    }
                    className="markdown"
                />

                :

                <p
                    style={{
                        color : '#eeeeee',
                    }}
                    ref={container}
                    dangerouslySetInnerHTML={
                        {
                            __html : DOMPurify.sanitize(marked.parse(content))
                        }
                    }
                    className="markdown"
                />

                )
            }
        </Box>
    )
}