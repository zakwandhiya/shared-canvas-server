import { Module } from "module";

var isRealString = (str: any) => {
  return typeof str === 'string' && str.trim().length > 0;
};

var isRealNumber = (input: any) => {
  return typeof input === 'number';
};

var regexp = new RegExp('^#([0-9A-F]{3}){1,2}\\b',"i")
var isRealHexColor = (str: any) => {
  return regexp.test(str);
};

var isRealBooleanOrNull = (input: any) => {
  return !input || typeof input === 'boolean';
};

var isRealCanvasData = (canvasData : any) => {
  return isRealHexColor(canvasData.color) && 
        isRealNumber(canvasData.x) && 
        isRealNumber(canvasData.y) && 
        isRealBooleanOrNull(canvasData.isInitialDot)
}

export {isRealBooleanOrNull , isRealCanvasData, isRealHexColor, isRealNumber,isRealString}