import {isRealBooleanOrNull, isRealCanvasData, isRealHexColor} from "../server/validator"
import { expect } from "chai";

describe('validate', function() {
  it('should determine proper hex value', function() {
    let result = isRealHexColor("#ffa")
    expect(result).equal(true);
  }); 

  it('should determine if canvasDataMock is real canvas data', function() {
    let canvasDataMock = {
      id : "userId",
      color : "#ffafff",
      x : 80,
      y : 80,
      isInitialDot : false,
    }
    
    let result = isRealCanvasData(canvasDataMock)
    expect(result).equal(true);
  }); 

  
  it('should determine if canvasDataMock is not proper canvas data', function() {
    let canvasDataMock = {
      id : "userId",
      color : "#ffaa8",
      x : 80,
      y : 80,
      isInitialDot : false,
    }
    
    let result = isRealCanvasData(canvasDataMock)
    expect(result).equal(false);
  }); 
});
