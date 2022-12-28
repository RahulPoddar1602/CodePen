import React,{useState,useEffect} from 'react'
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
function App() {
    const [html,setHtml]=useLocalStorage('html','')
    const [css,setCss]=useLocalStorage('css','')
    const [JS,setJS]=useLocalStorage('js','')
    const [srcDoc,setSrcDoc]=useState('')
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setSrcDoc(`
            <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${JS}</style>
            </html>
            `)
        },250)
        return ()=>clearTimeout(timeout)
    },[html,css,JS])
  return (
    <div className='box'>
        <div className="pane top-pane">
        <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
        />
        <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
        />
        <Editor
            language="javascript"
            displayName="JS"
            value={JS}
            onChange={setJS}
        />
        </div>
        <div className="pane">
            <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            />
        </div>
    </div>
  )
}

export default App