var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var path = require('path');
var cid = 0;

function fullZero(len) {
  var temp_cid = parseInt(cid) + 1;
  while(len - ('' + temp_cid).length) {
    temp_cid = '0' + temp_cid;
  }
  return temp_cid;
}

/* GET home page. */

/*  插入数据  */
router.get('/', function(req, res, next) {
  res.render('index', {title: '邮件系统'});
})

router.post('/sendEmail', function(req, res, next) {
  var getParam = req.body;
  var attachments = JSON.parse(getParam.attachments);
  if (getParam.title.trim() == "" || getParam.content.trim() == "") {
    res.send(500, { error: '参数不能为空' });
    return;
  }

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 25,
      // secure: false, // true for 465, false for other ports
      auth: {
          user: 'dushao103500@163.com', // generated ethereal user
          pass: 'dushao103500'  //  此处为授权码或者邮箱密码
      }
  });

  // setup email data with unicode symbols
  var mailOptions = {
      // from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
      from: 'dushao103500@163.com',  // 此处为自己的邮箱
      to: getParam.emailer, // list of receivers 接收方地址列表
      subject: getParam.title, // Subject line  
      // text: 'Hello world122222?', // plain text body
      html: getParam.content, // html body
      attachments: []
  };
  if (attachments && attachments.length) {
    for ( var i = 0; i < attachments.length; i ++ ) {
      var get_path = attachments[i].path;
      var get_filename =  attachments[i].filename;
      mailOptions.attachments.push({
        filename: get_filename,
        path: get_path,
        cid: fullZero(4)
      });
    }
    
  }

  console.log(mailOptions);

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.send(500, { error: '发送失败' });
        return;
      } else {
        res.send({
          message: '发送成功！',
          isSuccess: true
        });
      }
  });
});

/*  插入数据  */
router.get('/list/insert', function(req, res, next) {
  var data=JSON.parse(req.query.data);
  
})
/*  按商品id查询  */
router.get('/user/getByUsername', function(req, res, next) {
  // dataMani.select('user', {"username": req.query.username}, function(result) {
  //     res.send(result);
  // });
});

// router.post('/')

module.exports = router;
