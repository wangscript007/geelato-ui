class FormDataHandler {
    constructor() {

    }

    /**
     * @param jsonText 元数据配置信息
     * @param multiEntityMeta 实体字段元数据数组
     */
    convert(jsonText, multiEntityMeta) {
        let metaConfig = JSON.parse(jsonText)
        let uiConfig = {type: 'object', properties: []}
        // metaItem
        // "name": "name",
        // "type": "String",
        // "title": "名称",
        // "comment": "",
        // "nullable": false,
        // "charMaxLength": "64",
        // "precision": 20,
        // "scale": 0

        //set first entity as default
        uiConfig.defaultEntity = this.getFirstKey(metaConfig.entities[0])
        for (let i in metaConfig.entities) {
            let entityWrapper = metaConfig.entities[i]
            let entityName = this.getFirstKey(entityWrapper)
            // entity format like this:
            // platformUser: {
            //     id,
            //     name,
            //     loginName,
            //     description
            // }
            let entity = entityWrapper[entityName]
            for (let fieldName in entity) {
                console.log(fieldName)
                uiConfig.properties.push()
            }
        }

        function genField(fieldName) {

        }

        function metaAryToObject(multiEntityMeta) {
            let metaMap = {}
            for (let entityName in multiEntityMeta) {
                let fieldMetaAry = multiEntityMeta[entityName]
                metaMap[entityName] = {}
                for (let index in fieldMetaAry) {
                    let fieldMeta = fieldMetaAry[index]
                }
            }
        }
    }

    getFirstKey(obj) {
        return Object.keys(obj)[0]
    }
}
