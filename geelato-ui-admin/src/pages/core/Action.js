class Action {
  constructor ({title, click, modal, confirm, js, hidden}) {
    this.title = title
    this.click = click
    this.modal = modal
    this.confirm = confirm
    this.js = js
    this.hidden = hidden
  }

  set (title, click, modal, confirm, js, hidden) {
    this.title = title
    this.click = click
    this.modal = modal
    this.confirm = confirm
    this.js = js
    this.hidden = hidden
  }

  get () {
    return {
      title: this.title,
      click: this.click,
      modal: this.modal,
      confirm: this.confirm,
      js: this.js,
      hidden: this.hidden
    }
  }
}

export default Action
