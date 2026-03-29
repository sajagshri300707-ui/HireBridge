import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useInterview } from '../../context/InterviewContext';
import './InterviewRoom.css';

const LANGUAGES = [
  { label: 'JavaScript', value: 'javascript', starter: '// Write your solution here\nfunction solution() {\n  \n}\n' },
  { label: 'Python', value: 'python', starter: '# Write your solution here\ndef solution():\n    pass\n' },
  { label: 'C++', value: 'cpp', starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}\n' },
  { label: 'Java', value: 'java', starter: 'public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}\n' },
  { label: 'TypeScript', value: 'typescript', starter: '// Write your solution here\nfunction solution(): void {\n  \n}\n' },
];

const SIMULATED_OUTPUTS = {
  javascript: `✓ Code compiled successfully\n► Running test cases...\n  ✓ Test 1: Passed\n  ✓ Test 2: Passed\n  ⚠ Test 3: Edge case — check your null handling\n\nExecution time: 42ms | Memory: 18.4 MB`,
  python:     `✓ Code compiled successfully\n► Running test cases...\n  ✓ Test 1: Passed\n  ✓ Test 2: Passed\n  ✓ Test 3: Passed\n\nExecution time: 65ms | Memory: 14.2 MB`,
  cpp:        `✓ Compilation successful (g++ -std=c++17)\n► Running test cases...\n  ✓ Test 1: Passed\n  ⚠ Test 2: Runtime — consider boundary conditions\n\nExecution time: 12ms | Memory: 4.8 MB`,
  java:       `✓ Compilation successful\n► Running test cases...\n  ✓ Test 1: Passed\n  ✓ Test 2: Passed\n\nExecution time: 120ms | Memory: 38.2 MB`,
  typescript: `✓ Type-checked successfully\n► Running test cases...\n  ✓ Test 1: Passed\n  ✓ Test 2: Passed\n\nExecution time: 38ms | Memory: 20.1 MB`,
};

const CodeEditor = ({ questionIndex }) => {
  const { saveAnswer } = useInterview();
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(LANGUAGES[0].starter);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleLangChange = (val) => {
    const lang = LANGUAGES.find((l) => l.value === val);
    setLanguage(lang);
    setCode(lang.starter);
    setOutput('');
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('');
    saveAnswer(questionIndex, code);
    setTimeout(() => {
      setOutput(SIMULATED_OUTPUTS[language.value] || '✓ Code executed\n\nNo output produced.');
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="code-editor-panel">
      <div className="code-editor-toolbar">
        <div className="lang-selector">
          {LANGUAGES.map((l) => (
            <button
              key={l.value}
              className={`lang-btn ${language.value === l.value ? 'lang-btn--active' : ''}`}
              onClick={() => handleLangChange(l.value)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          className={`run-btn ${isRunning ? 'run-btn--running' : ''}`}
          onClick={handleRun}
          disabled={isRunning}
        >
          {isRunning ? (
            <><span className="run-spinner" /> Running...</>
          ) : (
            <><span>▶</span> Run Code</>
          )}
        </button>
      </div>

      <div className="monaco-wrapper">
        <Editor
          height="100%"
          language={language.value}
          value={code}
          onChange={(val) => setCode(val || '')}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace",
            fontLigatures: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbersMinChars: 3,
            padding: { top: 16, bottom: 16 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            renderLineHighlight: 'gutter',
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>

      {(output || isRunning) && (
        <div className="code-output">
          <div className="output-label">📤 Output</div>
          {isRunning ? (
            <div className="output-running">
              <span className="run-spinner" /> Executing code...
            </div>
          ) : (
            <pre className="output-text">{output}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
