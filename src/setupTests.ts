// jsdom has no canvas, which the export and print demos use
HTMLCanvasElement.prototype.getContext = () => null;
