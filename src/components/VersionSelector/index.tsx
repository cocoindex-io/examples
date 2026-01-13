import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import { FaChevronDown } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function VersionSelector(): React.ReactElement {
  const location = useLocation();
  const [currentVersion, setCurrentVersion] = useState<string>('v0');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Detect current version from URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/examples-v1') || path.includes('/docs-v1')) {
      setCurrentVersion('v1');
    } else {
      setCurrentVersion('v0');
    }
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const options = ['v0', 'v1'];
        const currentIndex = options.indexOf(currentVersion);
        const nextIndex = event.key === 'ArrowDown' 
          ? (currentIndex + 1) % options.length
          : (currentIndex - 1 + options.length) % options.length;
        const newValue = options[nextIndex];
        
        // Handle version change inline to avoid dependency issues
        if (newValue === currentVersion) {
          setIsOpen(false);
          return;
        }

        let newPath = location.pathname;
        if (newValue === 'v0') {
          if (newPath.includes('/examples')) {
            newPath = newPath.replace(/\/examples-v\d+/, '/examples');
          } else if (newPath.includes('/docs')) {
            newPath = newPath.replace(/\/docs-v\d+/, '/docs');
          }
        } else if (newValue === 'v1') {
          if (newPath.includes('/examples')) {
            newPath = newPath.replace(/\/examples(-v\d+)?/, '/examples-v1');
          } else if (newPath.includes('/docs')) {
            newPath = newPath.replace(/\/docs(-v\d+)?/, '/docs-v1');
          }
        }
        
        setIsOpen(false);
        window.location.href = newPath;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentVersion, location.pathname]);

  const handleVersionChange = (value: string) => {
    if (value === currentVersion) {
      setIsOpen(false);
      return;
    }

    let newPath = location.pathname;

    // Handle v0 selection
    if (value === 'v0') {
      // If URL contains /examples (with or without version), change to /examples
      if (newPath.includes('/examples')) {
        // Remove version suffix if present, preserve rest of path
        newPath = newPath.replace(/\/examples-v\d+/, '/examples');
      }
      // If URL contains /docs (with or without version), change to /docs
      else if (newPath.includes('/docs')) {
        // Remove version suffix if present, preserve rest of path
        newPath = newPath.replace(/\/docs-v\d+/, '/docs');
      }
    }
    // Handle v1 selection
    else if (value === 'v1') {
      // If URL contains /examples (with or without version), change to /examples-v1
      if (newPath.includes('/examples')) {
        // Replace /examples or /examples-v0 with /examples-v1, preserve rest of path
        newPath = newPath.replace(/\/examples(-v\d+)?/, '/examples-v1');
      }
      // If URL contains /docs (with or without version), change to /docs-v1
      else if (newPath.includes('/docs')) {
        // Replace /docs or /docs-v0 with /docs-v1, preserve rest of path
        newPath = newPath.replace(/\/docs(-v\d+)?/, '/docs-v1');
      }
    }

    setIsOpen(false);
    // Navigate to new path
    window.location.href = newPath;
  };

  const options = [
    { value: 'v0', label: 'v0' },
    { value: 'v1', label: 'v1' },
  ];

  return (
    <div className={styles.selectRoot} ref={selectRef}>
      <button
        ref={triggerRef}
        type="button"
        className={clsx(styles.selectTrigger, isOpen && styles.selectTriggerOpen)}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select version"
        data-state={isOpen ? 'open' : 'closed'}
      >
        <span className={styles.selectValue}>{currentVersion}</span>
        <span className={clsx(styles.selectIcon, isOpen && styles.selectIconOpen)}>
          <FaChevronDown />
        </span>
      </button>
      {isOpen && (
        <div className={styles.selectContent} role="listbox">
          <div className={styles.selectViewport}>
            {options.map((option) => (
              <div
                key={option.value}
                className={clsx(
                  styles.selectItem,
                  currentVersion === option.value && styles.selectItemSelected
                )}
                onClick={() => handleVersionChange(option.value)}
                role="option"
                aria-selected={currentVersion === option.value}
              >
                {currentVersion === option.value && (
                  <span className={styles.selectItemIndicator}>
                    <IoCheckmark />
                  </span>
                )}
                <span className={styles.selectItemText}>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
