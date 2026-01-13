import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './styles.module.css';

export default function VersionSelector(): React.ReactElement {
  const location = useLocation();
  const [currentVersion, setCurrentVersion] = useState<string>('v0');

  // Detect current version from URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/examples-v1') || path.includes('/docs-v1')) {
      setCurrentVersion('v1');
    } else {
      setCurrentVersion('v0');
    }
  }, [location.pathname]);

  const handleVersionChange = (value: string) => {
    if (value === currentVersion) {
      return; // No change needed
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

    // Navigate to new path
    window.location.href = newPath;
  };

  return (
    <div className={styles.versionSelector}>
      <select
        value={currentVersion}
        onChange={(e) => handleVersionChange(e.target.value)}
        className={styles.select}
        aria-label="Select version"
      >
        <option value="v0">v0</option>
        <option value="v1">v1</option>
      </select>
    </div>
  );
}
