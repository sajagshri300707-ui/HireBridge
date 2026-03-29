import React, { useState } from 'react';
import { saveEvaluation } from '../../utils/storage';
import './InterviewRoom.css';

const DEFAULT_FIELDS = [
  { key: 'communication', label: 'Communication', value: 7 },
  { key: 'technical', label: 'Technical Skills', value: 7 },
  { key: 'confidence', label: 'Confidence', value: 7 },
];

const EvaluationPanel = ({ interviewId, onSaved }) => {
  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [customFields, setCustomFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState('');
  const [saved, setSaved] = useState(false);
  const [notes, setNotes] = useState('');

  const updateScore = (key, val) => {
    setFields((prev) => prev.map((f) => (f.key === key ? { ...f, value: Number(val) } : f)));
  };

  const updateCustomScore = (i, val) => {
    setCustomFields((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], value: Number(val) };
      return next;
    });
  };

  const addCustomField = () => {
    if (!newFieldName.trim()) return;
    setCustomFields((prev) => [...prev, { key: newFieldName, label: newFieldName, value: 7 }]);
    setNewFieldName('');
  };

  const handleSave = () => {
    const evaluation = {
      interviewId,
      communication: fields.find((f) => f.key === 'communication')?.value || 7,
      technical: fields.find((f) => f.key === 'technical')?.value || 7,
      confidence: fields.find((f) => f.key === 'confidence')?.value || 7,
      custom: customFields,
      notes,
      savedAt: new Date().toISOString(),
    };
    saveEvaluation(evaluation);
    setSaved(true);
    onSaved?.(evaluation);
  };

  return (
    <div className="eval-panel">
      <div className="eval-header">
        <h3>📋 Evaluation</h3>
        {saved && <span className="eval-saved-badge">✓ Saved</span>}
      </div>

      <div className="eval-fields">
        {fields.map((f) => (
          <div key={f.key} className="eval-field">
            <div className="eval-field-header">
              <span className="eval-field-label">{f.label}</span>
              <span className="eval-field-score">{f.value}/10</span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={f.value}
              onChange={(e) => updateScore(f.key, e.target.value)}
              className="eval-slider"
              style={{ '--val': f.value }}
            />
            <div className="eval-slider-marks">
              <span>0</span><span>5</span><span>10</span>
            </div>
          </div>
        ))}

        {customFields.map((f, i) => (
          <div key={f.key + i} className="eval-field eval-field--custom">
            <div className="eval-field-header">
              <span className="eval-field-label">{f.label}</span>
              <span className="eval-field-score">{f.value}/10</span>
            </div>
            <input
              type="range" min={0} max={10} step={1}
              value={f.value}
              onChange={(e) => updateCustomScore(i, e.target.value)}
              className="eval-slider"
            />
          </div>
        ))}
      </div>

      <div className="eval-add-custom">
        <input
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCustomField()}
          placeholder="Add custom field..."
          className="custom-field-input"
        />
        <button className="custom-field-btn" onClick={addCustomField}>+</button>
      </div>

      <div className="eval-notes">
        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Private interviewer notes..."
          rows={3}
        />
      </div>

      <button className="eval-save-btn" onClick={handleSave}>
        {saved ? '✓ Evaluation Saved' : 'Save Evaluation'}
      </button>
    </div>
  );
};

export default EvaluationPanel;
