// FancyInput.js
import { useState } from "react";
import './FancyInput.css';

const FancyInput = ({ label = "Username", onSubmit, onChange, name }) => {
  const [value, setValue] = useState("");


    return (
        <div className="input-wrapper">
            <div className="form-control">
                <input
                    type="text"
                    required
                    value={value}
                    onChange={(e) => { setValue(e.target.value); onChange?.(name, e.target.value); }}
                />
                <label>
                    {[...label].map((char, i) => (
                        <span key={i} style={{ transitionDelay: `${i * 50}ms` }}>
                            {char}
                        </span>
                    ))}
                </label>
                {(typeof onSubmit === 'function') && value && (
                    <button
                        className="submit-btn"
                        onClick={() => { onSubmit?.(value); setValue('') }}
                    >
                        Go
                    </button>
                )}
            </div>
        </div>
    );
};

export default FancyInput;