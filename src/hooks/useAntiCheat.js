import { useEffect, useCallback } from 'react';
import { logViolation } from '../utils/storage';

/**
 * useAntiCheat — detects tab switches, copy/paste, right-click
 * @param {string} roomId — used to store violations per room
 * @param {function} onViolation — callback(type: string)
 * @param {boolean} active — only run when true (e.g. applicant in live room)
 */
const useAntiCheat = (roomId, onViolation, active = true) => {
  const fire = useCallback(
    (type) => {
      if (!active) return;
      logViolation(roomId, type);
      onViolation?.(type);
    },
    [active, roomId, onViolation]
  );

  useEffect(() => {
    if (!active) return;

    const handleVisibility = () => {
      if (document.hidden) fire('tab_switch');
    };

    const handleCopy = (e) => {
      fire('copy_attempt');
    };

    const handlePaste = (e) => {
      fire('paste_attempt');
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      fire('right_click');
    };

    const handleKeyDown = (e) => {
      // Detect DevTools shortcut combos
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        fire('devtools_attempt');
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, fire]);
};

export default useAntiCheat;
