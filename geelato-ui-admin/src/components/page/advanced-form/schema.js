let schema = {
  title: 'components',
  type: 'Array',
  properties: {
    type: {
      type: 'String',
      enum: ['form', 'tab']
    },
    items: {
      type: 'Array',
      properties: {
        type: {
          type: 'String',
          enum: ['form']
        }
      }
    }
  }
}

let data = {
  cards: [
    {type: 'form', name: 'platform_demo_entity', opts: {}},
    {
      type: 'tabs',
      items: [
        {
          type: 'form',
          opts: {
            layout: '', // html
            theme: '', // vue file
            fields: [],
            rules: [] // validate rules
          }
        },
        {
          type: 'form',
          opts: {
            layout: '', // html
            theme: '', // vue file
            fields: [],
            rules: [] // validate rules
          }
        }
      ]
    }
  ]
}

export default {schema: schema, data: data}
