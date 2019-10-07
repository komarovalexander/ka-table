import { KeyboardEnum } from '../Enums/KeyboardEnum';

/*
  Used inside effects and returned as result from them,
  it adds listener to esc & enter keys on life cycle of component
*/
export const addEscEnterKeyEffect = (escKeyHandler: () => void, enterKeyHandler: () => void) => {
  const handleKeyboard = (event: KeyboardEvent) => {
    if (event.keyCode === KeyboardEnum.Esc) {
      escKeyHandler();
    }

    if (event.keyCode === KeyboardEnum.Enter) {
      enterKeyHandler();
    }
  };
  window.addEventListener('keyup', handleKeyboard);

  return () => {
    window.removeEventListener('keyup', handleKeyboard);
  };
};
