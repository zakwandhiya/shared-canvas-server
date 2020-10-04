
var generateCanvasData = (id: any,rawCanvasData : any) => {
  var color: string = rawCanvasData.color
  var x: number = rawCanvasData.x
  var y: number = rawCanvasData.y
  var isInitialDot: boolean = rawCanvasData.isInitialDot || false
  return {
    id,
    color,
    x,
    y,
    isInitialDot,
  };
};

export {generateCanvasData}



