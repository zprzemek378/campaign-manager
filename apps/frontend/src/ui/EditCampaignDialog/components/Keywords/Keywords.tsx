import { useState, useEffect, useRef } from "react";
import styles from "./Keywords.module.scss";
import Pill from "@ui/Pill/Pill";
import { PREDEFINED_KEYWORDS } from "@shared/constants";
import {
  DialogFieldset,
  DialogInput,
  DialogLabel,
} from "@ui/CustomDialog/DialogFormControls";

type KeywordsProps = {
  value: string[];
  onChange: (newKeywords: string[]) => void;
};

const Keywords = ({ value, onChange }: KeywordsProps) => {
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input === "") {
      setFilteredSuggestions(PREDEFINED_KEYWORDS);
    } else {
      const lower = input.toLowerCase();
      setFilteredSuggestions(
        PREDEFINED_KEYWORDS.filter(
          (k) => k.toLowerCase().includes(lower) && !value.includes(k)
        )
      );
    }
  }, [input, value]);

  const handleAdd = (keyword: string) => {
    if (keyword && !value.includes(keyword)) {
      onChange([...value, keyword]);
    }
    setInput("");
    setShowSuggestions(false);
  };

  const handleRemove = (keyword: string) => {
    onChange(value.filter((k) => k !== keyword));
  };

  return (
    <>
      <DialogFieldset reduceMarginBottom>
        <DialogLabel />
        <div className={styles.keywordList}>
          {value.map((k) => (
            <Pill text={k} onRemove={handleRemove} />
          ))}
        </div>
      </DialogFieldset>

      <div className={styles.wrapper}>
        <DialogFieldset>
          <DialogLabel htmlFor="keywords">Keywords</DialogLabel>
          <DialogInput
            autoComplete="off"
            ref={inputRef}
            id="keyword"
            name="keyword"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            // onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onBlur={() => setShowSuggestions(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                e.preventDefault();
                handleAdd(input.trim());
              }
            }}
            required
          />
        </DialogFieldset>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className={styles.suggestions}>
            {filteredSuggestions.map((suggestion) => (
              <li
                key={suggestion}
                onMouseDown={() => handleAdd(suggestion)}
                className={styles.suggestionItem}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Keywords;
