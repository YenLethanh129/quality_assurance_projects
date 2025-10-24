'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res){
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // KIỂM TRA LỖI THEO ĐÚNG THỨ TỰ YÊU CẦU
    // 1. Nếu cả hai đều không hợp lệ
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.send('invalid number and unit');
      return;
    }
    
    // 2. Nếu chỉ có số không hợp lệ
    if (initNum === 'invalid number') {
      res.send('invalid number');
      return;
    }
    
    // 3. Nếu chỉ có đơn vị không hợp lệ
    if (initUnit === 'invalid unit') {
      res.send('invalid unit');
      return;
    }
    
    // Nếu không có lỗi, tiến hành chuyển đổi
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    res.json(toString);
  });
    
};
