export default {
  code: '',
  component: '/components/gl-form-combination/Index.vue',
  opts: {
    cards: [
      {
        type: 'form',
        opts: {
          type: 'object',
          // 表单可绑定多实体，这是默认第一实体
          defaultEntity: 'platform_dev_column',
          // update|create|read
          state: 'save',
          properties: {
            // 设置该id:{}，便于子实体中依赖该id
            id: {},
            title: {
              control: 'input',
              title: '中文名',
              // 是否禁用
              disabled: false,
              // 是否只读
              readonly: false,
              // 是否隐藏，hidden隐藏与否在layout中控制，故没有hidden这个配置
              rules: [
                {
                  type: 'empty',
                  prompt: '请输入中文名'
                }
              ]
            },
            name: {
              control: 'input',
              title: '列名',
              rules: [
                {
                  type: 'empty',
                  prompt: '请输入列名'
                }
              ],
              placeholder: '唯一编码'
            },
            defaultValue: {
              control: 'input',
              title: '默认值'
            },
            tableId: {},
            tableName: {
              control: 'input',
              title: 'tableId'
            },
            tableSchema: {
              control: 'input',
              title: '数据库名'
            },
            tableCatalog: {
              control: 'input',
              title: '表目录'
            },
            nullable: {
              control: 'checkbox',
              title: '可空',
              value: true
            },
            type: {
              control: 'dropdown',
              title: '数据类型',
              // int|bigint|varchar|datetime|date|time|timestamp|text|longText
              data: [
                {text: '整型(tinyint)', value: 'tinyint'},
                {text: '整型(int)', value: 'int'},
                {text: '长整型(bigint)', value: 'bigint'},
                {text: '可变字符(varchar)', value: 'varchar'},
                {text: '日期类型(datetime)', value: 'datetime'},
                {text: '日期类型(date)', value: 'date'},
                {text: '时间类型(time)', value: 'time'},
                {text: '长字符(text)', value: 'text'},
                {text: '长字符(longText)', value: 'longText'}
              ],
              rules: [
                {
                  type: 'empty',
                  prompt: '请选择数据类型'
                }
              ]
            },
            charMaxLength: {
              control: 'input',
              title: '字符长度',
              value: 255
            },
            numericPrecision: {
              control: 'input',
              title: '整数位',
              value: 12
            },
            numericScale: {
              control: 'input',
              title: '小数位',
              value: 2
            },
            datetimePrecision: {
              control: 'input',
              title: '日期长度',
              value: 12
            },
            key: {
              control: 'input',
              title: '列键'
            },
            // seq: {
            //   control: 'input',
            //   title: '次序',
            //   readonly: true,
            //   value: -1
            // },
            enabled: {
              control: 'checkbox',
              title: '启用',
              value: true,
              convert: 'number'
            },
            linked: {
              control: 'checkbox',
              title: '链接',
              value: false,
              convert: 'number',
              tips: '对应的数据库表中是否已创建了对应的字段，且属性一致。'
            },
            comment: {
              control: 'textarea',
              title: '描述',
            }
          },
          layout: {
            type: 'table',
            data: [
              // [label colSpan,rowSpan,field colSpan,rowSpan]
              [{title: [4, 8]}, {name: [4, 8]}],
              [{type: [4, 8]}, {nullable: [4, 8]}],
              [{numericPrecision: [4, 8]}, {numericScale: [4, 8]}],
              [{datetimePrecision: [4, 20]}],
              [{charMaxLength: [4, 20]}],
              [{defaultValue: [4, 8]}, {key: [4, 8]}],
              [{enabled: [4, 8]}, {linked: [4, 8]}],
              [{comment: [4, 20]}]
            ],
            hidden: {
              common: {
                charMaxLength: 'gs:$ctx.form.type!=="varchar"&&$ctx.form.type!=="text"&&$ctx.form.type!=="longText"',
                datetimePrecision: 'gs:$ctx.form.type!=="datetime"&&$ctx.form.type!=="date"&&$ctx.form.type!=="time"',
                numericPrecision: 'gs:$ctx.form.type!=="int"&&$ctx.form.type!=="bigint"',
                numericScale: 'gs:$ctx.form.type!=="int"&&$ctx.form.type!=="bigint"'
              },
              // 各表单状态，需隐藏的内容
              update: {},
              create: {},
              read: {}
            }
          },
          ds: {},
          vars: {}
        }
      },
      {
        name: "",
        type: "toolbar",
        opts: {
          appendToParent: true,
          actions: [
            {
              color: "primary",
              title: "保存",
              click: "@:$ctx.save($ctx.$parent.close)"
            },
            {
              color: "negative",
              title: "取消",
              click: "@:$ctx.$parent.cancel()"
            }
          ]
        }
      }
    ],
  },
  query: {id: '@.id'}
}
