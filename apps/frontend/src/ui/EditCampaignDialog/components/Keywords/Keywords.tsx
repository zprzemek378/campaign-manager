import { useState, useEffect, useRef } from "react";
import styles from "./Keywords.module.scss";
import Pill from "@ui/Pill/Pill";
import { PREDEFINED_KEYWORDS } from "@shared/constants";
import {
  DialogFieldset,
  DialogInput,
  DialogLabel,
} from "@ui/CustomDialog/DialogFormControls";
import { MdAddCircle } from "react-icons/md";

type KeywordsProps = {
  value: string[];
  onChange: (newKeywords: string[]) => void;
  isKeywordError: boolean;
};

const Keywords = ({ value, onChange, isKeywordError }: KeywordsProps) => {
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

        {!value.length && isKeywordError && (
          <div className={styles.errorBar}>
            You have to add at least one keyword!
          </div>
        )}

        <div className={styles.keywordList}>
          {value.map((k) => (
            <Pill key={k} text={k} onRemove={handleRemove} />
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
            onBlur={() => setShowSuggestions(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (input.trim()) {
                  handleAdd(input.trim());
                }
              }
            }}
          />
          <button
            className={styles.addKeywordButton}
            onClick={(e) => {
              e.preventDefault();
              if (input.trim()) {
                handleAdd(input.trim());
              }
            }}
          >
            <MdAddCircle size={32} />
          </button>
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
