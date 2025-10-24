function ConvertHandler() {
  
  this.getNum = function(input) {
    // Tách phần số ra khỏi chuỗi (tất cả mọi thứ trước ký tự chữ cái đầu tiên)
    let numStr = input.match(/^[\d\.\/]+/);
    if (!numStr) {
      // Nếu không có số nào ở đầu (ví dụ: 'kg'), mặc định là 1
      if (/^[a-zA-Z]+$/.test(input)) {
        return 1;
      }
      numStr = ['1']; // Nếu input rỗng hoặc lạ, giả định là 1
    }
    
    numStr = numStr[0];
    
    // Kiểm tra có phải là phân số hay không
    let parts = numStr.split('/');
    if (parts.length > 2) {
      return 'invalid number'; // Lỗi double-fraction
    }
    
    let num1, num2;
    try {
      num1 = parseFloat(parts[0]);
      if (parts.length === 2) {
        num2 = parseFloat(parts[1]);
        if (isNaN(num1) || isNaN(num2) || num2 === 0) return 'invalid number';
        return num1 / num2;
      } else {
        if (isNaN(num1)) return 'invalid number';
        return num1;
      }
    } catch(e) {
      return 'invalid number';
    }
  };
  
  this.getUnit = function(input) {
    // Tách phần đơn vị ra (tất cả ký tự chữ cái ở cuối chuỗi)
    let unitStr = input.match(/[a-zA-Z]+$/);
    if (!unitStr) {
      return 'invalid unit';
    }
    
    unitStr = unitStr[0].toLowerCase();
    
    const validUnits = {
      'gal': 'gal',
      'l': 'L', // liter phải trả về 'L'
      'mi': 'mi',
      'km': 'km',
      'lbs': 'lbs',
      'kg': 'kg'
    };
    
    return validUnits[unitStr] || 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }
    // Làm tròn đến 5 chữ số thập phân
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };
    return result;
  };
  
}

module.exports = ConvertHandler;
