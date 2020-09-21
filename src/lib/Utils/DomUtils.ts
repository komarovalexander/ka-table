export const updateElementTop = (elementRef: any) => {
  if (elementRef && elementRef.current && elementRef.current.parentElement.previousSibling){
    const bound = elementRef.current.parentElement.previousSibling.getBoundingClientRect();
    if (bound){
      const newValue = `${bound.height}px`;
      if (newValue !== elementRef.current.style.top){
        elementRef.current.style.top = newValue;
      }
    }
  }
}