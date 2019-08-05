/**
 * UI
 */

const WIN = require('ui/window');
const LANG = require('../language/');
const LANG_T = antSword["language"]['toastr'];


class UI {
  constructor(opt) {
    // 创建窗口
    this.win = new WIN({
      title: `${LANG['title']}----- ${opt['url']}`,
      width: 666,
      height: 200,
    });
    this.createMainLayout();
    return {
      onInject: (func) => {
        this.bindToolbarClickHandler(func);
      },
      onAbout: () => {}
    }
  }

  /**
   * 创建界面
   */
  createMainLayout() {
    let layout = this.win.win.attachLayout('1C');
    layout.cells('a').setText(`<i class="fa fa-bars"></i> ${LANG['cell']['path']}`);
    layout.cells('a').hideHeader();
    this.createToolbar();
    //this.createGrid(layout.cells('a'));
    this.layout=layout;
  }

  // createGrid(cell) {
  //   let grid = cell.attachGrid();
  //   grid.setHeader(`
  //     ${LANG['cell']['path']}
  //   `);
  //   grid.setNoHeader(true);
  //   grid.setColTypes("ro");
  //   grid.setColSorting('str');
  //   grid.setInitWidths("666");
  //   grid.setColAlign("left");
  //   grid.enableMultiselect(true);
  //   grid.enableBlockSelection(true);
  //   grid.init();
  //
  //   this.grid = grid;
  // }

  /**
   * 工具栏
   */
  createToolbar() {
    let toolbar = this.win.win.attachToolbar();
    toolbar.loadStruct([
      { id: 'new',type: 'button', text: LANG['toolbar']['new'], icon: 'plus-circle'}
    ]);
    this.toolbar = toolbar;
  }


  /**
  * 监听按钮点击事件
  * @param  {Function} callback [description]
  * @return {[type]}            [description]
  */
  bindToolbarClickHandler(callback) {
    let self = this;
    this.toolbar.attachEvent('onClick', (id) => {
      switch(id){
      case "new":
        layer.prompt({
          value: "",
          title: `<i class="fa fa-file-code-o"></i> ${LANG["prompt"]["rm_file"]}`
        },(value,i, e) => {
          layer.close(i);
          this.win.win.progressOn();
          callback({
            type:"rm_file",
            url: value,
          }).then((result) => {
            if(result){
              this.win.win.progressOff();
              toastr.success(LANG["message"]["rwx_success"], LANG_T['success']);
            }
          }).catch((err) => {
            if (err=="Unexpected value"){
              toastr.error(LANG['error']['value_wrong'], antSword['language']['toastr']['error']);
            }
            else {
              toastr.error(LANG['error']['wrong'], antSword['language']['toastr']['error']);
            }
            this.win.win.progressOff();})
        });
        break

      }
    });
  }

}

module.exports = UI;
