export const updateChildrenTop = (elementRef: any) => {
  if (elementRef && elementRef.current && elementRef.current.previousSibling && elementRef.current.childNodes){
    const bound = elementRef.current.previousSibling.getBoundingClientRect();
    if (bound){
      const newValue = `${bound.height}px`;
      if (newValue !== elementRef.current.style.top){
        elementRef.current.childNodes.forEach((element: any) => {
          element.style.top = newValue;
        });
        elementRef.current.style.top = newValue;
      }
    }
  }
}